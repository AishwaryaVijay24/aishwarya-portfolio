import * as THREE from "three";

/**
 * The neural mesh simulation, independent of React (DESIGN.md §8).
 * Nodes are components; pulses are requests walking the network.
 * The React layer (NeuralMesh.tsx) owns one instance and calls update() each frame.
 */

export type MeshInput = {
  dt: number;
  /** Pointer position in the hero, -0.5..0.5 on each axis, and its strength 0..1. */
  pointer: { x: number; y: number; k: number };
  /** Scroll progress through the hero, 0..1. */
  scroll: number;
  pixelRatio: number;
};

function rng(seed: number) {
  let s = seed >>> 0;
  return () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296;
}

// Fades anything that projects into the message box, so the copy sits in quiet space.
const QUIET = /* glsl */ `
  uniform vec4 uQuiet;
  float quietAt(vec4 clip) {
    vec2 n = clip.xy / clip.w;
    vec2 c = (uQuiet.xy + uQuiet.zw) * 0.5, hs = abs(uQuiet.zw - uQuiet.xy) * 0.5;
    vec2 q = max(abs(n - c) - hs, 0.0);
    return mix(0.06, 1.0, smoothstep(0.0, 0.14, length(q)));
  }`;

const NODE_VS = /* glsl */ `
  uniform float uMouseK, uFade, uDpr; uniform vec2 uMouse;
  attribute float aSeed; varying float vA, vC;
  ${QUIET}
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0), clip = projectionMatrix * mv;
    float d = distance(position.xy, uMouse), f = exp(-d * d * 0.45) * uMouseK;
    vA = (0.4 + 0.45 * aSeed + f * 0.7) * quietAt(clip) * uFade; vC = aSeed;
    gl_PointSize = (3.5 + aSeed * 4.0 + f * 5.0) * uDpr * (10.0 / -mv.z);
    gl_Position = clip;
  }`;

const DOT_FS = /* glsl */ `
  uniform vec3 uA, uB; varying float vA, vC;
  void main() {
    float r = length(gl_PointCoord - 0.5);
    if (r > 0.5) discard;
    gl_FragColor = vec4(mix(uB, uA, vC), smoothstep(0.5, 0.15, r) * vA);
  }`;

const EDGE_VS = /* glsl */ `
  uniform float uMouseK, uFade; uniform vec2 uMouse; varying float vA, vC;
  ${QUIET}
  void main() {
    vec4 clip = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    float d = distance(position.xy, uMouse), f = exp(-d * d * 0.35) * uMouseK;
    vA = (0.15 + f * 0.5) * quietAt(clip) * uFade; vC = 0.5;
    gl_Position = clip;
  }`;

const EDGE_FS = /* glsl */ `
  uniform vec3 uA, uB; varying float vA, vC;
  void main() { gl_FragColor = vec4(mix(uB, uA, vC), vA); }`;

const PULSE_VS = /* glsl */ `
  uniform float uFade, uDpr; varying float vA;
  ${QUIET}
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0), clip = projectionMatrix * mv;
    vA = 0.95 * quietAt(clip) * uFade;
    gl_PointSize = 7.0 * uDpr * (10.0 / -mv.z);
    gl_Position = clip;
  }`;

const PULSE_FS = /* glsl */ `
  uniform vec3 uA; varying float vA;
  void main() {
    float r = length(gl_PointCoord - 0.5);
    if (r > 0.5) discard;
    gl_FragColor = vec4(mix(uA, vec3(1.0), 0.55), smoothstep(0.5, 0.0, r) * vA);
  }`;

export class MeshSystem {
  readonly group = new THREE.Group();
  private uniforms = {
    uFade: { value: 1 },
    uDpr: { value: 1 },
    uMouse: { value: new THREE.Vector2(99, 99) },
    uMouseK: { value: 0 },
    uQuiet: { value: new THREE.Vector4(2, 2, 2, 2) },
    uA: { value: new THREE.Color("#b9a6f5") },
    uB: { value: new THREE.Color("#7e95ff") },
  };
  private width = 10;
  private height = 6;
  private time = 18;
  private base: [number, number, number][] = [];
  private phase: number[] = [];
  private edges: [number, number][] = [];
  private adjacency: number[][] = [];
  private nodePos = new Float32Array(0);
  private edgePos = new Float32Array(0);
  private pulsePos = new Float32Array(0);
  private pulses: { e: number; dir: 0 | 1; t: number; speed: number }[] = [];

