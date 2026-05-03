export default function ScoreRing({ animated, color }) {
  const r = 76;
  const circ = 2 * Math.PI * r;
  const fill = (animated / 100) * circ;

  return (
    <div className="relative w-46.25 h-46.25 mx-auto mb-7">
      <svg
        width="185"
        height="185"
        viewBox="0 0 185 185"
        className="-rotate-90 drop-shadow-[0_0_8px_rgba(184,134,11,0.25)]"
      >
        <circle
          cx="92"
          cy="92"
          r={r}
          fill="none"
          stroke="rgba(184,134,11,0.15)"
          strokeWidth="10"
        />
        <circle
          cx="92"
          cy="92"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={`${fill} ${circ}`}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        />
      </svg>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-[2.8rem] font-black font-[Playfair_Display]" style={{ color }}>
          {animated}%
        </div>
        <div className="text-[0.68rem] uppercase tracking-widest text-[#7a6a4f]">
          readiness
        </div>
      </div>
    </div>
  );
}