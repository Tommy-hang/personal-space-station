import { Link, NavLink, Outlet } from "react-router";
import { useTheme } from "@/hooks/useTheme";
import { site } from "@/content/site";

const NAV = [
  { to: "/knowledge", zh: "知识星座", en: "CONSTELLATION" },
  { to: "/projects", zh: "项目轨迹", en: "PROJECTS" },
  { to: "/life", zh: "生活切片", en: "SLICES" },
  { to: "/about", zh: "关于我", en: "ABOUT" },
  { to: "/guest-wall", zh: "留言墙", en: "GUEST WALL" },
];

export default function Layout() {
  const { theme, toggle } = useTheme();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      {/* 毛玻璃导航 */}
      <header
        className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl"
        style={{
          background: "color-mix(in srgb, var(--bg) 72%, transparent)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            {/* 站徽：四芒星 */}
            <svg width="22" height="22" viewBox="0 0 24 24" className="transition-transform duration-700 group-hover:rotate-180">
              <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" fill="url(#logo-g)" />
              <defs>
                <linearGradient id="logo-g" x1="0" y1="0" x2="24" y2="24">
                  <stop offset="0" stopColor="#3245ff" />
                  <stop offset="1" stopColor="#4bf3c8" />
                </linearGradient>
              </defs>
            </svg>
            <span className="font-semibold tracking-wide text-sm sm:text-base" style={{ color: "var(--ink)" }}>
              {site.name}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} className="group text-center leading-none">
                <span
                  className="block text-[10px] tracking-[0.18em] transition-colors"
                  style={{ color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}
                >
                  {n.en}
                </span>
                <span className="block mt-1 text-sm transition-colors group-hover:text-[#4bf3c8]" style={{ color: "var(--ink-2)" }}>
                  {n.zh}
                </span>
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              aria-label="切换深浅色模式"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
              style={{ border: "1px solid var(--line)", color: "var(--ink-2)" }}
            >
              {theme === "dark" ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4"/></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>
              )}
            </button>
            {/* 移动端菜单：简单横向滚动条 */}
          </div>
        </div>
        <nav className="md:hidden overflow-x-auto flex gap-6 px-5 pb-2.5 whitespace-nowrap">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} className="text-sm" style={{ color: "var(--ink-2)" }}>
              {n.zh}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      <footer className="mt-24" style={{ borderTop: "1px solid var(--line)" }}>
        <div className="max-w-6xl mx-auto px-5 py-10 flex flex-col sm:flex-row justify-between gap-4 text-sm" style={{ color: "var(--ink-3)" }}>
          <p>© 2026 {site.author} · 转载请注明出处 · 本站代码以 MIT 协议开源</p>
          <p style={{ fontFamily: "var(--font-mono)" }} className="text-xs tracking-wider">
            BUILT WITH REACT + VITE · CONTENT-DRIVEN · NO DATABASE
          </p>
        </div>
      </footer>
    </div>
  );
}
