import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// 🔹 Questions (5–6 max, each maps to role scores)
const QUESTIONS = [
  {
    id: 1,
    text: "What type of work excites you the most?",
    options: [
      { label: "Designing interfaces (UI)", scores: { frontend: 2 } },
      { label: "Solving logic problems", scores: { backend: 2 } },
      { label: "Working with data", scores: { data: 2 } },
      { label: "Building systems end-to-end", scores: { backend: 1, frontend: 1 } },
    ],
  },
  {
    id: 2,
    text: "Which environment do you prefer?",
    options: [
      { label: "Visual & interactive", scores: { frontend: 2 } },
      { label: "Server-side logic", scores: { backend: 2 } },
      { label: "Numbers & analysis", scores: { data: 2 } },
      { label: "Mix of everything", scores: { backend: 1, frontend: 1 } },
    ],
  },
  {
    id: 3,
    text: "What are you more comfortable with?",
    options: [
      { label: "Styling, layouts, UI polish", scores: { frontend: 2 } },
      { label: "APIs, databases, logic", scores: { backend: 2 } },
      { label: "Statistics, trends, insights", scores: { data: 2 } },
      { label: "Still exploring", scores: { frontend: 1, backend: 1, data: 1 } },
    ],
  },
  {
    id: 4,
    text: "What have you tried before?",
    options: [
      { label: "HTML/CSS/JS or UI work", scores: { frontend: 2 } },
      { label: "DSA / backend / APIs", scores: { backend: 2 } },
      { label: "Excel / analytics / ML basics", scores: { data: 2 } },
      { label: "Nothing yet", scores: { frontend: 1, backend: 1, data: 1 } },
    ],
  },
  {
    id: 5,
    text: "What matters most to you right now?",
    options: [
      { label: "Creativity & visuals", scores: { frontend: 2 } },
      { label: "Problem solving & systems", scores: { backend: 2 } },
      { label: "Insights & impact from data", scores: { data: 2 } },
      { label: "Flexibility", scores: { frontend: 1, backend: 1 } },
    ],
  },
];

const ROLE_INFO = {
  frontend: {
    title: "Frontend Developer",
    why: [
      "You lean towards visual and interactive work",
      "You enjoy building UI and user experiences",
      "You prefer creative implementation over heavy math",
    ],
    next: "Start with HTML, CSS, JavaScript → React",
    alternatives: ["UI/UX Designer", "Product Designer"],
  },
  backend: {
    title: "Backend Developer",
    why: [
      "You enjoy logic, systems, and problem solving",
      "You prefer APIs, databases, and server-side work",
      "You’re comfortable with structured thinking",
    ],
    next: "Start with Node.js / Java / Python → APIs & Databases",
    alternatives: ["Full Stack Developer", "DevOps"],
  },
  data: {
    title: "Data Analyst / Data Scientist",
    why: [
      "You enjoy working with data and insights",
      "You prefer analytical thinking",
      "You are comfortable with trends and numbers",
    ],
    next: "Start with Python → Pandas → Visualization",
    alternatives: ["Business Analyst", "ML Engineer"],
  },
};

export default function Counselling() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  const handleSelect = (option) => {
    const updated = [...answers];
    updated[step] = option.scores;
    setAnswers(updated);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    }
  };

  const calculateResult = () => {
    const score = { frontend: 0, backend: 0, data: 0 };

    answers.forEach((ans) => {
      Object.entries(ans).forEach(([key, val]) => {
        score[key] += val;
      });
    });

    const best = Object.keys(score).reduce((a, b) =>
      score[a] > score[b] ? a : b
    );

    return ROLE_INFO[best];
  };

  const progress = Math.round(((step + 1) / QUESTIONS.length) * 100);

  const isComplete = answers.length === QUESTIONS.length;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">

      {/* HEADER */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Career Discovery</h1>
        <p className="text-gray-500 text-sm mt-1">
          A short guided session to help you find your path
        </p>
      </div>

      {/* PROGRESS */}
      {!isComplete && (
        <div className="mb-6">
          <div className="text-xs text-gray-500 mb-1">
            Question {step + 1} / {QUESTIONS.length}
          </div>
          <div className="h-2 bg-gray-200 rounded overflow-hidden">
            <div
              className="h-full bg-[#1a2540]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* QUESTION FLOW */}
      <AnimatePresence mode="wait">
        {!isComplete ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="bg-white p-6 rounded-2xl shadow-md border"
          >
            <h2 className="text-lg font-semibold mb-4">
              {QUESTIONS[step].text}
            </h2>

            <div className="grid gap-3">
              {QUESTIONS[step].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(opt)}
                  className="text-left px-4 py-3 border rounded-xl hover:bg-[#1a2540] hover:text-white transition"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          // RESULT
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-8 rounded-2xl shadow-lg border"
          >
            {(() => {
              const result = calculateResult();

              return (
                <>
                  <h2 className="text-2xl font-bold mb-4 text-center">
                    Recommended Path: {result.title}
                  </h2>

                  <div className="mb-4">
                    <h3 className="font-semibold">Why this fits you:</h3>
                    <ul className="list-disc ml-5 text-sm mt-2">
                      {result.why.map((w, i) => (
                        <li key={i}>{w}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-semibold">Next Step:</h3>
                    <p className="text-sm mt-1">{result.next}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold">Alternative Paths:</h3>
                    <p className="text-sm mt-1">
                      {result.alternatives.join(", ")}
                    </p>
                  </div>

                  {/* ACTION BUTTON */}
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => navigate("/onboarding")}
                      className="bg-[#1a2540] text-white px-5 py-2 rounded-xl"
                    >
                      Continue →
                    </button>

                    <button
                      onClick={() => {
                        setStep(0);
                        setAnswers([]);
                      }}
                      className="border px-5 py-2 rounded-xl"
                    >
                      Restart
                    </button>
                  </div>
                </>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}