/** 全站唯一配置源 —— 对应背景文档 §九「约定优于配置」 */

export const site = {
  name: "个人数字空间站",
  nameEn: "Personal Digital Space Station",
  author: "站长",
  tagline: "知识沉淀 · 项目轨迹 · 生活切片",
  description: "一座缓慢生长的数字花园：记录我学到的、做过的、看见的一切。",
  email: "hello@example.com",
  github: "https://github.com/yourname",
};

/**
 * 领域配色 —— 深空多渐变强调色系统
 * 每个知识领域一条专属渐变，星图节点、卡片边线、标签共用
 */
export interface DomainTheme {
  label: string;
  /** 渐变起止色 */
  from: string;
  to: string;
  /** 节点主色（取渐变中点亮度较高的颜色） */
  glow: string;
}

export const domains: Record<string, DomainTheme> = {
  人工智能: { label: "人工智能", from: "#3245ff", to: "#4bf3c8", glow: "#4bf3c8" },
  摄影: { label: "摄影", from: "#ff7d54", to: "#f8e42e", glow: "#ffc46b" },
  心理学: { label: "心理学", from: "#ff5d5d", to: "#ff5df9", glow: "#ff7edb" },
  写作: { label: "写作", from: "#8d46e7", to: "#4b9ef3", glow: "#a78bfa" },
};

export function domainOf(category: string): DomainTheme {
  return domains[category] ?? { label: category, from: "#5D80D9", to: "#4bf3c8", glow: "#8fb8ff" };
}
