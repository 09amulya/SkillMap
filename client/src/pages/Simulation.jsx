import { useState } from "react";

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5efe6",
    fontFamily: "'Segoe UI', sans-serif",
    color: "#1a1a1a",
    padding: "40px 20px",
  },
  heading: {
    textAlign: "center",
    fontSize: "2.2rem",
    fontWeight: "700",
    marginBottom: "10px",
    letterSpacing: "1px",
    color: "#1a1a1a",
    WebkitTextFillColor: "unset",
  },
  subheading: {
    textAlign: "center",
    fontSize: "1rem",
    color: "#6b5e4a",
    marginBottom: "40px",
  },
  cardGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "24px",
    flexWrap: "wrap",
    marginBottom: "40px",
  },
  card: {
    background: "#fffaf3",
    border: "1px solid #e5d7b8",
    borderRadius: "20px",
    padding: "36px 28px",
    width: "220px",
    textAlign: "center",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
  },
  cardIcon: {
    fontSize: "2.5rem",
    marginBottom: "16px",
  },
  cardTitle: {
    fontSize: "1.1rem",
    fontWeight: "600",
    marginBottom: "8px",
    color: "#1a1a1a",
  },
  cardDesc: {
    fontSize: "0.82rem",
    color: "#6b5e4a",
    lineHeight: "1.5",
  },
  panel: {
    maxWidth: "720px",
    margin: "0 auto",
    background: "#fffaf3",
    border: "1px solid #e5d7b8",
    borderRadius: "20px",
    padding: "32px",
  },
  backBtn: {
    background: "#1e2a44",
    border: "1px solid #1e2a44",
    color: "#fff",
    padding: "8px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.85rem",
    marginBottom: "24px",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    transition: "opacity 0.2s",
  },
  panelTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    marginBottom: "6px",
    color: "#1a1a1a",
  },
  panelSub: {
    fontSize: "0.9rem",
    color: "#6b5e4a",
    marginBottom: "28px",
  },
  divider: {
    border: "none",
    borderTop: "1px solid #e5d7b8",
    marginBottom: "28px",
  },
  mentorCard: {
    background: "#fff",
    border: "1px solid #e5d7b8",
    borderRadius: "14px",
    padding: "18px 20px",
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.4rem",
    flexShrink: 0,
  },
  mentorName: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: "2px",
  },
  mentorRole: {
    fontSize: "0.82rem",
    color: "#6b5e4a",
    marginBottom: "6px",
  },
  mentorMeta: {
    fontSize: "0.78rem",
    color: "#b8860b",
  },
  bookBtn: {
    marginTop: "8px",
    padding: "6px 14px",
    background: "#1e2a44",
    border: "1px solid #1e2a44",
    borderRadius: "6px",
    color: "#fff",
    fontSize: "0.8rem",
    cursor: "not-allowed",
    opacity: 0.5,
  },
  label: {
    display: "block",
    fontSize: "0.85rem",
    color: "#6b5e4a",
    marginBottom: "8px",
    fontWeight: "500",
  },
  select: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "10px",
    background: "#fff",
    border: "1px solid #e5d7b8",
    color: "#1a1a1a",
    fontSize: "0.9rem",
    marginBottom: "20px",
    outline: "none",
    cursor: "pointer",
  },
  questionCard: {
    background: "#fff",
    border: "1px solid #e5d7b8",
    borderRadius: "12px",
    padding: "14px 18px",
    marginBottom: "12px",
    fontSize: "0.9rem",
    color: "#1a1a1a",
    lineHeight: "1.6",
  },
  qNum: {
    fontSize: "0.75rem",
    color: "#b8860b",
    fontWeight: "600",
    marginBottom: "4px",
  },
  jobGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  jobBtn: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "18px 22px",
    background: "#fff",
    border: "1px solid #e5d7b8",
    borderRadius: "14px",
    color: "#1a1a1a",
    fontSize: "0.95rem",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "none",
    transition: "border-color 0.2s, transform 0.15s",
  },
  jobIcon: {
    fontSize: "1.6rem",
  },
  jobMeta: {
    fontSize: "0.78rem",
    color: "#6b5e4a",
    fontWeight: "400",
    marginTop: "2px",
  },
  badge: {
    marginLeft: "auto",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "0.72rem",
    fontWeight: "600",
  },
};

