import { Link } from "react-router";
import Comments from "@/components/Comments";

/** 留言墙 —— 由 GitHub Discussions 驱动，与全站评论区同一后端 */
export default function GuestWall() {
  return (
    <div className="relative max-w-3xl mx-auto px-5 py-16">
      <div className="stardust" />
      <div className="relative">
        {/* 页头 */}
        <p className="text-[10px] tracking-[0.25em] mb-4" style={{ color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>
          GUEST WALL
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: "var(--ink)" }}>
          留言墙
        </h1>
        <p className="mt-4 font-serif-sc text-lg leading-relaxed" style={{ color: "var(--ink-2)" }}>
          路过此地，不妨留个脚印。读后感、勘误、问题、灵感，或者只是打个招呼——都行。
        </p>

        {/* 小提示 */}
        <div
          className="mt-8 rounded-2xl px-6 py-5 text-sm leading-relaxed"
          style={{ background: "var(--bg-card)", border: "1px solid var(--line)", color: "var(--ink-2)" }}
        >
          <p>
            <span style={{ color: "#4bf3c8" }}>✦</span> 这里和每篇文章底部的评论区共用同一套系统（GitHub Discussions），用 GitHub 账号登录一次即可全站评论。
          </p>
          <p className="mt-2" style={{ color: "var(--ink-3)" }}>
            不想注册？也可以去<Link to="/about" className="underline decoration-dotted underline-offset-4 hover:text-[#4bf3c8]">关于我</Link>页面找到邮箱，写信给我。
          </p>
        </div>

        {/* 评论串：term 固定为 guest-wall */}
        <Comments term="guest-wall" />
      </div>
    </div>
  );
}
