export default function SkillRow({ skill }) {
  return (
    <div className="flex items-center gap-4 py-2 border-b border-[#b8860b]/20 last:border-none">

      {/* DOT */}
      <div
        className={`w-2 h-2 rounded-full ${
          skill.status === "matched"
            ? "bg-[#2e7d50]"
            : skill.status === "blocked"
            ? "bg-[#b8860b]"
            : "bg-[#8b1a1a]"
        }`}
      />

      {/* NAME */}
      <span className="flex-1 text-[0.92rem]">
        {skill.name}
      </span>

      {/* STATUS BADGE */}
      <span
        className={`text-[0.7rem] px-3 py-0.5 rounded-full font-bold
        ${
          skill.status === "matched"
            ? "bg-[#2e7d50]/10 text-[#2e7d50]"
            : skill.status === "blocked"
            ? "bg-[#b8860b]/10 text-[#b8860b]"
            : "bg-[#8b1a1a]/10 text-[#8b1a1a]"
        }`}
      >
        {skill.status}
      </span>

      {/* PRIORITY */}
      {skill.status !== "matched" && (
        <span className="text-[0.7rem] px-3 py-0.5 rounded-full bg-[#b8860b]/10 text-[#b8860b] font-bold">
          {skill.priority}
        </span>
      )}
    </div>
  );
}