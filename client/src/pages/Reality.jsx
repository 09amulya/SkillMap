import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ROLES } from "../utils/data";
import { compareSkills, calculateReadiness } from "../utils/roadmap";

import ScoreRing from "../components/reality/ScoreRing";
import RealityMessage from "../components/reality/RealityMessage";
import StatusBanner from "../components/reality/StatusBanner";

export default function Reality({ role, userSkills }) {
  const navigate = useNavigate(); // ✅ FIXED

  const roleData = ROLES[role];

  // 🛑 Safety check (warna crash hota agar role undefined hota)
  if (!roleData) {
    return (
      <div className="p-10 text-center text-red-600">
        Invalid role selected
      </div>
    );
  }

  // 🔹 SKILL MATCHING
  const { matched, missing } = compareSkills(
    userSkills || [],
    roleData.skills
  );

  // 🔹 SCORE
  const score = calculateReadiness(
    matched.length,
    roleData.skills.length
  );

  // 🔹 STATES
  const [animated, setAnimated] = useState(0);
  const [showBreakdown, setShowBreakdown] = useState(false);

  // 🔹 ANIMATION + BREAKDOWN TIMING
  useEffect(() => {
    const t1 = setTimeout(() => setAnimated(score), 300);
    const t2 = setTimeout(() => setShowBreakdown(true), 900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [score]);

  // 🔹 STATUS
  const status =
    score < 40 ? "not-ready" : score < 70 ? "almost" : "ready";

  // 🔹 CONFIG
  const statusConfig = {
    "not-ready": {
      emoji: "🚨",
      label: "Not Ready",
      desc: `You have ${missing.length} critical gaps to close before you're employable in this role.`,
      colorHex: "#8b1a1a",
      bg: "rgba(139,26,26,0.07)",
      border: "rgba(139,26,26,0.22)",
    },
    almost: {
      emoji: "⚡",
      label: "Almost Ready",
      desc: `You're making progress. ${missing.length} gaps remain.`,
      colorHex: "#b8860b",
      bg: "rgba(184,134,11,0.07)",
      border: "rgba(184,134,11,0.28)",
    },
    ready: {
      emoji: "🎯",
      label: "Job Ready",
      desc: `Strong foundation. Keep improving remaining gaps.`,
      colorHex: "#1a4a2e",
      bg: "rgba(26,74,46,0.07)",
      border: "rgba(26,74,46,0.22)",
    },
  };

  const cfg = statusConfig[status];

  // 🔹 PRIORITY SPLIT
  const highMissing = missing.filter(
    (s) => (roleData.priorities?.[s] || "MEDIUM") === "HIGH"
  );

  const medMissing = missing.filter(
    (s) => (roleData.priorities?.[s] || "MEDIUM") === "MEDIUM"
  );

  return (
    <div className="max-w-5xl mx-auto px-8 pt-12 pb-20">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-[0.7rem] uppercase tracking-[0.15em] text-[#b8860b]">
          reality check engine
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => navigate("/analysis")}
            className="px-4 py-2 border rounded-md text-sm hover:bg-gray-100 transition"
          >
            ← Back
          </button>

          <button
            onClick={() => navigate("/roadmap")}
            className="px-5 py-2 bg-[#8b1a1a] text-white rounded-md text-sm font-semibold hover:bg-[#6e1414] transition"
          >
            See Roadmap →
          </button>
        </div>
      </div>

      {/* SCORE RING */}
      <ScoreRing animated={animated} color={cfg.colorHex} />

      {/* MESSAGE */}
      <RealityMessage
        role={role}
        icon={roleData.icon}
        animated={animated}
        cfg={cfg}
        matched={matched.length}
        total={roleData.skills.length}
      />

      {/* STATUS + BREAKDOWN */}
      <StatusBanner
        status={status}
        cfg={cfg}
        showBreakdown={showBreakdown}
        highMissing={highMissing}
        medMissing={medMissing}
        matched={matched.length}
      />
    </div>
  );
}