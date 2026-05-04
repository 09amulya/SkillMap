import { useState } from "react";
import LevelSelector from "./LevelSelector";

const LABS = [
  {
    id: "html",
    name: "HTML",
    tagline: "Structure the web",
    description: "Master tags, attributes, and document structure",
    icon: "⟨/⟩",
    color: "#ff6a00",
    levels: 3,
    xpMax: 1750,
    status: "ACTIVE",
    locked: false,
  },
  {
    id: "css",
    name: "CSS",
    tagline: "Style the web",
    description: "Selectors, flexbox, grid, animations",
    icon: "◉",
    color: "#00c9ff",
    levels: 5,
    xpMax: 2500,
    status: "LOCKED",
    locked: true,
  },
  {
    id: "js",
    name: "JavaScript",
    tagline: "Power the web",
    description: "Variables, functions, DOM manipulation",
    icon: "{ }",
    color: "#f7df1e",
    levels: 6,
    xpMax: 4000,
    status: "LOCKED",
    locked: true,
  },
  {
    id: "react",
    name: "React",
    tagline: "Engineer the web",
    description: "Components, hooks, state management",
    icon: "⚛",
    color: "#61dafb",
    levels: 8,
    xpMax: 6000,
    status: "LOCKED",
    locked: true,
  },
];

