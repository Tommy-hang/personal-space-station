import { useEffect, useRef, useState } from "react";
import Giscus from "@giscus/react";
import { useTheme } from "@/hooks/useTheme";
import { giscus, giscusReady } from "@/content/site";

/**
 * 评论区 —— 基于 GitHub Discussions（Giscus）
 * 每个页面用稳定的 term（内容 ID）映射到独立讨论串，URL 变化不影响评论归属
 * 滚动接近可视区域时才注入 iframe，阅读体验零负担
 */
export default function Comments({ term }: { term: string }) {
  const { theme } = useTheme();
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          ob.disconnect();
        }
      },
      { rootMargin: "240px" },
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  return (
    <section ref={ref} className="mt-14">
      {/* 区头 */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-sm" style={{ color: "#4bf3c8" }}>✦</span>
        <h2 className="text-base font-semibold tracking-wide" style={{ color: "var(--ink)" }}>
          评论区
        </h2>
        <span className="text-[10px] tracking-[0.2em]" style={{ color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>
          GITHUB DISCUSSIONS
        </span>
        <span className="flex-1 h-px" style={{ background: "var(--line)" }} />
        <span className="text-xs hidden sm:inline" style={{ color: "var(--ink-3)" }}>
          GitHub 账号登录即可评论
        </span>
      </div>

      {!giscusReady ? (
        /* 站长未完成 Giscus 配置前的占位提示 */
        <div
          className="rounded-2xl px-6 py-8 text-center"
          style={{ border: "1px dashed var(--line)", color: "var(--ink-3)" }}
        >
          <p className="text-sm">✦ 评论区待激活</p>
          <p className="mt-2 text-xs leading-relaxed">
            站长完成 GitHub 侧一次性配置后自动开启：仓库设为 public → 开启 Discussions → 安装 Giscus App
          </p>
        </div>
      ) : visible ? (
        <Giscus
          repo={giscus.repo as `${string}/${string}`}
          repoId={giscus.repoId}
          category={giscus.category}
          categoryId={giscus.categoryId}
          mapping="specific"
          term={term}
          strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme={theme === "dark" ? "dark" : "light"}
          lang="zh-CN"
          loading="lazy"
        />
      ) : (
        /* 懒加载骨架 */
        <div className="rounded-2xl px-6 py-10 animate-pulse" style={{ border: "1px solid var(--line)" }}>
          <div className="h-3 w-24 rounded" style={{ background: "var(--line)" }} />
          <div className="mt-4 h-3 w-full rounded" style={{ background: "var(--line)" }} />
          <div className="mt-2 h-3 w-2/3 rounded" style={{ background: "var(--line)" }} />
        </div>
      )}
    </section>
  );
}
