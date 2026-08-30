import { knowledgeNodes } from "@/content/knowledge";
import { projects } from "@/content/projects";
import { lifeSlices } from "@/content/life";
import { domainOf } from "@/content/site";
import { NODE_STATUS_META, PROJECT_STATUS_META } from "@/content/types";

/**
 * 全局搜索 —— 纯前端索引，无数据库
 * 统一索引 → 多关键词 AND 匹配 → 加权评分 → 按板块分组
 */

export type SearchKind = "knowledge" | "project" | "life";

export interface SearchItem {
  kind: SearchKind;
  id: string;
  url: string;
  title: string;
  /** 副标题：描述 / 摘要 */
  subtitle: string;
  /** 可搜索的额外字段：分类、系列、技术栈、状态、时间轴事件等 */
  extra: string;
  tags: string[];
  body: string;
  /** 区分色：知识=领域色，项目=状态色，切片=暖金 */
  accent: string;
  /** 行内文字徽章，如 "星座 · 6G 通信" */
  badge: string;
}

export interface SearchResult extends SearchItem {
  score: number;
  snippet: string;
}

export interface SearchGroup {
  kind: SearchKind;
  results: SearchResult[];
}

/** 统一搜索索引（构建期生成，内容文件更新即自动更新） */
export const searchIndex: SearchItem[] = [
  ...knowledgeNodes.map((n) => ({
    kind: "knowledge" as const,
    id: n.id,
    url: `/knowledge/${n.id}`,
    title: n.title,
    subtitle: n.description,
    extra: [n.category, n.series?.name ?? "", n.kind, NODE_STATUS_META[n.status].label].join(" "),
    tags: n.tags,
    body: n.body,
    accent: domainOf(n.category).glow,
    badge: `星座 · ${n.category}`,
  })),
  ...projects.map((p) => ({
    kind: "project" as const,
    id: p.id,
    url: `/projects/${p.id}`,
    title: p.title,
    subtitle: p.description,
    extra: [p.techStack.join(" "), PROJECT_STATUS_META[p.status].label].join(" "),
    tags: p.techStack,
    body: [p.body, ...p.timeline.map((t) => `${t.title} ${t.detail ?? ""}`)].join("\n"),
    accent: PROJECT_STATUS_META[p.status].color,
    badge: `项目 · ${PROJECT_STATUS_META[p.status].label}`,
  })),
  ...lifeSlices.map((s) => ({
    kind: "life" as const,
    id: s.id,
    url: "/life",
    title: s.title,
    subtitle: s.description,
    extra: [s.date, s.mood ?? ""].join(" "),
    tags: s.mood ? [s.mood] : [],
    body: s.body,
    accent: "#e8b86d",
    badge: `切片 · ${s.date}`,
  })),
];

function countOccurrences(haystack: string, needle: string): number {
  let count = 0;
  let pos = 0;
  while ((pos = haystack.indexOf(needle, pos)) !== -1) {
    count += 1;
    pos += needle.length;
  }
  return count;
}

/** 去掉 Markdown / HTML 语法，生成可读的纯文本 */
function stripMarkdown(md: string): string {
  return md
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*`|\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** 以首个命中关键词为中心截取摘要片段 */
function makeSnippet(item: SearchItem, terms: string[]): string {
  const plain = stripMarkdown(item.subtitle + "。" + item.body);
  const lower = plain.toLowerCase();
  let first = -1;
  for (const t of terms) {
    const i = lower.indexOf(t);
    if (i !== -1 && (first === -1 || i < first)) first = i;
  }
  if (first === -1) return plain.slice(0, 72);
  const start = Math.max(0, first - 24);
  const end = Math.min(plain.length, first + 60);
  return (start > 0 ? "…" : "") + plain.slice(start, end) + (end < plain.length ? "…" : "");
}

/**
 * 搜索：多关键词 AND 语义（每个词都须命中某处）
 * 权重：标题 10 · 标签 6 · 分类/系列等 4 · 描述 4 · 正文每次出现 1（封顶 3）
 */
export function search(query: string, perGroup = 6): SearchGroup[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];

  const hits: SearchResult[] = [];
  for (const item of searchIndex) {
    let score = 0;
    let matchedAll = true;
    for (const t of terms) {
      let s = 0;
      if (item.title.toLowerCase().includes(t)) s += 10;
      if (item.tags.some((tag) => tag.toLowerCase().includes(t))) s += 6;
      if (item.extra.toLowerCase().includes(t)) s += 4;
      if (item.subtitle.toLowerCase().includes(t)) s += 4;
      s += Math.min(countOccurrences(item.body.toLowerCase(), t), 3);
      if (s === 0) {
        matchedAll = false;
        break;
      }
      score += s;
    }
    if (matchedAll) hits.push({ ...item, score, snippet: makeSnippet(item, terms) });
  }

  const order: SearchKind[] = ["knowledge", "project", "life"];
  return order
    .map((kind) => ({
      kind,
      results: hits
        .filter((r) => r.kind === kind)
        .sort((a, b) => b.score - a.score)
        .slice(0, perGroup),
    }))
    .filter((g) => g.results.length > 0);
}
