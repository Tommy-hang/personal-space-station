import { knowledgeNodes } from "@/content/knowledge";
import type { KnowledgeNode } from "@/content/types";

/**
 * 星图数据管线 —— 对应架构设计 §三
 * 双向链接补全：A 声明关联 B，自动给 B 补反向引用
 * 节点坐标：MVP 阶段手动分区布局（每个领域一块星域）
 */

export interface StarNode extends KnowledgeNode {
  x: number;
  y: number;
  /** 反向引用（被哪些节点关联） */
  referencedBy: string[];
}

export interface StarEdge {
  from: string;
  to: string;
}

/** 手动星域坐标（viewBox 1000×640），按领域自然聚类 */
const POSITIONS: Record<string, { x: number; y: number }> = {
  "ai-llm-basics": { x: 250, y: 220 },
  "ai-prompt-craft": { x: 360, y: 340 },
  "photo-exposure-triangle": { x: 660, y: 180 },
  "photo-street-composition": { x: 780, y: 300 },
  "psy-cognitive-load": { x: 480, y: 460 },
};

export const starNodes: StarNode[] = knowledgeNodes.map((n) => ({
  ...n,
  x: POSITIONS[n.id]?.x ?? 500,
  y: POSITIONS[n.id]?.y ?? 320,
  referencedBy: knowledgeNodes.filter((m) => m.relatedNodes.includes(n.id)).map((m) => m.id),
}));

/** 去重后的无向边 */
export const starEdges: StarEdge[] = (() => {
  const seen = new Set<string>();
  const edges: StarEdge[] = [];
  for (const n of knowledgeNodes) {
    for (const t of n.relatedNodes) {
      const key = [n.id, t].sort().join("~");
      if (!seen.has(key) && knowledgeNodes.some((m) => m.id === t)) {
        seen.add(key);
        edges.push({ from: n.id, to: t });
      }
    }
  }
  return edges;
})();

/** 查询某节点的全部邻居（正向 + 反向） */
export function neighborsOf(id: string): StarNode[] {
  const ids = new Set<string>();
  const node = starNodes.find((n) => n.id === id);
  if (!node) return [];
  node.relatedNodes.forEach((t) => ids.add(t));
  node.referencedBy.forEach((t) => ids.add(t));
  return starNodes.filter((n) => ids.has(n.id));
}