export default function WarZone({ onBack }) {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [glitching, setGlitching] = useState(false);

  const handleEnterLab = (lab) => {
    if (lab.locked) return;
    setGlitching(true);
    setTimeout(() => {
      setGlitching(false);
      setSelectedSkill(lab);
    }, 600);
  };

  if (selectedSkill) {
    return <LevelSelector skill={selectedSkill} onBack={() => setSelectedSkill(null)} />;
  }

  return (
    <div style={styles.root}>
      {/* Animated grid background */}
      <div style={styles.gridBg} />

      {/* Glitch overlay */}
      {glitching && <div style={styles.glitchOverlay} />}

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <button style={styles.backBtn} onClick={onBack}>← EXIT ZONE</button>
        </div>
        <div style={styles.titleBlock}>
          <div style={styles.warLabel}>⚔ WAR ZONE ⚔</div>
          <div style={styles.subtitle}>SELECT YOUR COMBAT LAB</div>
        </div>
        <div style={styles.headerRight}>
          <div style={styles.liveIndicator}>
            <span style={styles.livePulse} />
            LIVE
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={styles.statsBar}>
        {[
          ["ACTIVE LABS", "1"],
          ["LOCKED LABS", "3"],
          ["YOUR XP", "350"],
          ["RANK", "RECRUIT"],
        ].map(([label, value]) => (
          <div key={label} style={styles.stat}>
            <span style={styles.statLabel}>{label}</span>
            <span style={styles.statValue}>{value}</span>
          </div>
        ))}
      </div>

      {/* Lab grid */}
      <div style={styles.labGrid}>
        {LABS.map((lab) => (
          <div
            key={lab.id}
            style={styles.labCard(lab.locked, hoveredId === lab.id, lab.color)}
            onMouseEnter={() => !lab.locked && setHoveredId(lab.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => handleEnterLab(lab)}
          >
            {lab.locked && <div style={styles.lockOverlay}>🔒</div>}

            <div style={styles.cardGlow(lab.color, !lab.locked && hoveredId === lab.id)} />

            <div style={styles.labIcon(lab.color, lab.locked)}>{lab.icon}</div>

            <div style={styles.statusPill(lab.locked)}>
              {lab.status}
            </div>

            <div style={styles.labName(lab.color, lab.locked)}>{lab.name}</div>
            <div style={styles.labTagline}>{lab.tagline}</div>
            <div style={styles.labDesc}>{lab.description}</div>

            <div style={styles.labMeta}>
              <span style={styles.metaItem}>{lab.levels} LEVELS</span>
              <span style={styles.metaItem}>{lab.xpMax} XP</span>
            </div>

            {!lab.locked && (
              <button style={styles.enterBtn(lab.color)}>
                ENTER LAB →
              </button>
            )}
          </div>
        ))}
      </div>

      <div style={styles.footer}>
        Complete HTML Lab to unlock CSS Combat Zone
      </div>
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    background: "#070707",
    fontFamily: "'Courier New', monospace",
    color: "#ccc",
    position: "relative",
    overflow: "hidden",
  },
  gridBg: {
    position: "fixed",
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(255,106,0,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,106,0,0.03) 1px, transparent 1px)
    `,
    backgroundSize: "40px 40px",
    pointerEvents: "none",
    zIndex: 0,
  },
  glitchOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(255,106,0,0.08)",
    zIndex: 999,
    animation: "flicker 0.1s steps(1) infinite",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 32px",
    background: "rgba(10,10,10,0.95)",
    borderBottom: "2px solid #ff6a00",
    position: "relative",
    zIndex: 2,
  },
  headerLeft: {},
  backBtn: {
    background: "transparent",
    border: "1px solid #333",
    color: "#888",
    padding: "7px 16px",
    cursor: "pointer",
    fontFamily: "'Courier New', monospace",
    fontSize: 11,
    letterSpacing: 1,
    transition: "all 0.2s",
  },
  titleBlock: { textAlign: "center" },
  warLabel: {
    fontSize: 22,
    fontWeight: 900,
    color: "#ff6a00",
    letterSpacing: 6,
    textShadow: "0 0 20px rgba(255,106,0,0.5)",
  },
  subtitle: { fontSize: 9, color: "#555", letterSpacing: 4, marginTop: 2 },
  headerRight: {},
  liveIndicator: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 10,
    color: "#39ff85",
    letterSpacing: 2,
  },
  livePulse: {
    display: "inline-block",
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#39ff85",
    boxShadow: "0 0 8px #39ff85",
  },
  statsBar: {
    display: "flex",
    justifyContent: "center",
    gap: 40,
    padding: "12px 32px",
    background: "#0a0a0a",
    borderBottom: "1px solid #141414",
    position: "relative",
    zIndex: 2,
  },
  stat: { display: "flex", flexDirection: "column", alignItems: "center", gap: 1 },
  statLabel: { fontSize: 8, color: "#444", letterSpacing: 2 },
  statValue: { fontSize: 16, color: "#ff6a00", fontWeight: 900 },
  labGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 20,
    padding: "40px 40px",
    maxWidth: 1200,
    margin: "0 auto",
    position: "relative",
    zIndex: 2,
  },
  labCard: (locked, hovered, color) => ({
    position: "relative",
    background: "#0d0d0d",
    border: `1px solid ${hovered ? color : locked ? "#161616" : "#1e1e1e"}`,
    padding: "28px 24px",
    cursor: locked ? "not-allowed" : "pointer",
    transition: "all 0.25s",
    opacity: locked ? 0.45 : 1,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    transform: hovered ? "translateY(-3px)" : "none",
    boxShadow: hovered ? `0 12px 40px ${color}22` : "none",
  }),
  lockOverlay: {
    position: "absolute",
    top: 12,
    right: 12,
    fontSize: 16,
    zIndex: 2,
  },
  cardGlow: (color, active) => ({
    position: "absolute",
    top: -40,
    right: -40,
    width: 120,
    height: 120,
    borderRadius: "50%",
    background: active ? `${color}22` : "transparent",
    transition: "all 0.3s",
    pointerEvents: "none",
  }),
  labIcon: (color, locked) => ({
    fontSize: 28,
    color: locked ? "#333" : color,
    fontWeight: 900,
    fontFamily: "monospace",
    textShadow: !locked ? `0 0 15px ${color}66` : "none",
  }),
  statusPill: (locked) => ({
    display: "inline-block",
    fontSize: 9,
    letterSpacing: 2,
    padding: "3px 10px",
    color: locked ? "#333" : "#39ff85",
    border: `1px solid ${locked ? "#222" : "#39ff85"}`,
    background: locked ? "transparent" : "rgba(57,255,133,0.07)",
    width: "fit-content",
  }),
  labName: (color, locked) => ({
    fontSize: 20,
    fontWeight: 900,
    color: locked ? "#333" : "#fff",
    letterSpacing: 3,
    marginTop: 4,
  }),
  labTagline: { fontSize: 11, color: "#ff6a00", letterSpacing: 1 },
  labDesc: { fontSize: 11, color: "#555", marginTop: 4, lineHeight: 1.6 },
  labMeta: {
    display: "flex",
    gap: 16,
    marginTop: 8,
    paddingTop: 12,
    borderTop: "1px solid #1a1a1a",
  },
  metaItem: { fontSize: 9, color: "#444", letterSpacing: 2 },
  enterBtn: (color) => ({
    marginTop: 8,
    padding: "9px 0",
    background: "transparent",
    border: `1px solid ${color}`,
    color: color,
    fontFamily: "'Courier New', monospace",
    fontSize: 11,
    letterSpacing: 3,
    cursor: "pointer",
    fontWeight: 700,
    width: "100%",
    transition: "all 0.2s",
  }),
  footer: {
    textAlign: "center",
    padding: "24px",
    fontSize: 10,
    color: "#2a2a2a",
    letterSpacing: 2,
    borderTop: "1px solid #111",
    position: "relative",
    zIndex: 2,
  },
};
