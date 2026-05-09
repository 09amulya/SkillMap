// src/components/onboarding/RoleGrid.jsx

export default function RoleGrid({ ROLES, selectedRole, setSelectedRole }) {
  return (
    <div className="bg-[#ede7d5] border border-[#b8860b]/30 rounded-md p-[1.6rem] mb-5 shadow-[0_2px_12px_rgba(26,18,8,0.1)]">

      <div className="text-[0.68rem] uppercase tracking-[0.18em] text-[#b8860b] font-bold mb-[1.1rem] pb-3 border-b border-[#b8860b]/30">
        01 — Target Role
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(155px,1fr))] gap-[0.65rem]">
        {Object.entries(ROLES).map(([role, data]) => (
          <button
            key={role}
            onClick={() => setSelectedRole(role)}
            className={`p-[0.8rem_1rem] rounded-[5px] text-left text-[0.88rem] shadow-[0_1px_4px_rgba(26,18,8,0.1)] transition
            ${
              selectedRole === role
                ? "border-[#8b1a1a] bg-[#8b1a1a]/10 text-[#8b1a1a] font-bold shadow-[0_2px_10px_rgba(139,26,26,0.15)]"
                : "border-[#b8860b]/30 bg-[#f5f0e8] hover:border-[#d4a017] hover:bg-[#e3dac9] hover:-translate-y-px"
            }`}
          >
            <span className="text-[1.2rem] block mb-[0.35rem]">
              {data.icon}
            </span>
            {role}
          </button>
        ))}
      </div>
    </div>
  );
}