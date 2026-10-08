/**
 * Technology logos from Simple Icons (CC0). Only exact brands, or the maker of a tool
 * (e.g. Hugging Face for its PEFT/TRL libraries), are mapped; concepts like "RAG" or
 * "Microservices" deliberately have no logo.
 */
import {
  siClaude,
  siDocker,
  siExpress,
  siFastapi,
  siGit,
  siGitlab,
  siGradio,
  siHuggingface,
  siJavascript,
  siJsonwebtokens,
  siLangchain,
  siLanggraph,
  siLinux,
  siMeta,
  siModelcontextprotocol,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siOpenjdk,
  siOpentelemetry,
  siPostgresql,
  siPytest,
  siPython,
  siPytorch,
  siQwen,
  siReact,
  siRedis,
  siRender,
  siSelenium,
  siSpringboot,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";

const ICONS: Record<string, SimpleIcon> = {
  python: siPython,
  typescript: siTypescript,
  javascript: siJavascript,
  java: siOpenjdk,
  react: siReact,
  "next.js": siNextdotjs,
  "node.js": siNodedotjs,
  fastapi: siFastapi,
  "spring boot": siSpringboot,
  express: siExpress,
  postgresql: siPostgresql,
  mysql: siMysql,
  mongodb: siMongodb,
  redis: siRedis,
  "redis queues": siRedis,
  docker: siDocker,
  git: siGit,
  "gitlab ci/cd": siGitlab,
  linux: siLinux,
  render: siRender,
  pytest: siPytest,
  selenium: siSelenium,
  "tailwind css": siTailwindcss,
  jwt: siJsonwebtokens,
  opentelemetry: siOpentelemetry,
  pytorch: siPytorch,
  "hugging face": siHuggingface,
  "hugging face transformers": siHuggingface,
  "peft (lora)": siHuggingface,
  "trl (sft)": siHuggingface,
  "sentence-transformers": siHuggingface,
  qwen: siQwen,
  llama: siMeta,
  langgraph: siLanggraph,
  langsmith: siLangchain,
  "langsmith evals": siLangchain,
  mcp: siModelcontextprotocol,
  gradio: siGradio,
  "ai coding tools (claude)": siClaude,
};

export function techIcon(name: string): SimpleIcon | undefined {
  return ICONS[name.trim().toLowerCase()];
}

/** Brand colours that would vanish on dark surfaces (near-black) fall back to the text colour. */
export function isDarkBrand(hex: string): boolean {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.16;
}
