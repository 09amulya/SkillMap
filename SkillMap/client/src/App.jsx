import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";

import Layout from "./components/layout/Layout";
import Navbar from "./components/layout/Navbar";

import Onboarding from "./pages/Onboarding";
import Analysis from "./pages/Analysis";
import Reality from "./pages/Reality";
import Roadmap from "./pages/Roadmap";
import LandingPage from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SkillGateawayHero from "./pages/Skillgateaway";
import Consultation from "./pages/Consultation";
import Profile from "./pages/Profile";
import Resume from "./pages/Resume";
import Counselling from "./pages/Counselling";
import TechConsultation from "./pages/TechConsultation";
import Simulation from "./pages/Simulation";

function App() {
  const [userData, setUserData] = useState(null);
  const location = useLocation(); // ✅ required for animations

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("userData");
    if (saved) {
      setUserData(JSON.parse(saved));
    }
  }, []);

  // Save function
  const handleComplete = (role, skills) => {
    const data = { role, skills };
    setUserData(data);
    localStorage.setItem("userData", JSON.stringify(data));
  };

  return (
    <><Navbar /><Layout>

      <Routes location={location} key={location.pathname}>

        {/* Entry Gateway (FIRST SCREEN) */}
          <Route path="/" element={<SkillGateawayHero />} />

          {/* Landing Page (for "I Know Something") */}
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/counselling" element={<Counselling/>} />

          {/* Consultation */}
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/tech-consultation" element={<TechConsultation/>} />

          {/* Onboarding (for beginners) */}
          <Route
            path="/onboarding"
            element={<Onboarding onComplete={handleComplete} />}
          />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile/>} />

        {/* Protected Routes */}
        <Route
          path="/analysis"
          element={userData ? (
            <Analysis
              role={userData.role}
              userSkills={userData.skills} />
          ) : (
            <Navigate to="/" />
          )} />

        <Route
          path="/reality"
          element={userData ? (
            <Reality
              role={userData.role}
              userSkills={userData.skills} />
          ) : (
            <Navigate to="/" />
          )} />

        <Route
          path="/roadmap"
          element={userData ? (
            <Roadmap
              role={userData.role}
              userSkills={userData.skills} />
          ) : (
            <Navigate to="/" />
          )} />
        <Route path="/resume" element={<Resume/>} />
        <Route path="/simulation" element={<Simulation/>} />
      </Routes>
    </Layout></>
  );
}

export default App;