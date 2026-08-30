/**
 * 内容类型契约 —— 对应背景文档 §6.2 Frontmatter 规范
 * 所有内容以强类型 TS 数据文件管理，修改内容无需触碰组件代码
 */

/** 知识节点生长状态：萌芽 | 成长中 | 成熟 | 归档 */
export type NodeStatus = "seedling" | "growing" | "evergreen" | "archived";

/** 知识节点（知识星座） */
export interface KnowledgeNode {
  title: string;
  /** 星图节点唯一标识 */
  id: string;
  /** 领域分类，如：人工智能 / 摄影 / 心理学 */
  category: string;
  /** 类型：教程 / 笔记 / 思考 */
  kind: "tutorial" | "note" | "essay";
  tags: string[];
  status: NodeStatus;
  /** 关联节点 ID 数组（双向链接由 graph.ts 自动补全反向引用） */
  relatedNodes: string[];
  description: string;
  createdAt: string;
  updatedAt: string;
  /** 所属系列（可选）：系列名 / 第几篇 / 共几篇 */
  series?: { name: string; order: number; total: number };
  /** Markdown 正文 */
  body: string;
}

/** 项目进度状态 */
export type ProjectStatus = "planning" | "in-progress" | "completed" | "maintenance";

/** 项目时间轴事件 */
export interface TimelineEvent {
  date: string;
  /** 里程碑类型 */
  type: "start" | "milestone" | "problem" | "solution" | "harvest" | "end";
  title: string;
  detail?: string;
}

/** 项目（项目轨迹） */
export interface Project {
  title: string;
  id: string;
  status: ProjectStatus;
  techStack: string[];
  startDate: string;
  endDate?: string;
  description: string;
  /** Markdown 正文：背景 / 过程 / 复盘 */
  body: string;
  timeline: TimelineEvent[];
  links?: { label: string; url: string }[];
}

/** 生活切片 */
export interface LifeSlice {
  title: string;
  id: string;
  /** 记录日期 */
  date: string;
  /** 心情标签 */
  mood?: string;
  description: string;
  /** Markdown 正文 */
  body: string;
}

export const NODE_STATUS_META: Record<NodeStatus, { label: string; icon: string }> = {
  seedling: { label: "萌芽", icon: "🌱" },
  growing: { label: "成长中", icon: "🌿" },
  evergreen: { label: "成熟", icon: "🌳" },
  archived: { label: "归档", icon: "🍂" },
};

export const PROJECT_STATUS_META: Record<ProjectStatus, { label: string; color: string }> = {
  planning: { label: "规划中", color: "#a8b3c7" },
  "in-progress": { label: "进行中", color: "#f8e42e" },
  completed: { label: "已完成", color: "#4bf3c8" },
  maintenance: { label: "维护中", color: "#5D80D9" },
};
