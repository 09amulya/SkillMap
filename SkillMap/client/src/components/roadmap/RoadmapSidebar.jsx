export default function RoadmapSidebar({ score, missing, matched, onRestart }) {
  return (
    <div className="space-y-6">

      {/* PROGRESS */}
      <div className="px-5 py-4 border rounded-md bg-[#f6f1e5] border-[#e5d7b8]">

        <div className="text-[0.68rem] uppercase tracking-[0.12em] text-[#9c8b6b] mb-2">
          Current Readiness
        </div>

        <div className="h-2 w-full bg-[#e5d7b8] rounded overflow-hidden mb-3">
          <div
            className="h-full"
            style={{
              width: `${score}%`,
              background: "linear-gradient(90deg,#8b1a1a,#b8860b)",
            }}
          />
        </div>

        <div className="font-serif font-black text-xl text-[#b8860b]">
          {score}%
        </div>
      </div>

      {/* SUMMARY */}
      <div className="text-center">
        <div className="text-[0.75rem] text-[#9c8b6b] uppercase tracking-[0.12em] mb-3">
          {missing} skills to learn · {matched} mastered
        </div>

        <button
          onClick={onRestart}
          className="px-5 py-2 bg-[#8b1a1a] text-white rounded-md font-semibold"
        >
          Analyze Another Role →
        </button>
      </div>

    </div>
  );
}