  /** (Re)builds the network for a viewport size in world units. */
  build(width: number, height: number, small: boolean) {
    this.disposeChildren();
    this.width = width;
    this.height = height;
    const r = rng(31);
    const N = small ? 60 : 130;
    this.base = [];
    this.phase = [];
    for (let i = 0; i < N; i++) {
      this.base.push([(r() - 0.5) * width * 1.25, (r() - 0.5) * height * 1.15, -2.6 + r() * 4]);
      this.phase.push(r() * Math.PI * 2);
    }

    // Connect each node to its three nearest neighbours.
    this.edges = [];
    this.adjacency = Array.from({ length: N }, () => []);
    const seen = new Set<string>();
    const d2 = (a: number, b: number) => this.base[a].reduce((s, v, k) => s + (v - this.base[b][k]) ** 2, 0);
    for (let i = 0; i < N; i++) {
      const near = [...Array(N).keys()]
        .filter((j) => j !== i)
        .sort((a, b) => d2(i, a) - d2(i, b))
        .slice(0, 3);
      for (const j of near) {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (seen.has(key)) continue;
        seen.add(key);
        this.adjacency[i].push(this.edges.length);
        this.adjacency[j].push(this.edges.length);
        this.edges.push([i, j]);
      }
    }

    this.nodePos = new Float32Array(N * 3);
    this.edgePos = new Float32Array(this.edges.length * 6);
    const P = small ? 10 : 22;
    this.pulsePos = new Float32Array(P * 3);
    this.pulses = Array.from({ length: P }, () => ({
      e: Math.floor(r() * this.edges.length),
      dir: r() < 0.5 ? 0 : 1,
      t: r(),
      speed: 0.35 + r() * 0.5,
    }));

    const material = (vertexShader: string, fragmentShader: string) =>
      new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
    const geometry = (positions: Float32Array) => {
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      return g;
    };

    const nodeGeo = geometry(this.nodePos);
    nodeGeo.setAttribute("aSeed", new THREE.BufferAttribute(Float32Array.from({ length: N }, () => r()), 1));
    this.group.add(new THREE.LineSegments(geometry(this.edgePos), material(EDGE_VS, EDGE_FS)));
    this.group.add(new THREE.Points(nodeGeo, material(NODE_VS, DOT_FS)));
    this.group.add(new THREE.Points(geometry(this.pulsePos), material(PULSE_VS, PULSE_FS)));
    this.group.children.forEach((o) => (o.frustumCulled = false));
    this.update({ dt: 0, pointer: { x: 0, y: 0, k: 0 }, scroll: 0, pixelRatio: 1 });
  }

  /** Message box in normalised device coordinates: left, bottom, right, top. */
  setQuietZone(left: number, bottom: number, right: number, top: number) {
    this.uniforms.uQuiet.value.set(left, bottom, right, top);
  }

  setColors(lilac: string, peri: string) {
    this.uniforms.uA.value.set(lilac);
    this.uniforms.uB.value.set(peri);
  }

  update({ dt, pointer, scroll, pixelRatio }: MeshInput) {
    this.time += dt;
    const t = this.time;
    const u = this.uniforms;
    u.uFade.value = 1 - scroll * 0.85;
    u.uMouse.value.set(pointer.x * this.width, pointer.y * this.height);
    u.uMouseK.value = pointer.k;
    u.uDpr.value = pixelRatio;

    const { base, phase, nodePos, edgePos, pulsePos, edges, adjacency } = this;
    for (let i = 0; i < base.length; i++) {
      const [x, y, z] = base[i];
      nodePos[i * 3] = x + Math.sin(t * 0.3 + phase[i]) * 0.18;
      nodePos[i * 3 + 1] = y + Math.cos(t * 0.26 + phase[i] * 1.3) * 0.18;
      nodePos[i * 3 + 2] = z + Math.sin(t * 0.21 + phase[i]) * 0.25;
    }
    edges.forEach(([from, to], k) => {
      edgePos.set(nodePos.subarray(from * 3, from * 3 + 3), k * 6);
      edgePos.set(nodePos.subarray(to * 3, to * 3 + 3), k * 6 + 3);
    });
    this.pulses.forEach((pulse, k) => {
      pulse.t += dt * pulse.speed;
      if (pulse.t >= 1) {
        // Arrive at a node and continue along another of its connections.
        const [ea, eb] = edges[pulse.e];
        const at = pulse.dir === 0 ? eb : ea;
        const options = adjacency[at].filter((e) => e !== pulse.e);
        const next = options.length ? options[Math.floor(Math.random() * options.length)] : pulse.e;
        pulse.e = next;
        pulse.dir = edges[next][0] === at ? 0 : 1;
        pulse.t = 0;
      }
      const [ea, eb] = edges[pulse.e];
      const from = pulse.dir === 0 ? ea : eb;
      const to = pulse.dir === 0 ? eb : ea;
      for (let c = 0; c < 3; c++) pulsePos[k * 3 + c] = nodePos[from * 3 + c] + (nodePos[to * 3 + c] - nodePos[from * 3 + c]) * pulse.t;
    });
    this.group.children.forEach((o) => {
      ((o as THREE.Points).geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    });
    this.group.rotation.x = -scroll * 0.35;
  }

  dispose() {
    this.disposeChildren();
  }

  private disposeChildren() {
    for (const child of [...this.group.children]) {
      if (child instanceof THREE.Points || child instanceof THREE.LineSegments) {
        child.geometry.dispose();
        (child.material as THREE.Material).dispose();
      }
      this.group.remove(child);
    }
  }
}
