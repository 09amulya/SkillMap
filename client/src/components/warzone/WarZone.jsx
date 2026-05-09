import { useState } from "react";
import LevelSelector from "./LevelSelector";
import CSSLab from "./CSSLab";
import JavaScriptLab from "./JavaScriptLab";
import ProjectLab from "./ProjectLab";

const LABS = [
  {
    id: "html",
    name: "HTML",
    tagline: "Structure the web",
    description: "Master tags, attributes, and document structure",
    icon: "< />",
    color: "#ff6a00",
    levels: 3,
    xpMax: 1750,
  },
  {
    id: "css",
    name: "CSS",
    tagline: "Style the web",
    description: "Selectors, flexbox, grid, animations",
    icon: "◉",
    color: "#00c9ff",
    levels: 3,
    xpMax: 2500,
  },
  {
    id: "js",
    name: "JavaScript",
    tagline: "Power the web",
    description: "Variables, functions, DOM manipulation",
    icon: "{ }",
    color: "#f7df1e",
    levels: 3,
    xpMax: 4000,
  },
  {
    id: "project",
    name: "Projects",
    tagline: "Build real apps",
    description: "Landing page & portfolio projects",
    icon: "🏗️",
    color: "#8b5cf6",
    levels: 2,
    xpMax: 6000,
  },
];

export default function WarZone({ onBack }) {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [glitching, setGlitching] = useState(false);

  const handleEnterLab = (lab) => {
    setGlitching(true);
    setTimeout(() => {
      setGlitching(false);
      setSelectedSkill(lab);
    }, 250);
  };

  // 🔥 ROUTING (FINAL FIXED)
  if (selectedSkill) {
    const id = selectedSkill.id;

    if (id === "html") {
      return (
        <LevelSelector
          skill={selectedSkill}
          onBack={() => setSelectedSkill(null)}
        />
      );
    }

    if (id === "css") {
      return (
        <Wrapper onBack={() => setSelectedSkill(null)}>
          <CSSLab />
        </Wrapper>
      );
    }

    if (id === "js") {
      return (
        <Wrapper onBack={() => setSelectedSkill(null)}>
          <JavaScriptLab />
        </Wrapper>
      );
    }

    if (id === "project") {
      return (
        <Wrapper onBack={() => setSelectedSkill(null)}>
          <ProjectLab />
        </Wrapper>
      );
    }
  }

  return (
    <div style={styles.root}>
      <div style={styles.gridBg} />
      {glitching && <div style={styles.glitchOverlay} />}

      {/* HEADER */}
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={onBack}>
          ← EXIT ZONE
        </button>

        <div style={styles.titleBlock}>
          <div style={styles.warLabel}>⚔ WAR ZONE ⚔</div>
          <div style={styles.subtitle}>SELECT YOUR LAB</div>
        </div>

        <div style={styles.live}>● LIVE</div>
      </div>

      {/* STATS */}
      <div style={styles.statsBar}>
        {[
          ["ACTIVE LABS", "4"],
          ["LOCKED LABS", "0"],
          ["YOUR XP", "350"],
          ["RANK", "RECRUIT"],
        ].map(([label, value]) => (
          <div key={label} style={styles.stat}>
            <span style={styles.statLabel}>{label}</span>
            <span style={styles.statValue}>{value}</span>
          </div>
        ))}
      </div>

      {/* LAB GRID */}
      <div style={styles.labGrid}>
        {LABS.map((lab) => (
          <div
            key={lab.id}
            style={{
              ...styles.card,
              borderColor: hoveredId === lab.id ? lab.color : "#222",
              boxShadow:
                hoveredId === lab.id
                  ? `0 0 20px ${lab.color}55`
                  : "none",
              transform:
                hoveredId === lab.id ? "translateY(-5px)" : "none",
            }}
            onMouseEnter={() => setHoveredId(lab.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => handleEnterLab(lab)}
          >
            <div style={{ ...styles.icon, color: lab.color }}>
              {lab.icon}
            </div>

            <div style={styles.badge}>ACTIVE</div>

            <div style={styles.name}>{lab.name}</div>
            <div style={styles.tagline}>{lab.tagline}</div>
            <div style={styles.desc}>{lab.description}</div>

            <div style={styles.meta}>
              {lab.levels} LEVELS • {lab.xpMax} XP
            </div>

            <button
              style={{
                ...styles.enterBtn,
                borderColor: lab.color,
                color: lab.color,
              }}
              onClick={(e) => {
                e.stopPropagation(); // 🔥 prevents double click bug
                handleEnterLab(lab);
              }}
            >
              ENTER LAB →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// 🔥 WRAPPER (for back navigation)
function Wrapper({ children, onBack }) {
  return (
    <div style={{ padding: 20, background: "#070707", minHeight: "100vh" }}>
      <button style={styles.backBtn} onClick={onBack}>
        ← Back
      </button>
      {children}
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    background: "#070707",
    color: "#ccc",
    fontFamily: "monospace",
  },

  gridBg: {
    position: "fixed",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(255,106,0,0.03) 1px, transparent 1px)",
    backgroundSize: "40px 40px",
    pointerEvents: "none",
    zIndex: 0,
  },

  glitchOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(255,106,0,0.08)",
    pointerEvents: "none", // 🔥 important fix
    zIndex: 1,
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "16px 32px",
    borderBottom: "1px solid #111",
    zIndex: 2,
    position: "relative",
  },

  backBtn: {
    background: "transparent",
    border: "1px solid #333",
    color: "#aaa",
    padding: "6px 12px",
    cursor: "pointer",
  },

  titleBlock: { textAlign: "center" },
  warLabel: { fontSize: 20, color: "#ff6a00" },
  subtitle: { fontSize: 10, color: "#555" },
  live: { color: "#39ff85", fontSize: 12 },

  statsBar: {
    display: "flex",
    justifyContent: "center",
    gap: 40,
    padding: 10,
    borderBottom: "1px solid #111",
  },

  stat: { textAlign: "center" },
  statLabel: { fontSize: 10, color: "#666" },
  statValue: { fontSize: 16, color: "#ff6a00" },

  labGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: 20,
    padding: 40,
  },

  card: {
    background: "#0d0d0d",
    border: "1px solid #222",
    padding: 20,
    cursor: "pointer",
    transition: "0.2s ease",
  },

  icon: { fontSize: 26 },

  badge: {
    fontSize: 10,
    color: "#39ff85",
    marginTop: 5,
  },

  name: { fontSize: 18, fontWeight: "bold" },
  tagline: { fontSize: 12, color: "#ff6a00" },
  desc: { fontSize: 12, color: "#777" },
  meta: { fontSize: 10, color: "#555", marginTop: 5 },

  enterBtn: {
    marginTop: 10,
    padding: 8,
    background: "transparent",
    border: "1px solid",
    cursor: "pointer",
  },
};