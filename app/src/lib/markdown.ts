import { marked } from "marked";

marked.setOptions({ breaks: true, gfm: true });

/** Markdown → HTML（内容均为本站自有，无需 XSS 过滤） */
export function renderMarkdown(md: string): string {
  return marked.parse(md, { async: false });
}
