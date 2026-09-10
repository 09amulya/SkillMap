import { useNavigate } from "react-router-dom";
import { ROLES } from "../utils/data";
import {
  compareSkills,
  calculateReadiness,
  generateRoadmap,
} from "../utils/roadmap";

export default function Roadmap({ role, userSkills }) {
  const navigate = useNavigate();

  const roleData = ROLES[role];

  // 🧠 CORE LOGIC
  const { matched, missing } = compareSkills(
    userSkills,
    roleData.skills
  );

  const roadmap =
    generateRoadmap(
      missing,
      roleData.deps,
      roleData.priorities,
      roleData.resources
    ) || [];

  const score = calculateReadiness(
    matched.length,
    roleData.skills.length
  );

  return (
    <div className="max-w-5xl mx-auto px-8 pt-12 pb-20">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <div className="text-[0.7rem] uppercase tracking-[0.15em] text-[#b8860b]">
            industry-aligned learning roadmap
          </div>

          <h2 className="font-serif text-[1.3rem] font-bold text-[#1a1a1a]">
            {missing.length} steps to {role}
          </h2>

          {/* 🔥 NEW SOURCE LINE */}
          <div className="text-[0.7rem] text-[#9c8b6b] mt-1">
            Based on curated industry sources:
            <br />
            LinkedIn Job Roles • FreeCodeCamp • Developer Roadmaps • Mentor Insights
          </div>

          {/* 🔥 OPTIONAL BADGE */}
          <div className="mt-2">
            <span className="text-[0.65rem] px-2 py-1 bg-[#f6f1e5] border border-[#e5d7b8] rounded">
              Industry Verified
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/reality")}
            className="px-4 py-2 border rounded-md text-sm"
          >
            ← Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 border rounded-md text-sm"
          >
            Start Over
          </button>
        </div>
      </div>

      {/* EMPTY STATE */}
      {missing.length === 0 ? (
        <div className="text-center py-12 border rounded-md bg-[rgba(26,74,46,0.05)] border-[rgba(26,74,46,0.35)]">
          <div className="text-5xl mb-4">🏆</div>

          <div className="font-serif text-xl font-bold text-[#1a4a2e] mb-2">
            You already have all required skills!
          </div>

          <div className="text-[#7a6a4f] text-sm">
            You're fully equipped for this role. Start applying.
          </div>
        </div>
      ) : (
        <>
          {/* PROGRESS */}
          <div className="mb-6 px-5 py-4 border rounded-md flex items-center gap-6 bg-[#f6f1e5] border-[#e5d7b8]">

            <div className="flex-1">
              <div className="text-[0.68rem] uppercase tracking-[0.12em] text-[#9c8b6b] mb-1">
                Current Readiness
              </div>

              <div className="h-2 w-full bg-[#e5d7b8] rounded overflow-hidden">
                <div
                  className="h-full"
                  style={{
                    width: `${score}%`,
                    background:
                      "linear-gradient(90deg,#8b1a1a,#b8860b)",
                  }}
                />
              </div>
            </div>

            <div className="font-serif font-black text-[1.5rem] text-[#b8860b] min-w-15 text-right">
              {score}%
            </div>
          </div>

          {/* ROADMAP LIST */}
          <div>
            {roadmap.map((step, i) => (
              <div key={i} className="flex gap-5 pb-6">

                {/* LEFT */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-serif text-[0.85rem] font-bold
                    ${
                      step.type === "project"
                        ? "bg-[rgba(26,74,46,0.1)] border-2 border-[rgba(26,74,46,0.4)] text-[#1a4a2e]"
                        : "bg-[rgba(184,134,11,0.12)] border-2 border-[rgba(184,134,11,0.5)] text-[#b8860b]"
                    }`}
                  >
                    {i + 1}
                  </div>

                  {i < roadmap.length - 1 && (
                    <div className="w-px flex-1 bg-[#e5d7b8] mt-1" />
                  )}
                </div>

                {/* CONTENT */}
                <div className="flex-1 pt-1">

                  <div className="text-[0.68rem] uppercase tracking-[0.16em] text-[#9c8b6b] mb-1">
                    {step.type === "project"
                      ? "milestone"
                      : `step ${i + 1} · ${step.priority} priority`}
                  </div>

                  <div className="font-serif font-bold text-[1rem] text-[#1a1a1a] mb-1">
                    {step.type === "learn"
                      ? `Learn ${step.skill}`
                      : step.skill}
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
            ))}
          </div>
        </>
      )}

      {/* DIVIDER */}
      <div className="h-px bg-linear-to-r from-transparent via-[#e5d7b8] to-transparent my-7" />

      {/* FOOTER */}
      <div className="text-center py-4">
        <div className="text-[0.75rem] text-[#9c8b6b] uppercase tracking-[0.12em] mb-4">
          {missing.length} skills to learn · {matched.length} already mastered
        </div>

        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-[#8b1a1a] text-white rounded-md font-semibold"
        >
          Analyze Another Role →
        </button>

        <div className="text-[0.65rem] text-[#7a6a4f] mt-3">
          <button
          onClick={() => navigate("/consultation")}
          className="px-6 py-2 bg-[#0fba34] text-white rounded-md font-semibold text-xl">
            Consult Mentor →
          </button>      
        </div>

        

        
      </div>

    </div>
  );
}