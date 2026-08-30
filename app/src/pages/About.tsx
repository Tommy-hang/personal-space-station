import { site } from "@/content/site";

const TIMELINE = [
  { year: "2004", title: "出生", detail: "一座南方小城，夏天很热" },
  { year: "2022", title: "进入大学", detail: "第一次离开家，开始对自己负责" },
  { year: "2024", title: "遇见摄影", detail: "用攒了半年的钱买了第一台相机" },
  { year: "2025", title: "第一个完整项目", detail: "校园导览小程序，明白了'做完'比'做完美'重要" },
  { year: "2026", title: "建立这个数字空间站", detail: "开始系统地沉淀知识，而不只是收藏链接" },
];

const PRINCIPLES = [
  { title: "内容驱动", detail: "先想清楚要表达什么，再决定用什么技术。工具服务于内容，不是相反。" },
  { title: "允许半成品", detail: "先发布 60 分的东西，在公开中迭代到 90 分。完美主义是拖延的伪装。" },
  { title: "问题驱动学习", detail: "从'我为什么要学这个'开始，而不是从目录第一页开始。" },
  { title: "长期主义", detail: "选择十年后仍然有效的东西：纯文本、开放格式、自己的域名。" },
];

const TOOLBOX = [
  { group: "硬件", items: ["MacBook Air M3", "Sony A7M4 + 35mm f/1.4", "HHKB 键盘"] },
  { group: "软件", items: ["VS Code", "Obsidian（笔记）", "Lightroom", "Raycast"] },
  { group: "信息源", items: ["RSS（Inoreader）", " newsletters 若干", "纸质书"] },
];

/** 关于我：人生时间线 + 原则卡片 + Now + 工具箱 + 联系方式 */
export default function About() {
  return (
    <div className="relative">
      <div className="stardust" />
      <div className="relative max-w-3xl mx-auto px-5 py-16">
        <p className="text-[10px] tracking-[0.25em] mb-3" style={{ color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>MY STORY</p>
        <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: "var(--ink)" }}>关于我</h1>
        <p className="mt-5 font-serif-sc text-lg leading-loose" style={{ color: "var(--ink-2)" }}>
          你好，我是{site.author}。一个正在学计算机、也学摄影和写作的人。
          我相信写作是思考的容器，项目是能力的证据，而这个网站是我递给世界的一张名片——
          也是留给十年后自己的一封信。
        </p>

        {/* 人生时间线 */}
        <section className="mt-16">
          <h2 className="text-sm font-semibold tracking-[0.2em] mb-8" style={{ color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>◉ 时间线</h2>
          <div className="relative pl-8" style={{ borderLeft: "1px solid var(--line)" }}>
            {TIMELINE.map((t, i) => (
              <div key={i} className="relative pb-8 last:pb-0">
                <span
                  className="absolute -left-[37px] top-1.5 w-2.5 h-2.5 rotate-45"
                  style={{ background: "linear-gradient(135deg,#8d46e7,#4b9ef3)", boxShadow: "0 0 8px #8d46e766" }}
                />
                <span className="text-xs" style={{ color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>{t.year}</span>
                <h3 className="mt-1 font-semibold" style={{ color: "var(--ink)" }}>{t.title}</h3>
                <p className="mt-1 text-sm font-serif-sc" style={{ color: "var(--ink-2)" }}>{t.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 我的原则 */}
        <section className="mt-16">
          <h2 className="text-sm font-semibold tracking-[0.2em] mb-6" style={{ color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>✦ 我的原则</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PRINCIPLES.map((p, i) => (
              <div key={i} className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}>
                <h3 className="font-semibold" style={{ color: "var(--ink)" }}>{p.title}</h3>
                <p className="mt-2 text-sm font-serif-sc" style={{ color: "var(--ink-2)" }}>{p.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Now 页面 */}
        <section className="mt-16">
          <div className="rounded-2xl p-7 relative overflow-hidden" style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}>
            <div className="stardust" />
            <div className="relative">
              <h2 className="text-sm font-semibold tracking-[0.2em]" style={{ color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>
                ◈ NOW · 最近在忙什么
              </h2>
              <ul className="mt-4 space-y-2 font-serif-sc" style={{ color: "var(--ink-2)" }}>
                <li>· 搭建这个数字空间站（你正在看它）</li>
                <li>· 读《认知天性》，重学"怎么学习"</li>
                <li>· 练习街头摄影，目标是攒够一组"城市光影"专题</li>
              </ul>
              <p className="mt-4 text-xs" style={{ color: "var(--ink-3)" }}>更新于 2026 年 8 月 · 每季度更新一次</p>
            </div>
          </div>
        </section>

        {/* 工具箱 */}
        <section className="mt-16">
          <h2 className="text-sm font-semibold tracking-[0.2em] mb-6" style={{ color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>⚒ 工具箱</h2>
          <div className="space-y-5">
            {TOOLBOX.map((g) => (
              <div key={g.group} className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
                <span className="shrink-0 w-16 text-sm font-semibold" style={{ color: "var(--ink)" }}>{g.group}</span>
                <p className="text-sm font-serif-sc" style={{ color: "var(--ink-2)" }}>{g.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 联系方式 */}
        <section className="mt-16 rounded-2xl p-7" style={{ border: "1px solid var(--line)" }}>
          <h2 className="text-sm font-semibold tracking-[0.2em] mb-4" style={{ color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>◉ 联系我</h2>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <a href={`mailto:${site.email}`} className="hover:text-[#4bf3c8] transition-colors" style={{ color: "var(--ink-2)" }}>邮箱 ↗</a>
            <a href={site.github} target="_blank" rel="noreferrer" className="hover:text-[#4bf3c8] transition-colors" style={{ color: "var(--ink-2)" }}>GitHub ↗</a>
          </div>
        </section>
      </div>
    </div>
  );
}
