import { useNavigate } from "react-router-dom";

export default function LandingPage() {

  const navigate = useNavigate(); // 🔥 THIS WAS MISSING OR WRONG PLACE

  return (
    <div className="min-h-screen text-[#1f2a44] px-8 py-12"
    style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E"), 
        linear-gradient(160deg, #f8f3e8 0%, #f0e8d0 45%, #ede4cc 100%)`,
        backgroundBlendMode: "overlay",
      }}
    >

      {/* HERO */}
      <div className="text-center max-w-3xl mx-auto mb-16">

        <h1 className="text-[clamp(2.2rem,5vw,3.2rem)] font-black tracking-tight">
          Map your direction.<br />
          <span className="text-[#8b1a1a]">Know where you really stand.</span>
        </h1>

        <p className="text-[#7a6a4f] text-[1.05rem]">
          Choose your domain and uncover your actual level — 
          no assumptions, just clarity.
        </p>

      </div>

      {/* BOX GRID */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

        {/* TECH */}
        <div className="p-6 rounded-xl border bg-[#1a2540]
        hover:scale-105 hover:shadow-xl transition duration-300 cursor-pointer"
        onClick={() => navigate("/login")}
        >
          <h2 className="text-xl font-semibold mb-2 text-white">Tech</h2>
          <p className="text-sm text-white">
            Web Development, Data Analyst, ML
          </p>
        </div>

        {/* DESIGN */}
        <div className="p-6 rounded-xl border bg-[#1a2540]
        hover:scale-105 hover:shadow-xl transition duration-300 cursor-pointer"
        onClick={() => navigate("/login")}
        >
          <h2 className="text-xl font-semibold mb-2 text-white">Designing</h2>
          <p className="text-sm text-white">
            UI/UX, Blender, Graphics
          </p>
        </div>

        {/* FINANCE */}
        <div className="p-6 rounded-xl border bg-[#1a2540] 
        hover:scale-105 hover:shadow-xl transition duration-300 cursor-pointer">
          <h2 className="text-xl font-semibold mb-2 text-white">Finance</h2>
          <p className="text-sm text-white">
            Accounting, Trading, Analysis
          </p>
        </div>

        {/* OPTIONAL */}
        <div className="p-6 rounded-xl border bg-[#1a2540]
        hover:scale-105 hover:shadow-xl transition duration-300 cursor-pointer">
          <h2 className="text-xl font-semibold mb-2 text-white">Explore</h2>
          <p className="text-sm text-white">
            Discover more paths
          </p>
        </div>
        
      </div>
    </div>
  );
}