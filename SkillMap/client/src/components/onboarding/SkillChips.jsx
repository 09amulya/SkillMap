// src/components/onboarding/SkillChips.jsx

export default function SkillChips({
  ALL_SKILLS,
  selectedSkills,
  toggleSkill,
  customSkill,
  setCustomSkill,
  addCustom,
}) {
  return (
    <div className="bg-[#ede7d5] border border-[#b8860b]/30 rounded-md p-[1.6rem] mb-5 shadow-[0_2px_12px_rgba(26,18,8,0.1)]">

      <div className="text-[0.68rem] uppercase tracking-[0.18em] text-[#b8860b] font-bold mb-[1.1rem] pb-3 border-b border-[#b8860b]/30">
        02 — Your Current Skills ({selectedSkills.length} selected)
      </div>

      <div className="flex flex-wrap gap-[0.45rem] mb-4">
            {ALL_SKILLS.sort().map((s) => (
        <button
        key={s}
        onClick={() => toggleSkill(s)}
        className={`inline-flex items-center justify-center
        px-[0.9rem] py-[0.4rem]
        text-[0.8rem] font-medium
        rounded-full
        border
        shadow-[0_1px_2px_rgba(0,0,0,0.05)]
        transition-all duration-150
        
        ${
            selectedSkills.includes(s)
            ? "border-[#2e7d50] bg-[#2e7d50]/15 text-[#2e7d50] font-semibold"
            : "border-[#cbbfa3] bg-[#f5f0e8] text-[#6f6247] hover:border-[#b8860b] hover:bg-[#ece4cf]"
        }
        `}
        >
        {s}
        </button>
        ))}
        </div>

      {/* INPUT */}
      <div className="flex gap-2 mt-3">
        <input
          type="text"
          placeholder="Add a custom skill..."
          value={customSkill}
          onChange={(e) => setCustomSkill(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addCustom()}
          className="flex-1 bg-[#f5f0e8] border border-[#b8860b]/50 rounded-xl px-4 py-2 text-[#1c1208]"
        />

        <button
          onClick={addCustom}
          className="px-5 py-2 border border-[#1c1208]/20 rounded-xl text-[#7a6a4f] hover:border-[#b8860b] hover:text-[#1c1208]"
        >
          Add
        </button>
      </div>

      {/* CUSTOM */}
      {selectedSkills.filter((s) => !ALL_SKILLS.includes(s)).length > 0 && (
        <div className="mt-3 flex gap-[0.4rem] flex-wrap">
          {selectedSkills
            .filter((s) => !ALL_SKILLS.includes(s))
            .map((s) => (
              <span
                key={s}
                onClick={() => toggleSkill(s)}
                className="px-[0.85rem] py-[0.35rem] rounded-full border border-[#2e7d50] bg-[#2e7d50]/10 text-[#2e7d50] text-[0.8rem] cursor-pointer font-bold"
              >
                {s} ×
              </span>
            ))}
        </div>
      )}
    </div>
  );
}