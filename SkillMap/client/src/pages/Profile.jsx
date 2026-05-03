import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── Mock data (remove when real API is ready) ───────────────────────────────
const MOCK_USER = {
  name: "Abhirag Verma",
  role: "Full-Stack Engineer",
  level: "Mid-Level",
  skills: ["JavaScript", "React", "CSS", "Python", "Git"],
  progress: 68,
  completedCourses: 5,
  totalCourses: 8,
  streak: 12,
  xp: 3240,
};

// ─── Skill suggestion pool ────────────────────────────────────────────────────
const SKILL_POOL = [
  { name: "React", icon: "⚛️" },
  { name: "Node.js", icon: "🟩" },
  { name: "APIs", icon: "🔌" },
  { name: "TypeScript", icon: "🔷" },
  { name: "Docker", icon: "🐳" },
  { name: "GraphQL", icon: "🔗" },
];

// ─── Tiny helpers ─────────────────────────────────────────────────────────────
const levelColor = (lvl) => {
  const map = {
    "Junior": "text-emerald-600 bg-emerald-50 border-emerald-200",
    "Mid-Level": "text-sky-600 bg-sky-50 border-sky-200",
    "Senior": "text-violet-600 bg-violet-50 border-violet-200",
  };
  return map[lvl] ?? "text-slate-600 bg-slate-50 border-slate-200";
};

// ─── Sub-components ───────────────────────────────────────────────────────────
function StatPill({ icon, value, label }) {
  return (
    <div className="flex flex-col items-center gap-1 px-5 py-3 bg-slate-50 rounded-2xl border border-slate-100">
      <span className="text-2xl">{icon}</span>
      <span className="text-xl font-bold text-slate-800 leading-none">{value}</span>
      <span className="text-xs text-slate-400 font-medium tracking-wide uppercase">{label}</span>
    </div>
  );
}

function SectionCard({ title, badge, children }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm shadow-slate-100 overflow-hidden">
      <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-50">
        <h2 className="text-base font-semibold text-slate-800 tracking-tight">{title}</h2>
        {badge && (
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-500">
            {badge}
          </span>
        )}
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 animate-pulse space-y-6">
      <div className="h-10 rounded-2xl w-2/5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E"), 
        linear-gradient(160deg, #f8f3e8 0%, #f0e8d0 45%, #ede4cc 100%)`,
        backgroundBlendMode: "overlay",
      }} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-36 bg-slate-100 rounded-3xl" />
        ))}
      </div>
    </div>
  );
}

// ─── Error state ──────────────────────────────────────────────────────────────
function ErrorState({ onBack }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-20 text-center">
      <div className="text-5xl mb-4">⚠️</div>
      <h2 className="text-xl font-semibold text-slate-800 mb-2">Couldn't load profile</h2>
      <p className="text-slate-400 mb-6 text-sm">Check your connection and try again.</p>
      <button
        onClick={onBack}
        className="bg-slate-900 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-slate-700 transition-colors"
      >
        ← Go Back
      </button>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/user/profile", {
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error("Non-OK response");
        const data = await res.json();
        setUser(data);
      } catch {
        // ── Swap the two lines below when your API is live ──
        setUser(MOCK_USER); // remove this
        // setError(true);   // uncomment this
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <Skeleton />;
  if (error) return <ErrorState onBack={() => navigate("/")} />;
  if (!user) return null;

  const suggestions = SKILL_POOL.filter((s) => !user.skills.includes(s.name));
  const progressPct = user.progress ?? Math.round((user.completedCourses / user.totalCourses) * 100);

  return (
    <div className="min-h-screen" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E"), 
        linear-gradient(160deg, #f8f3e8 0%, #f0e8d0 45%, #ede4cc 100%)`,
        backgroundBlendMode: "overlay",
      }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-6">

        {/* ── Header ── */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400 font-medium mb-0.5">Dashboard</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Welcome back, {user.name} 👋
            </h1>
          </div>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 border border-slate-200 bg-white px-4 py-2 rounded-xl hover:border-slate-300 transition-all shadow-sm"
          >
            ← Back
          </button>
        </div>

        {/* ── Quick stats row ── */}
        <div className="flex flex-wrap gap-3">
          <StatPill icon="🔥" value={`${user.streak}d`} label="Streak" />
          <StatPill icon="⚡" value={user.xp.toLocaleString()} label="XP Earned" />
          <StatPill icon="📘" value={`${user.completedCourses}/${user.totalCourses}`} label="Courses" />
          <StatPill icon="🛠️" value={user.skills.length} label="Skills" />
        </div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Career Goal */}
          <SectionCard title="Career Goal">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-slate-800 to-slate-600 flex items-center justify-center text-xl shrink-0">
                🎯
              </div>
              <div className="space-y-2 flex-1">
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-0.5">Target Role</p>
                  <p className="text-lg font-bold text-slate-800">{user.role}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-1">Current Level</p>
                  <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border ${levelColor(user.level)}`}>
                    {user.level}
                  </span>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Progress */}
          <SectionCard title="Progress Overview" badge={`${progressPct}% complete`}>
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-slate-500 font-medium mb-1">
                <span>Overall completion</span>
                <span className="text-slate-700 font-semibold">{progressPct}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="h-2.5 rounded-full bg-linear-to-r from-slate-700 to-slate-500 transition-all duration-700"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
                  <p className="text-xs text-slate-400 mb-0.5">Completed</p>
                  <p className="text-lg font-bold text-slate-800">{user.completedCourses} <span className="text-sm font-medium text-slate-400">courses</span></p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
                  <p className="text-xs text-slate-400 mb-0.5">Remaining</p>
                  <p className="text-lg font-bold text-slate-800">{user.totalCourses - user.completedCourses} <span className="text-sm font-medium text-slate-400">courses</span></p>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Skills */}
          <SectionCard title="Your Skills" badge={`${user.skills.length} skills`}>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-full"
                >
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  {skill}
                </span>
              ))}
            </div>
          </SectionCard>

          {/* Suggested Skills */}
          <SectionCard title="Suggested Skills" badge="Recommended">
            <div className="space-y-2">
              {suggestions.slice(0, 4).map((s, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-200 hover:bg-slate-100 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{s.icon}</span>
                    <span className="text-sm font-semibold text-slate-700">{s.name}</span>
                  </div>
                  <span className="text-xs font-medium text-slate-400 group-hover:text-slate-600 transition-colors">
                    + Add →
                  </span>
                </div>
              ))}
              {suggestions.length === 0 && (
                <p className="text-sm text-slate-400 text-center py-2">
                  🎉 You've got all the recommended skills!
                </p>
              )}
            </div>
          </SectionCard>

        </div>
      </div>
    </div>
  );
}