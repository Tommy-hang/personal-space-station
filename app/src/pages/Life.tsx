import { Link } from "react-router";

/** 生活切片（V1.0 板块，当前为占位） */
export default function Life() {
  return (
    <div className="relative max-w-3xl mx-auto px-5 py-24 text-center">
      <div className="stardust" />
      <div className="relative">
        <p className="text-[10px] tracking-[0.25em] mb-4" style={{ color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>LIFE SLICES</p>
        <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: "var(--ink)" }}>生活切片</h1>
        <p className="mt-6 text-4xl">❋</p>
        <p className="mt-6 font-serif-sc text-lg" style={{ color: "var(--ink-2)" }}>
          摄影画廊与图文故事将在 V1.0 版本抵达这里。
        </p>
        <p className="mt-2 text-sm" style={{ color: "var(--ink-3)" }}>
          规划中的能力：瀑布流画廊 · Lightbox 放大 · EXIF 元信息 · 心情标签 · 时间归档
        </p>
        <Link to="/" className="inline-block mt-10 text-sm hover:text-[#4bf3c8] transition-colors" style={{ color: "var(--ink-3)" }}>
          ← 回到首页
        </Link>
      </div>
    </div>
  );
}
