// components/navbar/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
   const [open, setOpen] = useState(false);
    const dropdownRef = useRef();
    const navigate = useNavigate();

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Logout function
    const handleLogout = () => {
      localStorage.removeItem("token"); // or whatever you're using
      navigate("/login"); // redirect to login page
  };
    const steps = [
    { label: "01/onboarding", path: "/onboarding" },
    { label: "02/dashboard", path: "/analysis" },
    { label: "03/reality check", path: "/reality" },
    { label: "04/roadmap", path: "/roadmap" },
  ];

  return (
    <nav className="flex items-center justify-between px-10 py-4 bg-[#1a2540] border-b-[3px] border-[#b8860b] shadow-lg sticky top-0 z-50">

      {/* Logo */}
      <div className="font-[Playfair_Display] font-bold text-lg text-[#f0d878] 
        cursor-pointer" onClick={() => navigate("/")}>
        Skill<span className="text-white font-normal">Map </span>
      </div>

      {/* Steps */}
      <div className="flex gap-1">
      {steps.map((step, i) => (
        <div
          key={i}
          className={`flex items-center gap-2 px-3 py-1 text-xs tracking-widest rounded
          ${location.pathname === step.path 
            ? "bg-[#b8860b]/20 text-[#f0d878]" 
            : "text-white/30"}`}
        >
          <div className={`w-2 h-2 rounded-full 
            ${location.pathname === step.path ? "bg-[#f0d878]" : "bg-white/30"}`} 
          />
          {step.label}
        </div>
      ))}
    </div>

      {/* 👤 Profile Section */}
      <div className="relative" ref={dropdownRef}>
        
        {/* Profile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="w-9 h-9 rounded-full bg-[#b8860b] text-black font-bold flex items-center justify-center"
        >
          U
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-[#1f2a48] border border-[#b8860b]/30 rounded shadow-lg overflow-hidden">
            
            <div
              onClick={() => navigate("/profile")}
              className="px-4 py-2 text-sm text-white hover:bg-[#b8860b]/20 cursor-pointer"
            >
              Profile
            </div>

            <div
              onClick={() => navigate("/settings")}
              className="px-4 py-2 text-sm text-white hover:bg-[#b8860b]/20 cursor-pointer"
            >
              Settings
            </div>

            <div
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-red-400 hover:bg-red-500/20 cursor-pointer"
            >
              Logout
            </div>

          </div>
        )}
      </div>


    </nav>
  );
};

export default Navbar;