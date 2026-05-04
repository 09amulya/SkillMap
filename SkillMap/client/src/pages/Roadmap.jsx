import { useState } from "react";
import WarZone from "../components/warzone/WarZone";
import { useNavigate } from "react-router-dom";

import { ROLES } from "../utils/data";
import {
  compareSkills,
  calculateReadiness,
  generateRoadmap,
} from "../utils/roadmap";

export default function Roadmap({ role, userSkills }) {
  const navigate = useNavigate();
  const [inWarZone, setInWarZone] = useState(false);

  if (inWarZone) {
    return <WarZone onBack={() => setInWarZone(false)} />;
  }

  const roleData = ROLES[role];

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
          <div className="text-xs uppercase text-yellow-600">
            industry-aligned learning roadmap
          </div>

          <h2 className="text-xl font-bold">
            {missing.length} steps to {role}
          </h2>

          <div className="text-sm text-gray-500 mt-1">
            Based on curated industry sources
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={() => setInWarZone(true)}
          className="px-4 py-2 bg-orange-500 text-white rounded"
        >
          ⚔️ Enter Grind Zone!
        </button>
      </div>

      {/* EMPTY */}
      {missing.length === 0 ? (
        <div className="text-center py-10 border rounded">
          <h3 className="text-lg font-bold">
            You already have all required skills!
          </h3>
        </div>
      ) : (
        <>
          {/* PROGRESS */}
          <div className="mb-6">
            <div className="text-sm mb-2">Readiness: {score}%</div>

            <div className="w-full h-2 bg-gray-300 rounded">
              <div
                className="h-2 bg-green-500 rounded"
                style={{ width: score + "%" }}
              ></div>
            </div>
          </div>

          {/* LIST */}
          <div>
            {roadmap.map((step, i) => (
              <div key={i} className="mb-4 border-b pb-2">
                <div className="font-bold">
                  Step {i + 1}: {step.skill}
                </div>

                <div className="text-sm text-gray-600">
                  {step.resource}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <div className="text-[0.65rem] text-[#7a6a4f] mt-3">
          <button
          onClick={() => navigate("/Consultation")}
          className="px-6 py-2 bg-[#0fba34] text-white rounded-md font-semibold text-xl">
            Consult Mentor →
          </button>      
        </div>
    </div>
  );
}