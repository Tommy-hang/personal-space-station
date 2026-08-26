import { Link } from "react-router";
import { site, domains, domainOf } from "@/content/site";
import { knowledgeNodes } from "@/content/knowledge";
import { projects } from "@/content/projects";
import { NODE_STATUS_META, PROJECT_STATUS_META } from "@/content/types";
import StarMap from "@/components/StarMap";
import { useState } from "react";

/** 四大板块入口 */
const SECTIONS = [
  {
    to: "/knowledge", zh: "知识星座", en: "KNOWLEDGE CONSTELLATION",
    desc: "学习路径、踩坑记录与思考，以星图相连",
    accent: ["#3245ff", "#4bf3c8"], glyph: "✦",
  },
  {
    to: "/projects", zh: "项目轨迹", en: "PROJECT TRAJECTORY",
    desc: "从立项到复盘，每个项目的完整时间轴",
    accent: ["#ff5d5d", "#ff5df9"], glyph: "◈",
  },
  {
    to: "/life", zh: "生活切片", en: "LIFE SLICES",
    desc: "摄影、旅行与日常的光影切片",
    accent: ["#ff7d54", "#f8e42e"], glyph: "❋",
  },
  {
    to: "/about", zh: "关于我", en: "MY STORY",
    desc: "我的人生时间线、原则与工具箱",
    accent: ["#8d46e7", "#4b9ef3"], glyph: "◉",
  },
];

