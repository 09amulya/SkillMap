export default function StatusBanner({
  status,
  cfg,
  showBreakdown,
  highMissing,
  medMissing,
  matched
}) {
  return (
    <div className="mt-6">

      {/* MAIN STATUS */}
      <div
        className="flex items-center gap-4 px-6 py-5 rounded-md"
        style={{
          background: cfg.bg,
          border: `1px solid ${cfg.border}`,
        }}
      >
        <div className="text-[1.75rem]">{cfg.emoji}</div>

        <div>
          <div
            className="font-serif text-[1.05rem] font-bold"
            style={{ color: cfg.colorHex }}
          >
            {cfg.label}
          </div>

          <div className="text-[0.88rem] text-[#7a6a4f] leading-[1.65]">
            {cfg.desc}
          </div>
        </div>
      </div>

      {/* BREAKDOWN */}
      {showBreakdown && (
        <div className="mt-6 animate-fade-in">

          {/* STATS GRID */}
          <div className="grid grid-cols-3 gap-3 mb-5">

            {/* HIGH */}
            <div className="border rounded-md px-5 py-4 text-center bg-[#1a2540]">
              <div className="text-[0.68rem] uppercase tracking-widest text-[#9c8b6b] mb-1">
                HIGH priority gaps
              </div>
              <div
                className="font-serif text-[1.8rem] font-black"
                style={{
                  color:
                    highMissing.length > 0
                      ? "#8b1a1a"
                      : "#1a4a2e",
                }}
              >
                {highMissing.length}
              </div>
            </div>

            {/* MEDIUM */}
            <div className="border rounded-md px-5 py-4 text-center bg-[#1a2540]">
              <div className="text-[0.68rem] uppercase tracking-widest text-[#9c8b6b] mb-1">
                MEDIUM priority gaps
              </div>
              <div
                className="font-serif text-[1.8rem] font-black"
                style={{
                  color:
                    medMissing.length > 0
                      ? "#b8860b"
                      : "#1a4a2e",
                }}
              >
                {medMissing.length}
              </div>
            </div>

            {/* MATCHED */}
            <div className="border rounded-md px-5 py-4 text-center bg-[#1a2540]">
              <div className="text-[0.68rem] uppercase tracking-widest text-[#9c8b6b] mb-1">
                Skills you have
              </div>
              <div className="font-serif text-[1.8rem] font-black text-[#1a4a2e]">
                {matched}
              </div>
            </div>

          </div>

          {/* BLOCKING SKILLS */}
          {highMissing.length > 0 && (
            <div
              className="rounded-md px-5 py-4"
              style={{
                border: "1px solid rgba(139,26,26,0.3)",
                background: "rgba(139,26,26,0.04)",
              }}
            >
              <div className="font-serif font-bold text-[#8b1a1a] mb-3">
                🚫 Blocking Skills — Learn These First
              </div>

              <div className="flex flex-wrap gap-2">
                {highMissing.map((skill) => (
                  <span
                    key={skill}
                    className="text-[0.8rem] px-3 py-1 rounded-full"
                    style={{
                      background: "rgba(139,26,26,0.1)",
                      color: "#8b1a1a",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}