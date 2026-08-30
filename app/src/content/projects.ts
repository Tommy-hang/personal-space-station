import type { Project } from "./types";

/** 项目轨迹内容 —— 卡片墙 + 时间轴数据源 */
export const projects: Project[] = [
  {
    id: "personal-space-station",
    title: "个人数字空间站",
    status: "in-progress",
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    startDate: "2026-08-20",
    description: "你正在看的这个网站。一个纯静态、内容驱动、AI 协作生成的个人博客，包含知识星座、项目轨迹、生活切片与留言墙。",
    body: `## 为什么做

想要一个完全属于自己、十年后可维护、内容即文件的数字花园。不依赖任何闭源平台。

## 技术取舍

- 静态生成，无数据库，Git 即版本史
- 星图第一版用手动分区布局，文章多了再上力导向算法
- 与 AI 结对编程：我写内容和设计决策，Kimi K3 负责实现

## 如果重来一次

（项目进行中，复盘留白——这本身也是对"允许半成品"原则的实践。）`,
    timeline: [
      { date: "2026-08-15", type: "start", title: "立项", detail: "确定定位：知识沉淀 + 项目展示 + 生活记录" },
      { date: "2026-08-22", type: "milestone", title: "背景文档完成", detail: "与 K3 讨论定稿内容板块、Frontmatter 规范与技术栈" },
      { date: "2026-08-24", type: "milestone", title: "MVP 搭建", detail: "React + Vite 骨架、星图分屏页、项目时间轴" },
      { date: "2026-08-24", type: "problem", title: "取舍：Astro 还是 React", detail: "为换取 AI 协作迭代效率，放弃 Astro 改用 React SSG 方案" },
      { date: "2026-08-24", type: "solution", title: "内容层强类型契约", detail: "用 TS 接口固化 Frontmatter 规范，格式错误编译期即报错" },
    ],
    links: [{ label: "GitHub 仓库", url: "https://github.com/yourname/space-station" }],
  },
  {
    id: "smart-campus-nav",
    title: "校园智能导览小程序",
    status: "completed",
    techStack: ["微信小程序", "Node.js", "MongoDB"],
    startDate: "2026-01-15",
    endDate: "2026-06-30",
    description: "为新生做的校园导览工具：室内定位、课表导入、建筑 AR 标注。服务了 2000+ 新生，获得校级创新创业奖。",
    body: `## 背景

每年开学季都有新生在校园里迷路。我们和辅导员聊了三次，确认这是真痛点。

## 最大的坑

室内 GPS 漂移严重，最终方案是"蓝牙信标 + 楼层平面图"混合定位，精度从 50 米提升到 5 米。

## 复盘：如果重来一次

- 会先做一周纸质问卷验证需求，而不是直接写代码
- 技术选型上会选云开发而不是自建后端，省下的时间做运营
- 会提前拉两个学弟学妹进组，避免毕业后项目无人维护`,
    timeline: [
      { date: "2026-01-15", type: "start", title: "立项", detail: "与辅导员三次访谈确认需求" },
      { date: "2026-03-01", type: "milestone", title: "MVP 上线", detail: "覆盖 12 栋主要建筑" },
      { date: "2026-03-20", type: "problem", title: "室内定位漂移", detail: "GPS 在室内误差 50 米，用户疯狂吐槽" },
      { date: "2026-04-10", type: "solution", title: "蓝牙信标方案", detail: "混合定位把精度提升到 5 米" },
      { date: "2026-06-30", type: "end", title: "结项", detail: "2000+ 用户，校级创新创业二等奖" },
    ],
  },
];