export default function Home() {
  const [hovered, setHovered] = useState<string | null>(null);
  const featured = knowledgeNodes.filter((n) => n.status === "evergreen" || n.status === "growing").slice(0, 3);

  return (
    <div className="relative">
      {/* ===== Hero：整片深空（任何主题下都保持暗夜） ===== */}
      <section className="relative overflow-hidden" style={{ minHeight: "92vh", background: "#0d0f14" }}>
        <div className="stardust" />
        <div className="starfield" />
        {/* 背景星图（可交互） */}
        <div className="absolute inset-x-0 sm:inset-x-8 lg:inset-x-16" style={{ top: "10%", bottom: "4%", opacity: 0.85 }}>
          <StarMap activeId={hovered} onHover={setHovered} />
        </div>

        <div className="relative max-w-6xl mx-auto px-5 pt-28 sm:pt-36 pointer-events-none">
          <p className="text-xs tracking-[0.3em] mb-6" style={{ color: "#6b7690", fontFamily: "var(--font-mono)" }}>
            {site.nameEn.toUpperCase()}
          </p>
          <h1 className="text-4xl sm:text-6xl font-bold leading-[1.15] tracking-tight text-white">
            在数字深空中
            <br />
            种下
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(120deg,#3245ff,#4bf3c8)" }}
            >
              缓慢生长
            </span>
            的星
          </h1>
          <p className="mt-6 max-w-md text-base sm:text-lg font-serif-sc" style={{ color: "#a8b3c7", textShadow: "0 1px 12px #0d0f14" }}>
            {site.description}
          </p>
          <div className="mt-10 flex gap-4 pointer-events-auto">
            <Link
              to="/knowledge"
              className="px-6 py-2.5 rounded-full text-sm font-medium text-white transition-transform hover:scale-105"
              style={{ background: "linear-gradient(120deg,#1321AC,#881ABD)" }}
            >
              进入知识星座 ✦
            </Link>
            <Link
              to="/about"
              className="px-6 py-2.5 rounded-full text-sm transition-colors hover:text-[#4bf3c8]"
              style={{ border: "1px solid #2a3348", color: "#a8b3c7" }}
            >
              认识站长
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 四大板块入口 ===== */}
      <section className="max-w-6xl mx-auto px-5 mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SECTIONS.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="group relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
              style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}
            >
              <div
                className="absolute inset-x-6 top-0 h-px opacity-70"
                style={{ background: `linear-gradient(90deg, transparent, ${s.accent[0]}, ${s.accent[1]}, transparent)` }}
              />
              <span
                className="text-2xl bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(120deg, ${s.accent[0]}, ${s.accent[1]})` }}
              >
                {s.glyph}
              </span>
              <h2 className="mt-4 text-lg font-semibold" style={{ color: "var(--ink)" }}>{s.zh}</h2>
              <p className="mt-0.5 text-[10px] tracking-[0.2em]" style={{ color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>{s.en}</p>
              <p className="mt-3 text-sm font-serif-sc" style={{ color: "var(--ink-2)" }}>{s.desc}</p>
              <span className="mt-4 inline-block text-xs transition-transform duration-300 group-hover:translate-x-1" style={{ color: s.accent[1] }}>
                进入 →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== 精选知识星 ===== */}
      <section className="max-w-6xl mx-auto px-5 mt-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[10px] tracking-[0.25em] mb-2" style={{ color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>FEATURED STARS</p>
            <h2 className="text-2xl font-bold" style={{ color: "var(--ink)" }}>正在生长的知识</h2>
          </div>
          <Link to="/knowledge" className="text-sm hover:text-[#4bf3c8] transition-colors" style={{ color: "var(--ink-3)" }}>全部 →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featured.map((n) => {
            const d = domainOf(n.category);
            return (
              <Link
                key={n.id}
                to={`/knowledge/${n.id}`}
                className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
                style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}
              >
                <div className="flex items-center gap-2 text-xs" style={{ color: d.glow }}>
                  <span>{NODE_STATUS_META[n.status].icon} {NODE_STATUS_META[n.status].label}</span>
                  <span style={{ color: "var(--ink-3)" }}>·</span>
                  <span style={{ color: "var(--ink-3)" }}>{n.category}</span>
                </div>
                <h3 className="mt-3 font-semibold leading-snug" style={{ color: "var(--ink)" }}>{n.title}</h3>
                <p className="mt-2 text-sm font-serif-sc line-clamp-3" style={{ color: "var(--ink-2)" }}>{n.description}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ===== 项目速览 ===== */}
      <section className="max-w-6xl mx-auto px-5 mt-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[10px] tracking-[0.25em] mb-2" style={{ color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>RECENT PROJECTS</p>
            <h2 className="text-2xl font-bold" style={{ color: "var(--ink)" }}>项目轨迹</h2>
          </div>
          <Link to="/projects" className="text-sm hover:text-[#4bf3c8] transition-colors" style={{ color: "var(--ink-3)" }}>全部 →</Link>
        </div>
        <div className="space-y-3">
          {projects.map((p) => {
            const st = PROJECT_STATUS_META[p.status];
            return (
              <Link
                key={p.id}
                to={`/projects/${p.id}`}
                className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl px-6 py-5 transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}
              >
                <span
                  className="shrink-0 inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full"
                  style={{ border: `1px solid ${st.color}55`, color: st.color }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: st.color }} />
                  {st.label}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold" style={{ color: "var(--ink)" }}>{p.title}</h3>
                  <p className="text-sm truncate font-serif-sc" style={{ color: "var(--ink-3)" }}>{p.description}</p>
                </div>
                <span className="text-xs shrink-0" style={{ color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>
                  {p.startDate} → {p.endDate ?? "现在"}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ===== 领域星域图例 ===== */}
      <section className="max-w-6xl mx-auto px-5 mt-24">
        <div
          className="rounded-3xl p-8 sm:p-12 relative overflow-hidden text-center"
          style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}
        >
          <div className="stardust" />
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--ink)" }}>每篇文章，都是一颗星</h2>
            <p className="mt-3 font-serif-sc" style={{ color: "var(--ink-2)" }}>
              关联的知识会连成星座。领域各有其色——
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-x-10 gap-y-4">
              {Object.values(domains).map((d) => (
                <div key={d.label} className="flex items-center gap-2.5">
                  <span
                    className="inline-block w-3 h-3 rotate-45"
                    style={{ background: `linear-gradient(135deg, ${d.from}, ${d.to})`, boxShadow: `0 0 10px ${d.glow}88` }}
                  />
                  <span className="text-sm" style={{ color: "var(--ink-2)" }}>{d.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
