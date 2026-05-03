import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ROLES } from "../utils/data";
import {
  compareSkills,
  detectBlockedSkills,
} from "../utils/roadmap";

import StatsRow from "../components/analysis/StatsRow";
import GapAnalysis from "../components/analysis/GapAnalysis";

export default function Analysis({ role, userSkills }) {
  const navigate = useNavigate();

  const roleData = ROLES[role];

  // 🛑 safety check (prevents crash)
  if (!roleData) {
    return (
      <div className="p-10 text-center">
        Invalid role. Go back and try again.
      </div>
    );
  }

  const { matched, missing } = compareSkills(
    userSkills,
    roleData.skills
  );

  const blocked = detectBlockedSkills(
    missing,
    roleData.deps
  );

  const [tab, setTab] = useState("all");

  const allSkills = roleData.skills.map((s) => {
    const isMatched = matched.includes(s);
    const isBlocked = blocked.includes(s);

    return {
      name: s,
      status: isMatched
        ? "matched"
        : isBlocked
        ? "blocked"
        : "missing",
      priority: roleData.priorities[s] || "MEDIUM",
    };
  });

  const filtered =
    tab === "all"
      ? allSkills
      : allSkills.filter((s) => s.status === tab);

  return (
    <div className="max-w-220 mx-auto px-8 pt-12 pb-16">

      {/* 🔥 HEADER (MATCHES YOUR DESIGN) */}
      <div className="flex justify-between items-start mb-6">

        {/* LEFT SIDE */}
        <div>
          <div className="text-[0.68rem] tracking-[0.2em] uppercase text-[#b8860b] font-bold mb-1">
            {roleData.icon} {role}
          </div>

          <h2 className="text-[1.8rem] font-[Playfair_Display] font-black">
            Skill Analysis Dashboard
          </h2>
        </div>

        {/* RIGHT SIDE BUTTONS */}
        <div className="flex gap-3 mt-2">
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2 border border-[#1c1208]/20 rounded text-[#7a6a4f] text-[0.85rem] hover:border-[#b8860b] hover:text-[#1c1208]"
          >
            ← Back
          </button>

          <button
            onClick={() => navigate("/reality")}
            className="px-6 py-2 bg-[#8b1a1a] text-white rounded font-bold text-[0.9rem] shadow hover:bg-[#b52020]"
          >
            Reality Check →
          </button>
        </div>

      </div>

      {/* 🔥 STATS */}
      <StatsRow
        matched={matched}
        missing={missing}
        blocked={blocked}
        total={roleData.skills.length}
      />

      {/* 🔥 SKILLS TABLE */}
      <GapAnalysis
        tab={tab}
        setTab={setTab}
        allSkills={allSkills}
        filtered={filtered}
      />

    </div>
  );
}