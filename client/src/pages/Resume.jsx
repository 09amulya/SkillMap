import { useState } from "react";
import { motion } from "framer-motion";

export default function Resume() {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [projects, setProjects] = useState("");
  const [result, setResult] = useState(null);

  const handleGenerate = () => {
    const userSkills = skills.split(",").map((s) => s.trim());

    const matched = userSkills.slice(0, 4);

    const missing = ["React", "Node.js", "APIs"].filter(
      (skill) => !userSkills.includes(skill)
    );

    setResult({
      name: "Your Name",
      email: "your.email@gmail.com",
      phone: "+91 XXXXX XXXXX",
      location: "India",

      summary: `Motivated and detail-oriented aspiring ${role} with a strong foundation in ${matched.join(
        ", "
      )}. Adept at building responsive and scalable applications with a focus on performance and user experience. Demonstrates strong problem-solving abilities and a commitment to continuous learning. Seeking opportunities to contribute to real-world projects and grow as a professional developer.`,

      skills: {
        core: userSkills.slice(0, 3),
        additional: userSkills.slice(3),
      },

      projects: projects.split("\n").map((p) => ({
        title: p,
        points: [
          `Developed ${p} using ${userSkills.join(
            ", "

          )}, focusing on modular architecture and clean code practices.`,
          `Implemented key features improving usability and responsiveness across devices.`,
          `Demonstrated strong understanding of real-world development workflows and debugging techniques.`,
        ],
      })),

      education: {
        degree: "B.Tech in Computer Science",
        institute: "Your College Name",
        year: "2024 - Present",
      },

      achievements: [
        "Built multiple real-world projects demonstrating end-to-end development skills",
        "Strong grasp of frontend fundamentals and problem-solving",
      ],

      keywords: missing,
    });
  };

  const downloadPDF = () => {
    window.print();
  };

  return (
  <div className="max-w-5xl mx-auto px-6 py-12">

    {/* TITLE */}
     <div className="text-center mb-10">
  <h1 className="text-4xl font-bold tracking-tight">
    Resume Builder
  </h1>
  <p className="text-gray-500 mt-2 text-sm">
    Turn your skills into a professional, job-ready resume
  </p>
</div>

    {/* INPUT CARD */}
    <div className="bg-white/80 backdrop-blur-md border border-[#e5d7b8] rounded-2xl p-6 shadow-md grid gap-4 print:hidden">

      <input
        placeholder="Target Role"
        className="p-3 rounded-xl border border-[#e5d7b8] focus:outline-none focus:ring-2 focus:ring-[#b8860b]/50 transition"
        onChange={(e) => setRole(e.target.value)}
      />

      <textarea
        placeholder="Skills (comma separated)"
        className="p-3 rounded-xl border border-[#e5d7b8] focus:outline-none focus:ring-2 focus:ring-[#b8860b]/50 transition"
        onChange={(e) => setSkills(e.target.value)}
      />

      <textarea
        placeholder="Projects (one per line)"
        className="p-3 rounded-xl border border-[#e5d7b8] focus:outline-none focus:ring-2 focus:ring-[#b8860b]/50 transition"
        onChange={(e) => setProjects(e.target.value)}
      />

      <button
        onClick={handleGenerate}
        className="mt-2 bg-[#1a2540] text-white py-3 rounded-xl font-semibold tracking-wide hover:opacity-90 transition"
      >
        Generate Resume
      </button>
    </div>

    {/* OUTPUT */}
    {result && (
      <>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 p-10 bg-white border border-[#e5d7b8] rounded-2xl shadow-xl max-w-212.5 mx-auto text-[13px] leading-relaxed"
        >

          {/* HEADER */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold tracking-wide">
              {result.name}
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              {result.email} • {result.phone} • {result.location}
            </p>
          </div>

          {/* SUMMARY */}
          <section className="mb-6">
            <h2 className="font-semibold border-b pb-1 mb-2 uppercase tracking-wide text-sm">
              Professional Summary
            </h2>
            <p className="text-gray-700">{result.summary}</p>
          </section>

          {/* SKILLS */}
          <section className="mb-6">
            <h2 className="font-semibold border-b pb-1 mb-2 uppercase tracking-wide text-sm">
              Technical Skills
            </h2>
            <p>
              <span className="font-semibold">Core:</span>{" "}
              {result.skills.core.join(", ")}
            </p>
            <p>
              <span className="font-semibold">Additional:</span>{" "}
              {result.skills.additional.join(", ")}
            </p>
          </section>

          {/* PROJECTS */}
          <section className="mb-6">
            <h2 className="font-semibold border-b pb-1 mb-2 uppercase tracking-wide text-sm">
              Projects
            </h2>

            {result.projects.map((proj, i) => (
              <div key={i} className="mb-3">
                <p className="font-semibold text-[#1a2540]">
                  {proj.title}
                </p>
                <ul className="list-disc ml-5 text-gray-700">
                  {proj.points.map((point, j) => (
                    <li key={j}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* EDUCATION */}
          <section className="mb-6">
            <h2 className="font-semibold border-b pb-1 mb-2 uppercase tracking-wide text-sm">
              Education
            </h2>
            <p>
              {result.education.degree}
              <br />
              <span className="text-gray-600">
                {result.education.institute} ({result.education.year})
              </span>
            </p>
          </section>

          {/* ACHIEVEMENTS */}
          <section className="mb-6">
            <h2 className="font-semibold border-b pb-1 mb-2 uppercase tracking-wide text-sm">
              Achievements
            </h2>
            <ul className="list-disc ml-5 text-gray-700">
              {result.achievements.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </section>

          {/* KEYWORDS */}
          <section>
            <h2 className="font-semibold border-b pb-1 mb-2 uppercase tracking-wide text-sm text-red-500">
              Suggested Improvements
            </h2>
            <p className="text-gray-700">
              Consider adding: {result.keywords.join(", ")}
            </p>
          </section>

        </motion.div>

        {/* DOWNLOAD BUTTON */}
        <div className="print:hidden mt-8 text-center">
          <button
            onClick={downloadPDF}
            className="bg-[#1a4a2e] text-white px-6 py-3 rounded-xl font-semibold tracking-wide hover:opacity-90 transition"
          >
            Download PDF
          </button>
        </div>
      </>
    )}
  </div>
);
}