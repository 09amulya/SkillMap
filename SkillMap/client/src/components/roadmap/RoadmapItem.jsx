export default function RoadmapItem({ step, index, isLast }) {
  return (
    <div className="flex gap-5 pb-6">

      {/* LEFT SIDE */}
      <div className="flex flex-col items-center">
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center font-serif text-[0.85rem] font-bold
          ${
            step.type === "project"
              ? "bg-[rgba(26,74,46,0.1)] border-2 border-[rgba(26,74,46,0.4)] text-[#1a4a2e]"
              : "bg-[rgba(184,134,11,0.12)] border-2 border-[rgba(184,134,11,0.5)] text-[#b8860b]"
          }`}
        >
          {index + 1}
        </div>

        {!isLast && (
          <div className="w-px flex-1 bg-[#e5d7b8] mt-1" />
        )}
      </div>

      {/* CONTENT */}
      <div className="flex-1 pt-1">

        <div className="text-[0.68rem] uppercase tracking-[0.16em] text-[#9c8b6b] mb-1">
          {step.type === "project"
            ? "milestone"
            : `step ${index + 1} · ${step.priority} priority`}
        </div>

        <div className="font-serif font-bold text-[1rem] text-[#1a1a1a] mb-1">
          {step.type === "learn" ? `Learn ${step.skill}` : step.skill}
        </div>

        <div className="text-[0.88rem] text-[#7a6a4f] leading-[1.65]">
          {step.type === "learn"
            ? `Resource: ${step.resource}`
            : step.resource}
        </div>

        {step.deps?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2 items-center">
            <span className="text-[0.7rem] text-[#9c8b6b]">
              requires:
            </span>

            {step.deps.map((d) => (
              <span
                key={d}
                className="px-2 py-0.5 text-[0.7rem] rounded border border-[#e5d7b8] bg-[#f6f1e5] text-[#7a6a4f]"
              >
                {d}
              </span>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}