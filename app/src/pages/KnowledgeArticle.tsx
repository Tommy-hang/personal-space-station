import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { starNodes, neighborsOf } from "@/lib/graph";
import { domainOf } from "@/content/site";
import { NODE_STATUS_META } from "@/content/types";
import { renderMarkdown } from "@/lib/markdown";
import Comments from "@/components/Comments";

/** 知识文章页：阅读进度条 + 领域色主题 + 双向关联 */
export default function KnowledgeArticle() {
  const { id } = useParams();
  const node = starNodes.find((n) => n.id === id);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!node) {
    return (
      <div className="max-w-3xl mx-auto px-5 py-32 text-center">
        <p className="text-5xl mb-6">☄️</p>
        <p style={{ color: "var(--ink-2)" }}>这颗星还没被点亮。</p>
        <Link to="/knowledge" className="text-sm mt-4 inline-block hover:text-[#4bf3c8]" style={{ color: "var(--ink-3)" }}>
          ← 返回星图
        </Link>
      </div>
    );
  }

  const d = domainOf(node.category);
  const related = neighborsOf(node.id);

  /** 系列导航：同系列文章按序排列，找上一篇/下一篇 */
  const seriesList = node.series
    ? starNodes.filter((n) => n.series?.name === node.series!.name).sort((a, b) => a.series!.order - b.series!.order)
    : null;
  const prev = seriesList?.find((n) => n.series!.order === node.series!.order - 1);
  const next = seriesList?.find((n) => n.series!.order === node.series!.order + 1);

  return (
    <div style={{ ["--domain" as string]: d.glow }}>
      {/* 阅读进度条 */}
      <div className="fixed top-16 left-0 right-0 h-0.5 z-40" style={{ background: "var(--line)" }}>
        <div
          className="h-full transition-[width] duration-100"
          style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${d.from}, ${d.to})` }}
        />
      </div>

      <article className="max-w-3xl mx-auto px-5 py-16">
        <Link to="/knowledge" className="text-sm hover:text-[#4bf3c8] transition-colors" style={{ color: "var(--ink-3)" }}>
          ← 返回知识星座
        </Link>

        {/* 文章头 */}
        <header className="mt-8 mb-10">
          {/* 系列标识 */}
          {node.series && (
            <div
              className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
              style={{
                background: `linear-gradient(120deg, ${d.from}18, ${d.to}18)`,
                border: `1px solid ${d.glow}44`,
                color: d.glow,
                fontFamily: "var(--font-mono)",
              }}
            >
              ✦ 系列《{node.series.name}》 · 第 {node.series.order} / {node.series.total} 篇
            </div>
          )}
          <div className="flex flex-wrap items-center gap-3 text-xs" style={{ fontFamily: "var(--font-mono)" }}>
            <span
              className="px-2.5 py-1 rounded-full"
              style={{ background: `linear-gradient(120deg, ${d.from}22, ${d.to}22)`, color: d.glow, border: `1px solid ${d.glow}44` }}
            >
              {node.category}
            </span>
            <span style={{ color: "var(--ink-2)" }}>{NODE_STATUS_META[node.status].icon} {NODE_STATUS_META[node.status].label}</span>
            <span style={{ color: "var(--ink-3)" }}>
              播种于 {node.createdAt} · 最后灌溉 {node.updatedAt}
            </span>
          </div>
          <h1 className="mt-5 text-3xl sm:text-4xl font-bold leading-snug" style={{ color: "var(--ink)" }}>
            {node.title}
          </h1>
          <p className="mt-4 font-serif-sc text-lg" style={{ color: "var(--ink-2)" }}>{node.description}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {node.tags.map((t) => (
              <span key={t} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--bg-soft)", color: "var(--ink-3)" }}>
                #{t}
              </span>
            ))}
          </div>
        </header>

        {/* 正文 */}
        <div
          className="prose-sc"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(node.body) }}
        />

        {/* 相关星座：双向链接 */}
        {related.length > 0 && (
          <section className="mt-16 rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}>
            <h2 className="text-sm font-semibold tracking-[0.2em] mb-5" style={{ color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>
              ✦ 相关星座
            </h2>
            <div className="space-y-3">
              {related.map((r) => {
                const rd = domainOf(r.category);
                return (
                  <Link
                    key={r.id}
                    to={`/knowledge/${r.id}`}
                    className="flex items-center gap-3 group"
                  >
                    <span
                      className="w-2 h-2 rotate-45 shrink-0 transition-transform group-hover:scale-150"
                      style={{ background: `linear-gradient(135deg, ${rd.from}, ${rd.to})` }}
                    />
                    <span className="text-sm transition-colors group-hover:text-[#4bf3c8]" style={{ color: "var(--ink-2)" }}>
                      {r.title}
                    </span>
                    <span className="text-xs ml-auto shrink-0" style={{ color: "var(--ink-3)" }}>{r.category}</span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* 系列上一篇 / 下一篇 */}
        {seriesList && (
          <nav className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {prev ? (
              <Link
                to={`/knowledge/${prev.id}`}
                className="rounded-2xl p-5 transition-all hover:-translate-y-0.5"
                style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}
              >
                <span className="text-xs" style={{ color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>
                  ← 上一篇 · 第 {prev.series!.order} 篇
                </span>
                <p className="mt-1.5 text-sm font-semibold" style={{ color: "var(--ink)" }}>{prev.title}</p>
              </Link>
            ) : <span />}
            {next ? (
              <Link
                to={`/knowledge/${next.id}`}
                className="rounded-2xl p-5 text-right transition-all hover:-translate-y-0.5 sm:col-start-2"
                style={{ background: "var(--bg-card)", border: `1px solid ${d.glow}44` }}
              >
                <span className="text-xs" style={{ color: d.glow, fontFamily: "var(--font-mono)" }}>
                  下一篇 · 第 {next.series!.order} 篇 →
                </span>
                <p className="mt-1.5 text-sm font-semibold" style={{ color: "var(--ink)" }}>{next.title}</p>
              </Link>
            ) : (
              <div
                className="rounded-2xl p-5 text-right sm:col-start-2"
                style={{ border: `1px dashed ${d.glow}44` }}
              >
                <span className="text-xs" style={{ color: d.glow, fontFamily: "var(--font-mono)" }}>✦ 系列终篇</span>
                <p className="mt-1.5 text-sm" style={{ color: "var(--ink-2)" }}>感谢读完整个系列</p>
              </div>
            )}
          </nav>
        )}

        {/* 评论区：term = 文章 ID，URL 变化不影响评论归属 */}
        <Comments term={node.id} />

        {/* 版权尾注 */}
        <footer className="mt-12 pt-6 text-xs" style={{ borderTop: "1px solid var(--line)", color: "var(--ink-3)" }}>
          © 2026 站长 · 转载请注明出处 · 本文以 CC BY-NC-SA 4.0 协议共享
        </footer>
      </article>
    </div>
  );
}
