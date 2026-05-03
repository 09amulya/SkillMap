import SkillRow from "./SkillRow";

export default function GapAnalysis({
  tab,
  setTab,
  allSkills,
  filtered,
}) {
  return (
    <div className="bg-[#ede7d5] border border-[#b8860b]/30 rounded p-5 shadow">

      {/* TABS */}
      <div className="flex gap-2 border-b border-[#b8860b]/30 pb-3 mb-6">
        {["all", "matched", "missing", "blocked"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1 text-[0.83rem] rounded ${
              tab === t
                ? "bg-[#8b1a1a]/10 text-[#8b1a1a] font-bold"
                : "text-[#7a6a4f] hover:text-[#1c1208]"
            }`}
          >
            {t} (
            {t === "all"
              ? allSkills.length
              : allSkills.filter((s) => s.status === t).length}
            )
          </button>
        ))}
      </div>

      {/* LIST */}
      {filtered.length === 0 ? (
        <div className="text-center text-[#7a6a4f]">
          No skills in this category
        </div>
      ) : (
        filtered.map((s) => <SkillRow key={s.name} skill={s} />)
      )}
    </div>
  );
}