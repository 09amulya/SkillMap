// src/utils/roadmap.js

export function compareSkills(userSkills, requiredSkills) {
  return {
    matched: requiredSkills.filter(s => userSkills.includes(s)),
    missing: requiredSkills.filter(s => !userSkills.includes(s))
  };
}

export function calculateReadiness(matched, total) {
  return total === 0 ? 0 : Math.round((matched / total) * 100);
}

export function detectBlockedSkills(missingSkills, deps) {
  const blocked = new Set();
  missingSkills.forEach(skill => {
    Object.entries(deps).forEach(([depSkill, reqs]) => {
      if (reqs.some(r => missingSkills.includes(r))) {
        blocked.add(depSkill);
      }
    });
  });
  return Array.from(blocked);
}

export function generateRoadmap(missingSkills, deps, priorities, resources) {
  const steps = [];
  const added = new Set();

  function addSkill(skill, depth = 0) {
    if (added.has(skill) || depth > 10) return;

    (deps[skill] || []).forEach(r => {
      if (missingSkills.includes(r)) addSkill(r, depth + 1);
    });

    if (!added.has(skill)) {
      added.add(skill);
      steps.push({
        skill,
        type: "learn",
        priority: priorities[skill] || "MEDIUM",
        resource: resources[skill] || "Search online tutorials",
        deps: (deps[skill] || []).filter(d => missingSkills.includes(d))
      });
    }
  }

  ["HIGH", "MEDIUM", "LOW"].forEach(p => {
    missingSkills
      .filter(s => (priorities[s] || "MEDIUM") === p)
      .forEach(s => addSkill(s));
  });

  steps.push({
    skill: "Build a Portfolio Project",
    type: "project",
    priority: "HIGH",
    resource: "GitHub, personal portfolio site",
    deps: []
  });

  steps.push({
    skill: "Apply & Network",
    type: "project",
    priority: "HIGH",
    resource: "LinkedIn, local meetups, job boards",
    deps: []
  });

  return steps;
}