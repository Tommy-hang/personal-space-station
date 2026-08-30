import { useState } from "react";
import { Link } from "react-router";
import { projects } from "@/content/projects";
import { PROJECT_STATUS_META, type ProjectStatus } from "@/content/types";

/** 项目轨迹首页：卡片墙 + 状态筛选 */
export default function Projects() {
  const [filter, setFilter] = useState<ProjectStatus | null>(null);
  const list = filter ? projects.filter((p) => p.status === filter) : projects;

  return (
    <div className="max-w-6xl mx-auto px-5 py-12">
      <header className="mb-10">
        <p className="text-[10px] tracking-[0.25em] mb-3" style={{ color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>
          PROJECT TRAJECTORY
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: "var(--ink)" }}>项目轨迹</h1>
        <p className="mt-3 max-w-xl font-serif-sc" style={{ color: "var(--ink-2)" }}>
          每个项目都是一次航行：立项、里程碑、触礁、修复、收获。完整记录，包括失败的部分。
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter(null)}
            className="px-4 py-1.5 rounded-full text-sm transition-all"
            style={{ border: `1px solid ${filter === null ? "#8fb8ff" : "var(--line)"}`, color: filter === null ? "#8fb8ff" : "var(--ink-2)" }}
          >
            全部
          </button>
          {(Object.keys(PROJECT_STATUS_META) as ProjectStatus[]).map((s) => {
            const m = PROJECT_STATUS_META[s];
            return (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className="px-4 py-1.5 rounded-full text-sm transition-all flex items-center gap-1.5"
                style={{ border: `1px solid ${filter === s ? m.color : "var(--line)"}`, color: filter === s ? m.color : "var(--ink-2)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: m.color }} />
                {m.label}
              </button>
            );
          })}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {list.map((p) => {
          const st = PROJECT_STATUS_META[p.status];
          return (
            <Link
              key={p.id}
              to={`/projects/${p.id}`}
              className="group rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
              style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full"
                  style={{ border: `1px solid ${st.color}55`, color: st.color }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: st.color }} />
                  {st.label}
                </span>
                <span className="text-xs" style={{ color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>
                  {p.startDate} → {p.endDate ?? "现在"}
                </span>
              </div>
              <h2 className="mt-4 text-xl font-semibold" style={{ color: "var(--ink)" }}>{p.title}</h2>
              <p className="mt-2 text-sm font-serif-sc line-clamp-3" style={{ color: "var(--ink-2)" }}>{p.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.techStack.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] px-2 py-0.5 rounded"
                    style={{ background: "var(--bg-soft)", color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs transition-transform duration-300 group-hover:translate-x-1" style={{ color: "#4bf3c8" }}>
                查看完整时间轴 →
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
