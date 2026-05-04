import { useState } from "react";
import CertificateBuilder from "./CertificateBuilderComp";
import LabScreen from "./LabScreen";
import { HTML_LEVELS } from "./data";

// Static display info for the UI path
const LEVEL_META = [
  { id: 1, subtitle: "Learn <!DOCTYPE html>",       icon: "◈", locked: false },
  { id: 2, subtitle: "Master <html>, <body>, <p>",  icon: "◆", locked: false },
  { id: 3, subtitle: "Add <head> and <title>",      icon: "◉", locked: false },
];

const FINAL_LEVEL = {
  id: "final",
  title: "Build Certificate",
  subtitle: "Final Mission — Deploy your skills",
  xp: "1000 XP",
  locked: false,
  done: false,
  icon: "🏅",
  isFinal: true,
};

export default function LevelSelector({ skill, onBack }) {
  const [activeLevel, setActiveLevel]   = useState(null); // number | "final" | null
  const [hoveredId, setHoveredId]       = useState(null);
  const [passedLevels, setPassedLevels] = useState({});   // { [id]: xp }
  const [totalXP, setTotalXP]           = useState(0);

  // Mark level as passed and accumulate XP
  const handlePass = (id, xp) => {
    if (passedLevels[id]) return;
    setPassedLevels((prev) => ({ ...prev, [id]: xp }));
    setTotalXP((prev) => prev + xp);
  };

 // Route: practice lab
if (typeof activeLevel === "number") {
  const levelData = HTML_LEVELS.find((l) => l.id === activeLevel);

  const goNext = () => {
    const nextLevel = HTML_LEVELS.find((l) => l.id === activeLevel + 1);

    if (nextLevel) {
      setActiveLevel(nextLevel.id);
    } else {
      // Last level → go to certificate
      setActiveLevel("final");
    }
  };

  return (
    <LabScreen
      level={levelData}
      onBack={() => setActiveLevel(null)}
      onPass={handlePass}
      onNext={goNext}
    />
  );
}

  // Route: certificate builder
  if (activeLevel === "final") {
    return <CertificateBuilder onBack={() => setActiveLevel(null)} />;
  }

  // Merge static meta with live pass state
  const allPracticeLevels = LEVEL_META.map((meta) => {
    const data = HTML_LEVELS.find((l) => l.id === meta.id);
    return {
      ...meta,
      title: data.title,
      xp: `${data.xp} XP`,
      done: !!passedLevels[meta.id],
    };
  });

  const displayLevels = [...allPracticeLevels, FINAL_LEVEL];

  return (
    <div style={styles.root}>
      {/* Header */}
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={onBack}>← RETREAT</button>
        <div style={styles.titleBlock}>
          <span style={styles.skillTag}>{skill?.name || "HTML"} LAB</span>
          <h2 style={styles.title}>SELECT MISSION</h2>
        </div>
        <div style={styles.xpBlock}>
          <span style={styles.xpLabel}>TOTAL XP</span>
          <span style={styles.xpValue}>{totalXP}</span>
        </div>
      </div>

      {/* Mission path */}
      <div style={styles.pathContainer}>
        <div style={styles.verticalLine} />

        {displayLevels.map((level) => (
          <div key={level.id} style={styles.levelRow}>
            <div style={styles.nodeCol}>
              <div style={styles.node(level.done, level.isFinal, level.locked)}>
                {level.locked ? "🔒" : level.done ? "✓" : level.icon}
              </div>
            </div>

            <div
              style={styles.card(level.locked, level.isFinal, hoveredId === level.id)}
              onMouseEnter={() => !level.locked && setHoveredId(level.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => { if (!level.locked) setActiveLevel(level.id); }}
            >
              <div style={styles.cardLeft}>
                <div style={styles.levelNum}>
                  {level.isFinal ? "FINAL" : `LVL ${level.id}`}
                </div>
                <div style={styles.levelTitle(level.isFinal)}>{level.title}</div>
                <div style={styles.levelSub}>{level.subtitle}</div>
              </div>
              <div style={styles.cardRight}>
                <span style={styles.xpBadge(level.done)}>{level.xp}</span>
                {!level.locked && (
                  <span style={styles.enterBtn(level.isFinal)}>
                    {level.done ? "REPLAY ↺" : "ENTER →"}
                  </span>
                )}
                {level.locked && <span style={styles.lockedTag}>LOCKED</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.footer}>
        Complete all levels to earn your HTML Combat Badge
      </div>
    </div>
  );
}

const ORANGE = "#ff6a00";
const styles = {
  root: {
    minHeight: "100vh",
    background: "#0a0a0a",
    fontFamily: "'Courier New', monospace",
    color: "#ccc",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 28px",
    background: "#0f0f0f",
    borderBottom: `2px solid ${ORANGE}`,
  },
  backBtn: {
    background: "transparent",
    border: "1px solid #333",
    color: "#888",
    padding: "6px 14px",
    cursor: "pointer",
    fontFamily: "'Courier New', monospace",
    fontSize: 11,
    letterSpacing: 1,
  },
  titleBlock: { display: "flex", flexDirection: "column", alignItems: "center" },
  skillTag: {
    fontSize: 9,
    letterSpacing: 4,
    color: ORANGE,
    background: "rgba(255,106,0,0.1)",
    border: `1px solid ${ORANGE}`,
    padding: "2px 10px",
    marginBottom: 4,
  },
  title: { margin: 0, fontSize: 18, color: "#fff", letterSpacing: 3 },
  xpBlock: { display: "flex", flexDirection: "column", alignItems: "flex-end" },
  xpLabel: { fontSize: 9, color: "#555", letterSpacing: 2 },
  xpValue: { fontSize: 22, color: ORANGE, fontWeight: 900 },
  pathContainer: {
    flex: 1,
    padding: "40px 60px",
    position: "relative",
    maxWidth: 700,
    margin: "0 auto",
    width: "100%",
    boxSizing: "border-box",
  },
  verticalLine: {
    position: "absolute",
    left: 88,
    top: 60,
    bottom: 60,
    width: 2,
    background: "linear-gradient(180deg, #ff6a00, #1a1a1a)",
    zIndex: 0,
  },
  levelRow: {
    display: "flex",
    alignItems: "center",
    gap: 20,
    marginBottom: 24,
    position: "relative",
    zIndex: 1,
  },
  nodeCol: {
    width: 48,
    flexShrink: 0,
    display: "flex",
    justifyContent: "center",
  },
  node: (done, isFinal, locked) => ({
    width: isFinal ? 52 : 44,
    height: isFinal ? 52 : 44,
    borderRadius: isFinal ? 0 : "50%",
    transform: isFinal ? "rotate(45deg)" : "none",
    background: locked ? "#111" : done ? ORANGE : isFinal ? "linear-gradient(135deg, #ff6a00, #ee0979)" : "#1a1a1a",
    border: `2px solid ${locked ? "#222" : done ? ORANGE : isFinal ? ORANGE : "#333"}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: isFinal ? 18 : 16,
    color: locked ? "#333" : done ? "#fff" : ORANGE,
    boxShadow: isFinal ? "0 0 20px rgba(255,106,0,0.4)" : done ? "0 0 10px rgba(255,106,0,0.3)" : "none",
  }),
  card: (locked, isFinal, hovered) => ({
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 20px",
    background: locked ? "#0d0d0d" : hovered ? "#161616" : "#111",
    border: `1px solid ${locked ? "#1a1a1a" : isFinal ? ORANGE : hovered ? "#333" : "#1e1e1e"}`,
    cursor: locked ? "not-allowed" : "pointer",
    transition: "all 0.2s",
    opacity: locked ? 0.5 : 1,
    boxShadow: isFinal && !locked ? "0 0 30px rgba(255,106,0,0.15)" : "none",
  }),
  cardLeft: { display: "flex", flexDirection: "column", gap: 3 },
  levelNum: { fontSize: 9, color: "#555", letterSpacing: 3 },
  levelTitle: (isFinal) => ({
    fontSize: isFinal ? 16 : 14,
    color: isFinal ? ORANGE : "#ddd",
    fontWeight: 700,
    letterSpacing: 1,
  }),
  levelSub: { fontSize: 11, color: "#555" },
  cardRight: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 },
  xpBadge: (done) => ({
    fontSize: 11,
    color: done ? ORANGE : "#444",
    letterSpacing: 2,
    fontWeight: 700,
  }),
  enterBtn: (isFinal) => ({
    fontSize: 11,
    color: isFinal ? ORANGE : "#666",
    letterSpacing: 2,
    background: isFinal ? "rgba(255,106,0,0.1)" : "transparent",
    padding: isFinal ? "3px 10px" : 0,
    border: isFinal ? `1px solid ${ORANGE}` : "none",
  }),
  lockedTag: {
    fontSize: 9,
    color: "#333",
    letterSpacing: 2,
    border: "1px solid #222",
    padding: "2px 8px",
  },
  footer: {
    textAlign: "center",
    padding: 24,
    fontSize: 10,
    color: "#333",
    letterSpacing: 2,
    borderTop: "1px solid #111",
  },
};