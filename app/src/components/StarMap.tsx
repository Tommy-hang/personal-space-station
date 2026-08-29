import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { starNodes, starEdges } from "@/lib/graph";
import { domainOf } from "@/content/site";
import { NODE_STATUS_META } from "@/content/types";

/**
 * 星图（MVP 版）：纯 SVG 静态分区布局
 * - 节点 = 四芒星 + 光晕，大小随生长状态
 * - 悬停：节点放大、关联连线高亮、其余变暗
 * - 点击：跳转文章页
 */
const SIZE: Record<string, number> = { seedling: 5, growing: 7, evergreen: 9, archived: 5 };

export default function StarMap({
  activeId,
  onHover,
}: {
  activeId: string | null;
  onHover: (id: string | null) => void;
}) {
  const navigate = useNavigate();
  const [innerHover, setInnerHover] = useState<string | null>(null);
  const active = activeId ?? innerHover;

  /** 与悬停节点相连的边 */
  const linkedIds = useMemo(() => {
    if (!active) return null;
    const set = new Set([active]);
    starEdges.forEach((e) => {
      if (e.from === active) set.add(e.to);
      if (e.to === active) set.add(e.from);
    });
    return set;
  }, [active]);

  const pos = useMemo(() => new Map(starNodes.map((n) => [n.id, n])), []);

  return (
    <svg viewBox="0 0 1000 640" className="w-full h-full select-none" role="img" aria-label="知识星座星图">
      <defs>
        {Object.entries({ ai: ["#3245ff", "#4bf3c8"], ph: ["#ff7d54", "#f8e42e"], ps: ["#ff5d5d", "#ff5df9"], wr: ["#8d46e7", "#4b9ef3"] }).map(
          ([k, [a, b]]) => (
            <linearGradient key={k} id={`edge-${k}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor={a} />
              <stop offset="1" stopColor={b} />
            </linearGradient>
          )
        )}
        <radialGradient id="star-glow">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 连线层 */}
      {starEdges.map((e) => {
        const a = pos.get(e.from)!;
        const b = pos.get(e.to)!;
        const hot = linkedIds?.has(e.from) && linkedIds?.has(e.to);
        const dim = linkedIds && !hot;
        return (
          <line
            key={`${e.from}-${e.to}`}
            x1={a.x} y1={a.y} x2={b.x} y2={b.y}
            stroke={hot ? domainOf(a.category).glow : "#4b5670"}
            strokeWidth={hot ? 1.6 : 0.8}
            strokeOpacity={dim ? 0.08 : hot ? 0.9 : 0.28}
            strokeDasharray={hot ? "none" : "3 5"}
            style={{ transition: "all 0.35s ease" }}
          />
        );
      })}

      {/* 节点层 */}
      {starNodes.map((n, i) => {
        const d = domainOf(n.category);
        const r = SIZE[n.status];
        const isActive = active === n.id;
        const dim = linkedIds && !linkedIds.has(n.id);
        return (
          <g
            key={n.id}
            transform={`translate(${n.x} ${n.y})`}
            opacity={dim ? 0.18 : 1}
            style={{ cursor: "pointer", transition: "opacity 0.35s ease" }}
            onMouseEnter={() => { setInnerHover(n.id); onHover(n.id); }}
            onMouseLeave={() => { setInnerHover(null); onHover(null); }}
            onClick={() => navigate(`/knowledge/${n.id}`)}
          >
            {/* 光晕 */}
            <circle r={isActive ? r * 4.2 : r * 3} fill={d.glow} opacity={isActive ? 0.35 : 0.14} style={{ transition: "all 0.35s ease" }}>
              <animate attributeName="r" values={`${r * 3};${r * 3.6};${r * 3}`} dur={`${4 + i * 0.7}s`} repeatCount="indefinite" />
            </circle>
            {/* 四芒星核心 */}
            <path
              d={`M0 ${-r} L${r * 0.28} ${-r * 0.28} L${r} 0 L${r * 0.28} ${r * 0.28} L0 ${r} L${-r * 0.28} ${r * 0.28} L${-r} 0 L${-r * 0.28} ${-r * 0.28} Z`}
              fill={d.glow}
              style={{
                transition: "transform 0.35s ease",
                transform: isActive ? "scale(1.5)" : "scale(1)",
                filter: isActive ? `drop-shadow(0 0 8px ${d.glow})` : `drop-shadow(0 0 3px ${d.glow}80)`,
              }}
            />
            {/* 悬停标签 */}
            {(isActive || innerHover === n.id) && (
              <g transform={`translate(0 ${-r - 14})`}>
                <text
                  textAnchor="middle"
                  fill="#eef1f7"
                  fontSize="15"
                  fontWeight="600"
                  style={{ paintOrder: "stroke", stroke: "#0d0f14", strokeWidth: 5, fontFamily: "var(--font-sans)" }}
                >
                  {n.title.length > 14 ? n.title.slice(0, 14) + "…" : n.title}
                </text>
                <text
                  y="16" textAnchor="middle"
                  fill={d.glow} fontSize="11"
                  style={{ paintOrder: "stroke", stroke: "#0d0f14", strokeWidth: 4, fontFamily: "var(--font-mono)" }}
                >
                  {NODE_STATUS_META[n.status].icon} {NODE_STATUS_META[n.status].label} · {n.category}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}