const PYQ_DATA = {
  frontend: {
    google: [
      "Implement a debounce function from scratch.",
      "How does the virtual DOM differ from the real DOM? Explain reconciliation.",
      "Design a responsive navbar component with accessibility in mind.",
    ],
    amazon: [
      "Build a lazy-loading image component in React.",
      "Explain the event loop and how async/await works under the hood.",
      "How would you optimize a page with 10,000 list items?",
    ],
  },
  backend: {
    google: [
      "Design a URL shortener service — system design walkthrough.",
      "Explain CAP theorem with a real-world example.",
      "How do you handle database transactions with rollback logic?",
    ],
    amazon: [
      "How would you scale a REST API to handle 1M requests/sec?",
      "Explain the difference between SQL and NoSQL — when to use each.",
      "Design a distributed rate-limiter system.",
    ],
  },
  devops: {
    google: [
      "Walk us through a CI/CD pipeline you've built.",
      "How do you manage secrets and config in Kubernetes?",
      "Explain the difference between blue-green and canary deployments.",
    ],
    amazon: [
      "How do you monitor and alert on microservices in production?",
      "Describe your experience with Infrastructure as Code (Terraform, etc).",
      "How would you debug a production outage caused by a bad deploy?",
    ],
  },
};

const MENTORS = [
  {
    name: "Priya Sharma",
    role: "Senior SDE @ Google",
    exp: "6 yrs exp · 120+ mock sessions",
    emoji: "👩‍💻",
    bg: "linear-gradient(135deg, #667eea, #764ba2)",
    rating: "⭐ 4.9",
  },
  {
    name: "Arjun Mehta",
    role: "Staff Engineer @ Amazon",
    exp: "9 yrs exp · 200+ mock sessions",
    emoji: "👨‍💻",
    bg: "linear-gradient(135deg, #f093fb, #f5576c)",
    rating: "⭐ 4.8",
  },
  {
    name: "Sneha Iyer",
    role: "ML Engineer @ Microsoft",
    exp: "5 yrs exp · 80+ mock sessions",
    emoji: "👩‍🔬",
    bg: "linear-gradient(135deg, #4facfe, #00f2fe)",
    rating: "⭐ 4.7",
  },
];

const JOB_LINKS = [
  {
    label: "Frontend Jobs",
    icon: "🖥️",
    color: "#b8860b",
    badgeBg: "rgba(184,134,11,0.1)",
    meta: "React · Vue · Angular · CSS",
    url: "https://unstop.com/jobs?domain=frontend",
  },
  {
    label: "Backend Jobs",
    icon: "⚙️",
    color: "#b8860b",
    badgeBg: "rgba(184,134,11,0.1)",
    meta: "Node · Django · Spring · Go",
    url: "https://unstop.com/jobs?domain=backend",
  },
  {
    label: "Data Science Jobs",
    icon: "📊",
    color: "#b8860b",
    badgeBg: "rgba(184,134,11,0.1)",
    meta: "Python · ML · AI · Analytics",
    url: "https://unstop.com/jobs?domain=data-science",
  },
];

