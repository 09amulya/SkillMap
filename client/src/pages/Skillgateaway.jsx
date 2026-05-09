import { useNavigate } from "react-router-dom";

const FloatingOrb = ({ className }) => (
  <div className={`absolute rounded-full blur-3xl opacity-20 pointer-events-none ${className}`} />
);

const GridLines = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(148,163,184,0.04)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  </div>
);

const GlowDivider = () => (
  <div className="flex items-center gap-4 w-full max-w-xs mx-auto my-10">
    <div className="flex-1 h-px bg-linear-to-r from-transparent to-slate-600" />
    <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
    <div className="flex-1 h-px bg-linear-to-l from-transparent to-slate-600" />
  </div>
);

const SkillCard = ({ title, description, tag, icon, accentClass, borderClass, glowClass, onClick }) => (
  <button
    onClick={onClick}
    className={`
      group relative w-full sm:w-72 text-left rounded-2xl p-px cursor-pointer
      transition-all duration-300 ease-out
      hover:scale-[1.03] active:scale-[0.98]
      focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400
      ${borderClass}
    `}
    style={{ background: "transparent" }}
  >
    <div className={`
      relative rounded-2xl p-7 h-full overflow-hidden
      bg-linear-to-b from-slate-800/80 to-slate-900/90
      backdrop-blur-sm transition-all duration-300
      group-hover:from-slate-700/80 group-hover:to-slate-800/90
    `}>
      <div className={`
        absolute inset-0 opacity-0 group-hover:opacity-100
        transition-opacity duration-300 rounded-2xl
        ${glowClass}
      `} />

      <span className={`
        inline-block text-xs font-semibold tracking-widest uppercase mb-5
        px-3 py-1 rounded-full border ${accentClass}
      `}>
        {tag}
      </span>

      <div className="mb-4 text-3xl">{icon}</div>

      <h3 className="text-xl font-bold text-slate-100 mb-2 tracking-tight leading-snug">
        {title}
      </h3>
      <p className="text-sm text-slate-400 leading-relaxed">
        {description}
      </p>

      <div className={`
        mt-6 flex items-center gap-2 text-sm font-medium
        transition-all duration-300 group-hover:gap-3
        ${accentClass.split(" ")[0]}
      `}>
        <span>Get started</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  </button>
);

export default function SkillGatewayHero() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden"
   style={{
  backgroundColor: "#fde68a", // same warm yellow
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
}}
    >
      

      <GridLines />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(56,100,220,0.12) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 flex flex-col items-center px-6 py-20 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-700/80 bg-[#1f2a44] backdrop-blur-sm mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-white tracking-wide font-medium">Personalized learning path</span>
        </div>

        <h1
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold  leading-[1.07] text-[#8b1a1a] mb-6"
          style={{ fontFamily: "'Sora', 'Outfit', sans-serif", letterSpacing: "-0.03em" }}
        >
          Start from where
          <br />
          <span className="relative inline-block">
            <span
              className="relative z-10 text-black"
              
            >
              you truly are.
            </span>
            <span
              className="absolute -inset-2 rounded-xl opacity-20 blur-xl pointer-events-none"
            />
          </span>
        </h1>

        <p className="text-base sm:text-lg text-black max-w-md leading-relaxed font-light">
          No guessing. No pretending.{" "}
          <span className="text-black">Just pick your real starting point.</span>
        </p>

        <GlowDivider />

        <div className="flex flex-col sm:flex-row items-center gap-5 w-full justify-center">
          <SkillCard
            title="Absolute Beginner"
            description="Start from zero with guided steps, clear explanations, and zero assumptions."
            tag="Start fresh"
            accentClass="text-emerald-400 border-emerald-700/50 bg-emerald-900/20"
            borderClass="bg-gradient-to-b from-emerald-600/30 to-emerald-800/10 hover:from-emerald-500/40 hover:to-emerald-700/20"
            glowClass="bg-gradient-to-t from-emerald-900/30 to-transparent"
            onClick={() => navigate("/counselling")}
          />

          <SkillCard
            title="I Know My job role"
            description="Skip the basics, test your current level, and jump right into what's next for you."
            tag="Level up"
            accentClass="text-sky-400 border-sky-700/50 bg-sky-900/20"
            borderClass="bg-gradient-to-b from-sky-600/30 to-sky-800/10 hover:from-sky-500/40 hover:to-sky-700/20"
            glowClass="bg-gradient-to-t from-sky-900/30 to-transparent"
            onClick={() => navigate("/landing")}
          />
        </div>

        <p className="mt-10 text-xs text-slate-600 tracking-wide">
          Your choice shapes everything that follows — you can always revisit later.
        </p>
      </div>
    </div>
  );
}