 import { useState } from "react";
import { useNavigate } from "react-router-dom";

const QUESTIONS = [
{
id: 1,
text: "What type of work naturally interests you the most?",
options: [
{ label: "Building apps, systems, or technology", scores: { tech: 2 } },
{ label: "Managing money or financial plans", scores: { finance: 2 } },
{ label: "Creating visuals or designs", scores: { design: 2 } },
{ label: "Leading people or projects", scores: { business: 2 } },
{ label: "Researching and deep analysis", scores: { research: 2 } },
],
},
{
id: 2,
text: "Which environment do you enjoy most?",
options: [
{ label: "Technical / coding work", scores: { tech: 2 } },
{ label: "Financial / data analysis", scores: { finance: 2 } },
{ label: "Creative / design space", scores: { design: 2 } },
{ label: "Meetings / planning / strategy", scores: { business: 2 } },
{ label: "Academic / theory-based", scores: { research: 2 } },
],
},
{
id: 3,
text: "What are you naturally good at?",
options: [
{ label: "Logic & problem solving", scores: { tech: 2 } },
{ label: "Numbers & calculations", scores: { finance: 2 } },
{ label: "Creativity & visuals", scores: { design: 2 } },
{ label: "Communication & leadership", scores: { business: 2 } },
{ label: "Deep thinking", scores: { research: 2 } },
],
},
{
id: 4,
text: "What have you explored before?",
options: [
{ label: "Coding / tech tools", scores: { tech: 2 } },
{ label: "Finance / trading", scores: { finance: 2 } },
{ label: "Design / editing", scores: { design: 2 } },
{ label: "Managing teams / ideas", scores: { business: 2 } },
{ label: "Academic subjects", scores: { research: 2 } },
{ label: "Nothing yet", scores: { tech: 1, finance: 1, design: 1, business: 1, research: 1 } },
],
},
{
id: 5,
text: "What matters most to you?",
options: [
{ label: "Innovation", scores: { tech: 2 } },
{ label: "Money & stability", scores: { finance: 2 } },
{ label: "Creativity", scores: { design: 2 } },
{ label: "Leadership", scores: { business: 2 } },
{ label: "Knowledge", scores: { research: 2 } },
],
},
];

const ROLE_INFO = {
tech: {
title: "Technology (Software / IT)",
why: ["You enjoy logic", "You like building systems", "You prefer structured thinking"],
next: "Start with JavaScript or Python",
alternatives: ["Developer", "Data Science", "Cybersecurity"],
},
finance: {
title: "Finance",
why: ["You like numbers", "You think analytically", "You care about money systems"],
next: "Learn Excel + finance basics",
alternatives: ["Analyst", "Investment Banking"],
},
design: {
title: "Design",
why: ["You are creative", "You like visuals", "You enjoy expression"],
next: "Start with Figma",
alternatives: ["UI/UX", "Graphic Design"],
},
business: {
title: "Business",
why: ["You like leadership", "You enjoy people interaction", "You think strategically"],
next: "Learn business fundamentals",
alternatives: ["Entrepreneur", "Manager"],
},
research: {
title: "Research",
why: ["You like deep thinking", "You enjoy theory", "You are curious"],
next: "Focus on academics",
alternatives: ["Scientist", "Professor"],
},
};

export default function Counselling() {
const [step, setStep] = useState(0);
const [answers, setAnswers] = useState([]);
const navigate = useNavigate();

const handleSelect = (option) => {
setAnswers((prev) => {
const updated = [...prev];
updated[step] = option.scores;
return updated;
});


setStep((prev) => prev + 1);


};

const calculateResult = () => {
const score = { tech: 0, finance: 0, design: 0, business: 0, research: 0 };


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
     const goToLanding = () => {
    navigate("/landing", {
      state: { from: "counselling" }
    });
  };
const isComplete = step >= QUESTIONS.length;
const progress = Math.round((step / QUESTIONS.length) * 100);

return ( 
    <div className="max-w-3xl mx-auto px-6 py-12">


  {/* HEADER */}
  <div className="text-center mb-8">
    <h1 className="text-3xl font-bold">Career Discovery</h1>
    <p className="text-gray-500 text-sm mt-1">
      Find your domain based on your interests
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

  {/* MAIN CONTENT */}
  {!isComplete ? (
    <div className="bg-white p-6 rounded-2xl shadow-md border">
      <h2 className="text-lg font-semibold mb-4">
        {QUESTIONS[step].text}
      </h2>

      <div className="grid gap-3">
        {QUESTIONS[step].options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(opt)}
            className="px-4 py-3 border rounded-xl text-left cursor-pointer hover:bg-[#1a2540] hover:text-white transition"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  ) : (
    <div className="bg-white p-8 rounded-2xl shadow-lg border">
      {(() => {
        const result = calculateResult();

        return (
          <>
            <h2 className="text-2xl font-bold text-center mb-4">
              Recommended Domain: {result.title}
            </h2>

            <ul className="list-disc ml-5 mb-4 text-sm">
              {result.why.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>

            <p className="text-sm mb-4">
              <strong>Next:</strong> {result.next}
            </p>

            <p className="text-sm mb-6">
              <strong>Alternatives:</strong>{" "}
              {result.alternatives.join(", ")}
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={goToLanding}
                className="bg-[#1a2540] text-white px-5 py-2 rounded-xl"
              >
                Continue
              </button>

              <button
                onClick={() => {
                  setStep(0);
                  setAnswers([]);
                }}Z
                className="border px-5 py-2 rounded-xl"
              >
                Restart
              </button>
            </div>
          </>
        );
      })()}
    </div>
  )}
</div>

);
}
