export default function RealityMessage({ role, icon, animated, cfg, matched, total }) {
  return (
    <div className="text-center">

      <div className="text-[0.7rem] uppercase tracking-widest text-[#7a6a4f] mb-6">
        {icon} Target: {role}
      </div>

      <div className="text-[0.7rem] text-[#7a6a4f] tracking-widest uppercase mb-2">
        You think you're ready. System says:
      </div>

      <div className="text-[1.5rem] font-bold font-[Playfair_Display]" style={{ color: cfg.color }}>
        {animated}% — {cfg.label}
      </div>

      <div className="text-[0.95rem] text-[#7a6a4f]">
        {matched} of {total} required skills matched
      </div>

    </div>
  );
}