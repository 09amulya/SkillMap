import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── Noise + Parchment card background (your snippet) ────────────────────────
const cardBgStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E"), 
  linear-gradient(160deg, #f8f3e8 0%, #f0e8d0 45%, #ede4cc 100%)`,
  backgroundBlendMode: "overlay",
};

const pageBgStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"),
  linear-gradient(160deg, #1c1c1e 0%, #2a2a2d 50%, #1e1e22 100%)`,
  backgroundBlendMode: "overlay",
};

// ─── Team Data ────────────────────────────────────────────────────────────────
const TEAM = [
  {
    id: "maria-smith",
    name: "Maria Smith",
    role: "Frontend Developer",
    image: "https://images.pexels.com/photos/3769161/pexels-photo-3769161.jpeg",
    socials: [
      { platform: "github",   href: "#" },
      { platform: "twitter",  href: "#" },
      { platform: "linkedin", href: "#" },
    ],
  },
  {
    id: "darren-randolph",
    name: "Darren Randolph",
    role: "Marketing Expert",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80&fit=crop&crop=faces",
    socials: [
      { platform: "facebook", href: "#" },
      { platform: "twitter",  href: "#" },
      { platform: "linkedin", href: "#" },
    ],
  },
  {
    id: "ayat-black",
    name: "Ayat Black",
    role: "Web Designer",
    image: "https://media.istockphoto.com/id/1416048929/photo/woman-working-on-laptop-online-checking-emails-and-planning-on-the-internet-while-sitting-in.jpg?s=1024x1024&w=is&k=20&c=rsMEfrDiYh3Y2CbJ8OQYRfJZ2kOGBneREKETBn0vyjU=",
    socials: [
      { platform: "dribbble",  href: "#" },
      { platform: "linkedin",  href: "#" },
      { platform: "instagram", href: "#" },
    ],
  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────
const ICONS = {
  github: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  dribbble: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
      <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4.01-.814zm-9.08-2.852c.22-.4 2.8-5.033 8.1-6.713.02-.01.04-.018.062-.026-.22-.49-.45-.98-.68-1.46C8.8 11.775 3.17 11.71 2.63 11.7h-.28c0 .017-.002.033-.002.05 0 2.507.952 4.8 2.497 6.538zm-2.17-8.312c.55.013 5.39.07 10.02-1.727-1.8-3.2-3.74-5.89-4.04-6.306-2.65 1.25-4.7 3.55-5.98 6.033zm7.44-7.7c.313.432 2.302 3.13 4.088 6.427 3.9-1.46 5.55-3.683 5.75-3.957C20.1 4.53 16.256 2.65 12.29 2.687zm5.58 13.32c2.86-.51 5.43.22 5.78.33-.44-2.76-1.97-5.18-4.14-6.78-.2.265-1.99 2.62-6.04 4.28.253.52.5 1.05.73 1.58.048.12.098.24.145.36 1.43-.18 2.88-.18 3.52-.18.003.003.003.003.005.41z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
};

// ─── SocialLink ───────────────────────────────────────────────────────────────
function SocialLink({ platform, href }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      title={platform}
      onClick={(e) => e.stopPropagation()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200"
      style={{
        background: hovered ? "#7ea8c9" : "rgba(0,0,0,0.08)",
        color: hovered ? "#fff" : "#3a3830",
        transform: hovered ? "scale(1.18)" : "scale(1)",
        textDecoration: "none",
      }}
    >
      {ICONS[platform]}
    </a>
  );
}

// ─── WaveDivider ──────────────────────────────────────────────────────────────
function WaveDivider() {
  return (
    <div className="absolute bottom-0 left-0 w-full leading-none pointer-events-none">
      <svg
        viewBox="0 0 300 48"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ width: "100%", height: 48, display: "block" }}
      >
        <path d="M0,32 C75,48 225,16 300,32 L300,48 L0,48 Z" fill="#f0e8d0" />
      </svg>
    </div>
  );
}

// ─── TeamCard ─────────────────────────────────────────────────────────────────
function TeamCard({ member, index }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/team/${member.id}`)}
      className="rounded-2xl overflow-hidden cursor-pointer"
      style={{
        width: 300,
        ...cardBgStyle,
        boxShadow: hovered
          ? "0 32px 80px rgba(0,0,0,0.55), 0 4px 16px rgba(0,0,0,0.25)"
          : "0 20px 60px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.2)",
        transform: hovered ? "translateY(-10px) scale(1.025)" : "translateY(0) scale(1)",
        transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease",
        animation: "fadeUp 0.6s ease both",
        animationDelay: `${index * 0.15}s`,
      }}
    >
      {/* Photo */}
      <div className="relative w-full overflow-hidden" style={{ height: 320 }}>
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover block transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
        />

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
          style={{ background: "rgba(0,0,0,0.32)", opacity: hovered ? 1 : 0 }}
        >
          <span
            className="px-4 py-2 rounded-full text-sm font-semibold"
            style={{
              background: "rgba(255,255,255,0.15)",
              color: "#fff",
              backdropFilter: "blur(6px)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            View Profile →
          </span>
        </div>

        <WaveDivider />
      </div>

      {/* Info */}
      <div className="px-6 py-5 text-center">
        <h3
          className="font-bold text-xl mb-1"
          style={{ fontFamily: "'Playfair Display', serif", color: "#1a1a1e" }}
        >
          {member.name}
        </h3>
        <p
          className="text-sm mb-4"
          style={{
            color: "#6b6860",
            letterSpacing: "0.02em",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {member.role}
        </p>
        <div className="flex items-center justify-center gap-3">
          {member.socials.map((s) => (
            <SocialLink key={s.platform} platform={s.platform} href={s.href} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MeetTheTeam — default export ────────────────────────────────────────────
export default function Consultation() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 py-16"
        style={{ ...pageBgStyle, fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Heading */}
        <h1
          className="text-4xl font-bold mb-14 text-center"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#f0ece2",
            letterSpacing: "-0.5px",
            animation: "fadeUp 0.5s ease both",
          }}
        >
          Meet the{" "}
          <span
            style={{
              color: "#7ea8c9",
              textDecoration: "underline",
              textUnderlineOffset: 5,
            }}
          >
            team
          </span>
        </h1>

        {/* Cards Grid */}
        <div className="flex flex-wrap gap-7 justify-center" style={{ maxWidth: 1100 }}>
          {TEAM.map((member, i) => (
            <TeamCard key={member.id} member={member} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}