import { Link } from "react-router";

/** 留言墙（Waline 接入前的占位页） */
export default function GuestWall() {
  return (
    <div className="relative max-w-3xl mx-auto px-5 py-24 text-center">
      <div className="stardust" />
      <div className="relative">
        <p className="text-[10px] tracking-[0.25em] mb-4" style={{ color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>GUEST WALL</p>
        <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: "var(--ink)" }}>留言墙</h1>
        <p className="mt-6 text-4xl">✉</p>
        <p className="mt-6 font-serif-sc text-lg" style={{ color: "var(--ink-2)" }}>
          留言墙正在建设中，将由 Waline 提供支持（独立部署，与主站解耦）。
        </p>
        <p className="mt-2 text-sm" style={{ color: "var(--ink-3)" }}>
          规划中的能力：匿名留言 · 博主回复 · 审核机制 · 邮件通知 · XSS 防护
        </p>
        <p className="mt-8 text-sm font-serif-sc" style={{ color: "var(--ink-2)" }}>
          在此之前，欢迎通过<Link to="/about" className="underline decoration-dotted underline-offset-4 hover:text-[#4bf3c8]">邮箱</Link>联系我。
        </p>
      </div>
    </div>
  );
}
