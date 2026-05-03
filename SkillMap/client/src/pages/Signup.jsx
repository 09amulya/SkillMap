import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [focused, setFocused] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    domain: "",
    targetRole: "",
    experienceLevel: "",
    knownSkills: "",
    learningGoals: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        knownSkills: form.knownSkills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        learningGoals: form.learningGoals
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      }),
    });

    const data = await response.json();
    console.log("Response:", data);

    if (response.ok) {
      alert("Signup successful ✅");
      navigate("/onboarding");
    } else {
      alert(data.message || "Signup failed ❌");
    }
  } catch (error) {
    console.error(error);
    alert("Server error ❌");
  }
};

  const inputBase =
    "w-full px-4 py-3 text-sm outline-none transition-all duration-200 rounded-lg border placeholder-[#4a5568]";

  const inputStyle = (name) => ({
    background: "#252b3b",
    color: "#f0e8df",
    borderColor: focused === name ? "#c9a84c" : "#2e3650",
    fontFamily: "Georgia, serif",
  });

  const labelStyle = {
    display: "block",
    fontSize: "12px",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "#c9a84c",
    marginBottom: "6px",
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E"), 
        linear-gradient(160deg, #f8f3e8 0%, #f0e8d0 45%, #ede4cc 100%)`,
        backgroundBlendMode: "overlay",
      }}
    >
      {/* Ambient glow blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-125 h-125 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(139,26,26,0.10) 0%, transparent 70%)" }}
        />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Page heading */}
        <div className="text-center mb-8">
          <p
            className="text-[10px] tracking-[0.35em] uppercase mb-3"
            style={{ color: "#8b1a1a", fontFamily: "Georgia, serif" }}
          >
            ✦ &nbsp;Step 1 of 4 &nbsp;✦
          </p>
          <h1
            className="text-4xl sm:text-5xl font-bold leading-tight"
            style={{ color: "#1a1f2e", fontFamily: "Georgia, serif" }}
          >
            Create your account.
          </h1>
          <p className="mt-3 text-sm" style={{ color: "#7a6a4f" }}>
            Map your skills. Know where you really stand.
          </p>
        </div>

        {/* Dark card — matches your nav + cards */}
        <div
          className="rounded-2xl p-8 sm:p-10 shadow-2xl"
          style={{ background: "#1a2540" }}
        >
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* Name */}
              <div>
                <label style={labelStyle}>Full Name</label>
                <input
                  name="name" type="text" placeholder="Your full name"
                  value={form.name} onChange={handleChange}
                  onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                  className={inputBase} style={inputStyle("name")} required
                />
              </div>

              {/* Email */}
              <div>
                <label style={labelStyle}>Email Address</label>
                <input
                  name="email" type="email" placeholder="you@email.com"
                  value={form.email} onChange={handleChange}
                  onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                  className={inputBase} style={inputStyle("email")} required
                />
              </div>

              {/* Password — full width */}
              <div className="sm:col-span-2">
                <label style={labelStyle}>Password</label>
                <input
                  name="password" type="password" placeholder="Min. 8 characters"
                  value={form.password} onChange={handleChange}
                  onFocus={() => setFocused("password")} onBlur={() => setFocused(null)}
                  className={inputBase} style={inputStyle("password")} required
                />
              </div>

              {/* Domain */}
              <div>
                <label style={labelStyle}>Domain</label>
                <select
                  name="domain" value={form.domain} onChange={handleChange}
                  onFocus={() => setFocused("domain")} onBlur={() => setFocused(null)}
                  className={inputBase}
                  style={{ ...inputStyle("domain"), color: form.domain ? "#f0e8df" : "#4a5568", cursor: "pointer" }}
                  required
                >
                  <option value="" disabled>Select domain</option>
                  <option value="tech">Tech</option>
                  <option value="non-tech">Non-Tech</option>
                  <option value="arts">Arts</option>
                </select>
              </div>

              {/* Experience Level */}
              <div>
                <label style={labelStyle}>Experience Level</label>
                <select
                  name="experienceLevel" value={form.experienceLevel} onChange={handleChange}
                  onFocus={() => setFocused("experienceLevel")} onBlur={() => setFocused(null)}
                  className={inputBase}
                  style={{ ...inputStyle("experienceLevel"), color: form.experienceLevel ? "#f0e8df" : "#4a5568", cursor: "pointer" }}
                  required
                >
                  <option value="" disabled>Select level</option>
                  <option value="student">Student</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                </select>
              </div>

              {/* Target Role — full width */}
              <div className="sm:col-span-2">
                <label style={labelStyle}>Target Role</label>
                <input
                  name="targetRole" type="text" placeholder="e.g. Frontend Developer, UX Designer"
                  value={form.targetRole} onChange={handleChange}
                  onFocus={() => setFocused("targetRole")} onBlur={() => setFocused(null)}
                  className={inputBase} style={inputStyle("targetRole")} required
                />
              </div>

              {/* Known Skills — full width */}
              <div className="sm:col-span-2">
                <label style={labelStyle}>Known Skills</label>
                <input
                  name="knownSkills" type="text" placeholder="e.g. React, Figma, Python  (comma-separated)"
                  value={form.knownSkills} onChange={handleChange}
                  onFocus={() => setFocused("knownSkills")} onBlur={() => setFocused(null)}
                  className={inputBase} style={inputStyle("knownSkills")}
                />
              </div>

             
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px" style={{ background: "#2e3650" }} />
              <span className="text-[10px]" style={{ color: "#3a4460", letterSpacing: "0.3em" }}>✦✦✦</span>
              <div className="flex-1 h-px" style={{ background: "#2e3650" }} />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-4 text-sm font-semibold tracking-[0.2em] uppercase rounded-lg transition-all duration-200"
              style={{ background: "#8b1a1a", color: "#f0e8df", fontFamily: "Georgia, serif" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#6b1212")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#8b1a1a")}
            >
              Create Account →
            </button>

            {/* Switch */}
            <p className="text-center text-sm mt-6" style={{ color: "#7a8099" }}>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="underline underline-offset-4 transition-colors duration-150"
                style={{ color: "#c9a84c" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#f0e8df")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#c9a84c")}
              >
                Login
              </button>
            </p>
          </form>
        </div>

        
      </div>
    </div>
  );
}