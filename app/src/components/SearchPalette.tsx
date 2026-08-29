import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { search, type SearchKind, type SearchResult } from "@/lib/search";

const GROUP_META: Record<SearchKind, { label: string; en: string }> = {
  knowledge: { label: "知识星座", en: "CONSTELLATION" },
  project: { label: "项目轨迹", en: "PROJECTS" },
  life: { label: "生活切片", en: "SLICES" },
};

const SUGGESTIONS = ["GNSS", "数字孪生", "光线追踪", "LightGBM", "电推进", "提示词"];

/** 板块图标：星座=四芒星，项目=六边形，切片=同心圆 */
function KindIcon({ kind, color }: { kind: SearchKind; color: string }) {
  if (kind === "knowledge")
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
        <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" fill={color} />
      </svg>
    );
  if (kind === "project")
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden>
        <path d="M12 2.5 L21 7.5 V16.5 L12 21.5 L3 16.5 V7.5 Z" fill="none" stroke={color} strokeWidth="2.4" />
      </svg>
    );
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="7" fill="none" stroke={color} strokeWidth="2.4" />
      <circle cx="12" cy="12" r="2.2" fill={color} />
    </svg>
  );
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** 关键词高亮 */
function Highlight({ text, terms }: { text: string; terms: string[] }) {
  if (!terms.length) return <>{text}</>;
  const re = new RegExp(`(${terms.map(escapeRegExp).join("|")})`, "gi");
  const parts = text.split(re);
  return (
    <>
      {parts.map((p, i) => (i % 2 === 1 ? <mark key={i}>{p}</mark> : p))}
    </>
  );
}

export default function SearchPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const terms = useMemo(() => query.trim().split(/\s+/).filter(Boolean), [query]);
  const groups = useMemo(() => search(query), [query]);
  const flat = useMemo(() => groups.flatMap((g) => g.results), [groups]);
  const total = flat.length;

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open) return null;

  const go = (r: SearchResult) => {
    onClose();
    navigate(r.url);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, flat.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      const r = flat[active];
      if (r) go(r);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  let idx = -1;

  return (
    <div
      className="fixed inset-0 z-[100] flex justify-center px-4"
      style={{ background: "rgba(10, 12, 18, 0.55)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl self-start mt-[10vh] rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: "var(--bg)",
          border: "1px solid var(--line)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.35)",
          maxHeight: "72vh",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 输入行 */}
        <div className="flex items-center gap-3 px-4 h-14 shrink-0" style={{ borderBottom: "1px solid var(--line)" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ color: "var(--ink-3)" }}>
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="搜索全部内容：文章、项目、切片…"
            className="flex-1 bg-transparent outline-none text-[15px]"
            style={{ color: "var(--ink)" }}
          />
          <kbd
            className="text-[10px] px-1.5 py-0.5 rounded"
            style={{ border: "1px solid var(--line)", color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}
          >
            ESC
          </kbd>
        </div>

        {/* 结果区 */}
        <div ref={listRef} className="overflow-y-auto flex-1">
          {!query.trim() && (
            <div className="px-5 py-8">
              <p className="text-sm" style={{ color: "var(--ink-3)" }}>
                输入关键词，跨板块搜索——支持多个词组合（空格分隔），试试：
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="text-xs px-3 py-1.5 rounded-full transition-colors hover:text-[#4bf3c8]"
                    style={{ border: "1px solid var(--line)", color: "var(--ink-2)" }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query.trim() && total === 0 && (
            <div className="px-5 py-10 text-center">
              <p className="text-2xl mb-3" style={{ color: "var(--ink-3)" }}>✦</p>
              <p className="text-sm" style={{ color: "var(--ink-2)" }}>
                没有找到与「{query.trim()}」相关的内容
              </p>
              <p className="mt-2 text-xs" style={{ color: "var(--ink-3)" }}>
                试试更短的词，或减少同时使用的关键词数量
              </p>
            </div>
          )}

          {query.trim() && total > 0 && (
            <p className="px-5 pt-3 pb-1 text-[11px]" style={{ color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>
              {total} RESULT{total > 1 ? "S" : ""}
            </p>
          )}

          {groups.map((g) => (
            <div key={g.kind} className="pb-2">
              {/* 分组标题：板块图标 + 中英文名 + 计数 + 分隔线 */}
              <div className="flex items-center gap-2 px-5 pt-4 pb-2">
                <KindIcon kind={g.kind} color="var(--ink-2)" />
                <span className="text-xs font-semibold tracking-wider" style={{ color: "var(--ink)" }}>
                  {GROUP_META[g.kind].label}
                </span>
                <span className="text-[10px] tracking-[0.2em]" style={{ color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>
                  {GROUP_META[g.kind].en}
                </span>
                <span
                  className="text-[10px] px-1.5 rounded-full"
                  style={{ border: "1px solid var(--line)", color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}
                >
                  {g.results.length}
                </span>
                <span className="flex-1 h-px" style={{ background: "var(--line)" }} />
              </div>

              {g.results.map((r) => {
                idx += 1;
                const i = idx;
                const isActive = i === active;
                return (
                  <button
                    key={r.id}
                    data-active={isActive}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(r)}
                    className="w-full flex items-start gap-3 px-5 py-2.5 text-left transition-colors"
                    style={{ background: isActive ? "color-mix(in srgb, var(--ink) 6%, transparent)" : "transparent" }}
                  >
                    {/* 行首图标：形状区分板块，颜色区分领域/状态 */}
                    <span className="w-6 pt-1 flex justify-center shrink-0">
                      <KindIcon kind={r.kind} color={r.accent} />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-medium truncate" style={{ color: "var(--ink)" }}>
                        <Highlight text={r.title} terms={terms} />
                      </span>
                      {r.snippet && (
                        <span className="block mt-0.5 text-xs leading-relaxed line-clamp-2" style={{ color: "var(--ink-3)" }}>
                          <Highlight text={r.snippet} terms={terms} />
                        </span>
                      )}
                    </span>
                    {/* 文字徽章：板块 · 分类/状态/日期 */}
                    <span
                      className="shrink-0 mt-0.5 flex items-center gap-1.5 text-[11px] px-2 py-0.5 rounded-full whitespace-nowrap"
                      style={{ border: "1px solid var(--line)", color: "var(--ink-3)" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: r.accent }} />
                      {r.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* 底部快捷键提示 */}
        <div
          className="shrink-0 flex items-center justify-between px-5 h-10 text-[11px]"
          style={{ borderTop: "1px solid var(--line)", color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}
        >
          <span>↑↓ 选择 · ↵ 打开 · ESC 关闭</span>
          <span>LOCAL INDEX · NO DATABASE</span>
        </div>
      </div>
    </div>
  );
}
