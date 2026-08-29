import { useMemo, useState } from "react";
import { Link } from "react-router";
import StarMap from "@/components/StarMap";
import { starNodes } from "@/lib/graph";
import { domainOf, domains } from "@/content/site";
import { NODE_STATUS_META } from "@/content/types";

/**
 * 知识星座首页：左右分屏
 * 左：交互星图（sticky 固定）；右：可滚动知识卡片列表
 * 悬停任一侧，另一侧联动高亮
 */
export default function Knowledge() {
  const [active, setActive] = useState<string | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

  const list = useMemo(
    () => (filter ? starNodes.filter((n) => n.category === filter) : starNodes),
    [filter]
  );

  return (
    <div className="relative min-h-screen">
      <div className="starfield" />
      <div className="max-w-6xl mx-auto px-5 py-12 relative">
        {/* 页头 */}
        <header className="mb-10">
          <p className="text-[10px] tracking-[0.25em] mb-3" style={{ color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>
            KNOWLEDGE CONSTELLATION
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: "var(--ink)" }}>知识星座</h1>
          <p className="mt-3 max-w-xl font-serif-sc" style={{ color: "var(--ink-2)" }}>
            每篇笔记是一颗星，互相关联的知识连成星座。悬停星星可以看到它的名字，点击即可降落。
          </p>
          {/* 领域筛选器 */}
          <div className="mt-6 flex flex-wrap gap-2">
            <FilterChip active={filter === null} onClick={() => setFilter(null)} label="全部星域" glow="#8fb8ff" />
            {Object.values(domains).map((d) => (
              <FilterChip key={d.label} active={filter === d.label} onClick={() => setFilter(d.label)} label={d.label} glow={d.glow} />
            ))}
          </div>
        </header>

        {/* 分屏：左星图 / 右列表 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div
            className="lg:sticky lg:top-24 rounded-3xl overflow-hidden space-panel"
            style={{ aspectRatio: "1000/640" }}
          >
            <div className="starfield" />
            <div className="stardust" />
            <StarMap activeId={active} onHover={setActive} />
          </div>

          <div className="space-y-4">
            {list.map((n, i) => {
              const d = domainOf(n.category);
              const isActive = active === n.id;
              return (
                <Link
                  key={n.id}
                  to={`/knowledge/${n.id}`}
                  onMouseEnter={() => setActive(n.id)}
                  onMouseLeave={() => setActive(null)}
                  className="block rounded-2xl transition-all duration-300"
                  style={{
                    background: "var(--bg-card)",
                    border: `1px solid ${isActive ? d.glow : "var(--line)"}`,
                    transform: isActive ? "translateX(6px)" : "none",
                    boxShadow: isActive ? `0 0 24px ${d.glow}22` : "none",
                    ["--domain" as string]: d.glow,
                  }}
                >
                  {/* 卡片标尺头：编号 + 领域 + 状态 */}
                  <div
                    className="flex items-center gap-3 px-5 py-2.5 text-[11px]"
                    style={{ borderBottom: "1px solid var(--line)", fontFamily: "var(--font-mono)" }}
                  >
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold"
                      style={{ background: `linear-gradient(135deg, ${d.from}, ${d.to})`, color: "#0d0f14" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ color: d.glow }}>{n.category}</span>
                    <span style={{ color: "var(--ink-3)" }}>·</span>
                    <span style={{ color: "var(--ink-3)" }}>{{ tutorial: "教程", note: "笔记", essay: "思考" }[n.kind]}</span>
                    <span className="ml-auto" style={{ color: "var(--ink-2)" }}>
                      {NODE_STATUS_META[n.status].icon} {NODE_STATUS_META[n.status].label}
                    </span>
                  </div>
                  <div className="px-5 py-4">
                    <h2 className="font-semibold leading-snug" style={{ color: "var(--ink)" }}>{n.title}</h2>
                    <p className="mt-2 text-sm font-serif-sc line-clamp-2" style={{ color: "var(--ink-2)" }}>{n.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {n.tags.map((t) => (
                        <span key={t} className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: "var(--bg-soft)", color: "var(--ink-3)" }}>
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterChip({ active, onClick, label, glow }: { active: boolean; onClick: () => void; label: string; glow: string }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-1.5 rounded-full text-sm transition-all duration-300"
      style={{
        border: `1px solid ${active ? glow : "var(--line)"}`,
        color: active ? glow : "var(--ink-2)",
        background: active ? `${glow}14` : "transparent",
      }}
    >
      {label}
    </button>
  );
}