export default function Simulation() {
  const [activeTab, setActiveTab] = useState(null);
  const [pyqRole, setPyqRole] = useState("frontend");
  const [pyqCompany, setPyqCompany] = useState("google");

  const questions = PYQ_DATA[pyqRole]?.[pyqCompany] || [];

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Simulation Hub</h1>
      <p style={styles.subheading}>
        Prepare smarter — practice interviews, revisit PYQs, and explore job
        opportunities.
      </p>

      {/* ── 3 main cards ── */}
      {!activeTab && (
        <div style={styles.cardGrid}>
          <div
            style={styles.card}
            onClick={() => setActiveTab("mock")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow =
                "0 12px 40px rgba(167,139,250,0.2)";
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            }}
          >
            <div style={styles.cardIcon}>🎤</div>
            <div style={styles.cardTitle}>Mock Interview</div>
            <div style={styles.cardDesc}>
              Practice with experienced mentors and get real feedback.
            </div>
          </div>

          <div
            style={styles.card}
            onClick={() => setActiveTab("pyq")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow =
                "0 12px 40px rgba(96,165,250,0.2)";
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            }}
          >
            <div style={styles.cardIcon}>📝</div>
            <div style={styles.cardTitle}>PYQs</div>
            <div style={styles.cardDesc}>
              Browse company-wise previous year questions by role.
            </div>
          </div>

          <div
            style={styles.card}
            onClick={() => setActiveTab("jobs")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow =
                "0 12px 40px rgba(52,211,153,0.2)";
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            }}
          >
            <div style={styles.cardIcon}>💼</div>
            <div style={styles.cardTitle}>Job Insights</div>
            <div style={styles.cardDesc}>
              Explore curated openings across tech domains on Unstop.
            </div>
          </div>
        </div>
      )}

      {/* ── MOCK INTERVIEW PANEL ── */}
      {activeTab === "mock" && (
        <div style={styles.panel}>
          <button style={styles.backBtn} onClick={() => setActiveTab(null)}>
            ← Back
          </button>
          <div style={styles.panelTitle}>🎤 Mock Interview</div>
          <div style={styles.panelSub}>
            Choose a mentor and book a 1:1 practice session.
          </div>
          <hr style={styles.divider} />

          {MENTORS.map((m) => (
            <div key={m.name} style={styles.mentorCard}>
              <div style={{ ...styles.avatar, background: m.bg }}>
                {m.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div style={styles.mentorName}>{m.name}</div>
                <div style={styles.mentorRole}>{m.role}</div>
                <div style={styles.mentorMeta}>
                  {m.rating} &nbsp;·&nbsp; {m.exp}
                </div>
              </div>
              <button style={styles.bookBtn} disabled>
                Book Slot
              </button>
            </div>
          ))}

          <p
            style={{
              fontSize: "0.78rem",
              color: "#475569",
              textAlign: "center",
              marginTop: "8px",
            }}
          >
            Booking coming soon — stay tuned!
          </p>
        </div>
      )}

      {/* ── PYQs PANEL ── */}
      {activeTab === "pyq" && (
        <div style={styles.panel}>
          <button style={styles.backBtn} onClick={() => setActiveTab(null)}>
            ← Back
          </button>
          <div style={styles.panelTitle}>📝 Previous Year Questions</div>
          <div style={styles.panelSub}>
            Filter by role and company to get targeted questions.
          </div>
          <hr style={styles.divider} />

          <label style={styles.label}>Select Role</label>
          <select
            style={styles.select}
            value={pyqRole}
            onChange={(e) => setPyqRole(e.target.value)}
          >
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="devops">DevOps</option>
          </select>

          <label style={styles.label}>Select Company</label>
          <select
            style={styles.select}
            value={pyqCompany}
            onChange={(e) => setPyqCompany(e.target.value)}
          >
            <option value="google">Google</option>
            <option value="amazon">Amazon</option>
          </select>

          <div>
            {questions.map((q, i) => (
              <div key={i} style={styles.questionCard}>
                <div style={styles.qNum}>Q{i + 1}</div>
                {q}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── JOB INSIGHTS PANEL ── */}
      {activeTab === "jobs" && (
        <div style={styles.panel}>
          <button style={styles.backBtn} onClick={() => setActiveTab(null)}>
            ← Back
          </button>
          <div style={styles.panelTitle}>💼 Job Insights</div>
          <div style={styles.panelSub}>
            Explore active openings on Unstop across different domains.
          </div>
          <hr style={styles.divider} />

          <div style={styles.jobGrid}>
            {JOB_LINKS.map((job) => (
              <a
                key={job.label}
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.jobBtn}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.09)";
                  e.currentTarget.style.transform = "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                <span style={styles.jobIcon}>{job.icon}</span>
                <span>
                  <div>{job.label}</div>
                  <div style={styles.jobMeta}>{job.meta}</div>
                </span>
                <span
                  style={{
                    ...styles.badge,
                    background: job.badgeBg,
                    color: job.color,
                    border: `1px solid ${job.color}33`,
                  }}
                >
                  Explore →
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
