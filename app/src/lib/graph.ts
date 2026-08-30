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
  // 人工智能星域（左上）
  "ai-llm-basics": { x: 250, y: 180 },
  "ai-prompt-craft": { x: 380, y: 300 },
  // 摄影星域（右上）
  "photo-exposure-triangle": { x: 700, y: 170 },
  "photo-street-composition": { x: 810, y: 300 },
  // 心理学星域（中部）
  "psy-cognitive-load": { x: 500, y: 430 },
  // 6G 通信星域（下方，五颗连成星座链）
  "6g-panorama": { x: 120, y: 430 },
  "6g-diffusion-beam": { x: 230, y: 520 },
  "6g-agent-ran": { x: 340, y: 570 },
  "6g-antenna": { x: 170, y: 595 },
  "6g-frontier": { x: 60, y: 540 },
  // 空天系统星域（右下，五颗连成弧形星座）
  "aero-orbit-servicing": { x: 640, y: 470 },
  "aero-safety-management": { x: 745, y: 510 },
  "aero-urban-gnss": { x: 855, y: 552 },
  "aero-3dma": { x: 760, y: 592 },
  "aero-drone-pipelines": { x: 645, y: 560 },
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
