import { useState } from "react";
import RoleGrid from "../components/onboarding/RoleGrid";
import SkillChips from "../components/onboarding/SkillChips";
import ResumeUpload from "../components/onboarding/ResumeUpload";
import { useNavigate } from "react-router-dom";


// ✅ NEW IMPORTS
import { ROLES, ALL_SKILLS } from "../utils/data";

export default function Onboarding({ onComplete }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [customSkill, setCustomSkill] = useState("");
  const [resumeActive, setResumeActive] = useState(false);
  const navigate = useNavigate();

  const toggleSkill = (s) =>
    setSelectedSkills((p) =>
      p.includes(s) ? p.filter((x) => x !== s) : [...p, s]
    );

  const addCustom = () => {
    const s = customSkill.trim();
    if (s && !selectedSkills.includes(s)) {
      setSelectedSkills((p) => [...p, s]);
      setCustomSkill("");
    }
  };

  // ✅ UPDATED resume logic (uses ROLES)
  const handleResume = () => {
    setResumeActive(true);

    const sim = selectedRole
      ? ROLES[selectedRole].skills.slice(0, 3)
      : ["Python", "SQL", "Excel"];

    setTimeout(() => {
      sim.forEach((s) => {
        setSelectedSkills((p) => (p.includes(s) ? p : [...p, s]));
      });
    }, 800);
  };

  return (
    <div className="max-w-220 mx-auto px-8 pt-12 pb-20">

      {/* HERO */}
      <div className="text-[0.68rem] tracking-[0.2em] uppercase text-[#b8860b] font-bold mb-3">
        intelligent skill mapping
      </div>

      <h1 className="text-[clamp(2rem,5.5vw,3.3rem)] font-black leading-[1.06] mb-4 font-[Playfair_Display]">
        Map your skills.<br />
        <span className="text-[#8b1a1a]">Face the truth.</span>
      </h1>

      <p className="text-[1.05rem] text-[#7a6a4f] max-w-140 mb-10">
        Select your target role, tell us what you know, and we’ll show you exactly where you stand — no flattery, just data.
      </p>

      {/* ROLE */}
      <RoleGrid
        ROLES={ROLES}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
      />

      {/* SKILLS */}
      {selectedRole && (
        <SkillChips
          ALL_SKILLS={ALL_SKILLS}
          selectedSkills={selectedSkills}
          toggleSkill={toggleSkill}
          customSkill={customSkill}
          setCustomSkill={setCustomSkill}
          addCustom={addCustom}
        />
      )}

      {/* RESUME */}
      {selectedRole && (
        <ResumeUpload
          resumeActive={resumeActive}
          handleResume={handleResume}
        />
      )}

      {/* ACTION */}
      <div className="flex gap-3 mt-8 items-center">
        <button
          disabled={!selectedRole || selectedSkills.length === 0}
          onClick={() => {
                onComplete(selectedRole, selectedSkills);
                navigate("/analysis"); // 🔥 THIS LINE
            }}
        className="px-8 py-3 bg-[#8b1a1a] text-white rounded text-[0.9rem] font-bold tracking-[0.04em] shadow-[0_2px_10px_rgba(139,26,26,0.3)] hover:bg-[#b52020] disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          Analyze My Skills →
        </button>

        {selectedRole && selectedSkills.length === 0 && (
          <span className="text-[0.8rem] text-[#7a6a4f]">
            Select at least one skill to continue
          </span>
        )}
      </div>

    </div>
  );
}