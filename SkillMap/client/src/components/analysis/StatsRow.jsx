export default function StatsRow({ matched, missing, blocked, total }) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">

      {/* MATCHED */}
      <div className="bg-[#ede7d5] border border-[#b8860b]/30 rounded p-5 shadow">
        <div className="text-[2rem] font-black text-[#2e7d50]">
          {matched.length}
        </div>
        <div className="text-[0.68rem] uppercase text-[#7a6a4f] tracking-widest">
          Skills Matched
        </div>
        <div className="h-1.5 bg-[#e6ddc7] rounded mt-3">
          <div
            className="h-full bg-[#2e7d50]"
            style= {{ width: `${(matched.length / total) * 100}%` }}
          />
        </div>
      </div>

      {/* MISSING */}
      <div className="bg-[#ede7d5] border border-[#b8860b]/30 rounded p-5 shadow">
        <div className="text-[2rem] font-black text-[#8b1a1a]">
          {missing.length}
        </div>
        <div className="text-[0.68rem] uppercase text-[#7a6a4f] tracking-widest">
          Skills Missing
        </div>
        <div className="h-1.5 bg-[#e6ddc7] rounded mt-3">
          <div
            className="h-full bg-[#b52020]"
            style={{ width: `${(missing.length / total) * 100}%` }}
          />
        </div>
      </div>

      {/* BLOCKED */}
      <div className="bg-[#ede7d5] border border-[#b8860b]/30 rounded p-5 shadow">
        <div className="text-[2rem] font-black text-[#b8860b]">
          {blocked.length}
        </div>
        <div className="text-[0.68rem] uppercase text-[#7a6a4f] tracking-widest">
          Blocked Skills
        </div>
        <div className="h-1.5 bg-[#e6ddc7] rounded mt-3">
          <div
            className="h-full bg-[#d4a017]"
            style={{
              width:
                blocked.length > 0
                  ? `${(blocked.length / missing.length) * 100}%`
                  : "0%",
            }}
          />
        </div>
      </div>

    </div>
  );
}