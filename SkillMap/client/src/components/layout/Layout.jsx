import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <div
      className="min-h-screen text-[#1c1208] font-[Lato]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E"), 
        linear-gradient(160deg, #f8f3e8 0%, #f0e8d0 45%, #ede4cc 100%)`,
        backgroundBlendMode: "overlay",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{
            duration: 0.45,
            ease: [0.25, 0.8, 0.25, 1],
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}