// src/components/onboarding/ResumeUpload.jsx

export default function ResumeUpload({ resumeActive, handleResume }) {
  return (
    <div className="bg-[#ede7d5] border border-[#b8860b]/30 rounded-md p-[1.6rem] shadow-[0_2px_12px_rgba(26,18,8,0.1)]">

      <div className="text-[0.68rem] uppercase tracking-[0.18em] text-[#b8860b] font-bold mb-[1.1rem] pb-3 border-b border-[#b8860b]/30">
        03 — Resume (Optional)
      </div>

      <div
        onClick={handleResume}
        className={`border-2 border-dashed rounded p-8 text-center cursor-pointer text-[0.875rem]
        ${
          resumeActive
            ? "border-[#2e7d50] text-[#2e7d50] bg-[#2e7d50]/10"
            : "border-[#b8860b]/50 text-[#7a6a4f] bg-[#b8860b]/5 hover:border-[#d4a017] hover:text-[#1c1208]"
        }`}
      >
        {resumeActive
          ? "✓ Resume parsed — skills auto-filled from simulation"
          : "Click to simulate resume upload & parsing"}

        <div className="mt-2 text-[0.75rem] opacity-60">
          Simulates NLP extraction of skills from resume text
        </div>
      </div>
    </div>
  );
}