// components/navbar/Navbar.jsx

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-10 py-4 bg-[#1a2540] border-b-[3px] border-[#b8860b] shadow-lg sticky top-0 z-50">

      {/* Logo */}
      <div className="font-[Playfair_Display] font-bold text-lg text-[#f0d878] ">
        Skill<span className="text-white font-normal">Map </span><span className="font-[Playfair_Display] font-black text-lg text-[#f0d878]">AI</span>
      </div>

      {/* Steps */}
      <div className="flex gap-1">

        <div className="flex items-center gap-2 px-3 py-1 text-xs tracking-widest rounded bg-[#b8860b]/20 text-[#f0d878]">
          <div className="w-2 h-2 rounded-full bg-[#f0d878]" />
          01/onboarding
        </div>

        <div className="flex items-center gap-2 px-3 py-1 text-xs tracking-widest text-white/30">
          <div className="w-2 h-2 rounded-full bg-white/30" />
          02/dashboard
        </div>

        <div className="flex items-center gap-2 px-3 py-1 text-xs tracking-widest text-white/30">
          <div className="w-2 h-2 rounded-full bg-white/30" />
          03/reality check
        </div>

        <div className="flex items-center gap-2 px-3 py-1 text-xs tracking-widest text-white/30">
          <div className="w-2 h-2 rounded-full bg-white/30" />
          04/roadmap
        </div>

      </div>
    </nav>
  );
};

export default Navbar;