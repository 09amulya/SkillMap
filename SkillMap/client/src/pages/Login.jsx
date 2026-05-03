import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [focused, setFocused] = useState(null);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: form.email,
        password: form.password
      })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Login successful ✅");
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/onboarding"); // or dashboard
    } else {
      alert(data.message); // shows "Invalid password ❌"
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
      {/* Ambient glow blobs — same as Signup for visual continuity */}
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

      <div className="w-full max-w-md relative z-10">
        {/* Page heading */}
        <div className="text-center mb-8">
          <p
            className="text-[10px] tracking-[0.35em] uppercase mb-3"
            style={{ color: "#8b1a1a", fontFamily: "Georgia, serif" }}
          >
            ✦ &nbsp;Welcome Back &nbsp;✦
          </p>
          <h1
            className="text-4xl sm:text-5xl font-bold leading-tight"
            style={{ color: "#1a1f2e", fontFamily: "Georgia, serif" }}
          >
            Sign back in.
          </h1>
          <p className="mt-3 text-sm" style={{ color: "#7a6a4f" }}>
            Continue your path to self-mastery.
          </p>
        </div>

        {/* Dark card — identical to Signup card */}
        <div
          className="rounded-2xl p-8 sm:p-10 shadow-2xl"
          style={{ background: "#1a2540" }}
        >
          {/* Small brand mark inside card */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="h-px flex-1" style={{ background: "#2e3650" }} />
            <span
              className="text-xs tracking-widest px-3 text-white"
              style={{ color: "white", fontFamily: "Georgia, serif" }}
            >
              SKILLMAP
            </span>
            <div className="h-px flex-1" style={{ background: "#2e3650" }} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label style={{ ...labelStyle, marginBottom: 0 }}>Password</label>
                <button
                  type="button"
                  className="text-[12px] tracking-wider transition-colors duration-150"
                  style={{ color: "#c9a84c" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#f0e8df")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#c9a84c")}
                >
                  Forgot password?
                </button>
              </div>
              <input
                name="password" type="password" placeholder="Your password"
                value={form.password} onChange={handleChange}
                onFocus={() => setFocused("password")} onBlur={() => setFocused(null)}
                className={inputBase} style={inputStyle("password")} required
              />
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 py-2">
              <div className="flex-1 h-px" style={{ background: "#2e3650" }} />
              <span className="text-[10px]" style={{ color: "#3a4460", letterSpacing: "0.3em" }}>✦✦✦</span>
              <div className="flex-1 h-px" style={{ background: "#2e3650" }} />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 text-sm font-semibold tracking-[0.2em] uppercase rounded-lg transition-all duration-200"
              style={{ background: "#8b1a1a", color: "#f0e8df", fontFamily: "Georgia, serif" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#6b1212")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#8b1a1a")}
             
            >
              Sign In →
            </button>

            {/* Switch */}
            <p className="text-center text-sm" style={{ color: "#7a8099" }}>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="underline underline-offset-4 transition-colors duration-150"
                style={{ color: "#c9a84c" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#f0e8df")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#c9a84c")}
              >
                Sign up
              </button>
            </p>
          </form>
        </div>

        
      </div>
    </div>
  );
}
