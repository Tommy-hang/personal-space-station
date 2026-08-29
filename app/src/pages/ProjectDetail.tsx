import { Link, useParams } from "react-router";
import { projects } from "@/content/projects";
import { PROJECT_STATUS_META, type TimelineEvent } from "@/content/types";
import { renderMarkdown } from "@/lib/markdown";
import Comments from "@/components/Comments";

/** 时间轴事件类型的视觉配置 */
const EVENT_STYLE: Record<TimelineEvent["type"], { icon: string; color: string; label: string }> = {
  start: { icon: "🚀", color: "#4bf3c8", label: "立项" },
  milestone: { icon: "✦", color: "#5D80D9", label: "里程碑" },
  problem: { icon: "⚠", color: "#ff5d5d", label: "问题" },
  solution: { icon: "⚒", color: "#f8e42e", label: "解决" },
  harvest: { icon: "❋", color: "#ff7edb", label: "收获" },
  end: { icon: "◉", color: "#a8b3c7", label: "结项" },
};

/** 项目详情页：头部信息 + 垂直时间轴 + 正文复盘 */
export default function ProjectDetail() {
  const { id } = useParams();
  const p = projects.find((x) => x.id === id);

  if (!p) {
    return (
      <div className="max-w-3xl mx-auto px-5 py-32 text-center">
        <p className="text-5xl mb-6">🛰</p>
        <p style={{ color: "var(--ink-2)" }}>没有找到这个项目的航行日志。</p>
        <Link to="/projects" className="text-sm mt-4 inline-block hover:text-[#4bf3c8]" style={{ color: "var(--ink-3)" }}>← 返回项目轨迹</Link>
      </div>
    );
  }

  const st = PROJECT_STATUS_META[p.status];

  return (
    <article className="max-w-3xl mx-auto px-5 py-16">
      <Link to="/projects" className="text-sm hover:text-[#4bf3c8] transition-colors" style={{ color: "var(--ink-3)" }}>
        ← 返回项目轨迹
      </Link>

      <header className="mt-8 mb-12">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full"
            style={{ border: `1px solid ${st.color}55`, color: st.color }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: st.color }} />
            {st.label}
          </span>
          <span className="text-xs" style={{ color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>
            {p.startDate} → {p.endDate ?? "现在"}
          </span>
        </div>
        <h1 className="mt-4 text-3xl sm:text-4xl font-bold" style={{ color: "var(--ink)" }}>{p.title}</h1>
        <p className="mt-4 font-serif-sc text-lg" style={{ color: "var(--ink-2)" }}>{p.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.techStack.map((t) => (
            <span key={t} className="text-xs px-2 py-0.5 rounded" style={{ background: "var(--bg-soft)", color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>
              {t}
            </span>
          ))}
        </div>
        {p.links && (
          <div className="mt-4 flex gap-4">
            {p.links.map((l) => (
              <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="text-sm hover:text-[#4bf3c8] transition-colors" style={{ color: "var(--ink-2)" }}>
                {l.label} ↗
              </a>
            ))}
          </div>
        )}
      </header>

      {/* 垂直时间轴 */}
      <section className="mb-14">
        <h2 className="text-sm font-semibold tracking-[0.2em] mb-8" style={{ color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>
          ◈ 航行日志
        </h2>
        <div className="relative pl-8" style={{ borderLeft: "1px solid var(--line)" }}>
          {p.timeline.map((e, i) => {
            const s = EVENT_STYLE[e.type];
            return (
              <div key={i} className="relative pb-8 last:pb-0">
                {/* 节点 */}
                <span
                  className="absolute -left-[39px] top-1 w-3.5 h-3.5 rounded-full flex items-center justify-center"
                  style={{ background: "var(--bg)", border: `2px solid ${s.color}`, boxShadow: `0 0 8px ${s.color}66` }}
                />
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <span className="text-xs" style={{ color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>{e.date}</span>
                  <span className="text-xs px-1.5 py-0.5 rounded" style={{ color: s.color, background: `${s.color}14` }}>
                    {s.icon} {s.label}
                  </span>
                </div>
                <h3 className="mt-1.5 font-semibold" style={{ color: "var(--ink)" }}>{e.title}</h3>
                {e.detail && <p className="mt-1 text-sm font-serif-sc" style={{ color: "var(--ink-2)" }}>{e.detail}</p>}
              </div>
            );
          })}
        </div>
      </section>

      {/* 正文：背景 / 过程 / 复盘 */}
      <div className="prose-sc" dangerouslySetInnerHTML={{ __html: renderMarkdown(p.body) }} />

      {/* 评论区：term = 项目 ID */}
      <Comments term={p.id} />

      <footer className="mt-12 pt-6 text-xs" style={{ borderTop: "1px solid var(--line)", color: "var(--ink-3)" }}>
        © 2026 站长 · 转载请注明出处
      </footer>
    </article>
  );
}
