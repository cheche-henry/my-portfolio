import { useState, useEffect, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

const HeroSection = ({ onNavigate }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -250]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.85]);

  const words = useMemo(
    () => ["Full-Stack Developer", "UI Engineer", "Problem Solver", "Rails Developer"],
    [],
  );
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [words.length]);

  const floatingDots = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        left: 20 + ((i * 37 + 13) % 60),
        top: 20 + ((i * 23 + 7) % 60),
        delay: i * 0.3,
        duration: 4 + ((i * 11) % 3),
        hue: 40 + i * 5,
      })),
    [],
  );

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative z-10 overflow-hidden"
    >
      {/* Subtle radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold-500/5 blur-[120px] pointer-events-none" />

      <motion.div
        className="w-full max-w-7xl mx-auto px-6 relative"
        style={{ y, opacity, scale }}
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.2, type: "spring" }}
            className="order-2 lg:order-1"
          >
            <motion.div className="mb-2">
              <span className="inline-block px-4 py-1.5 bg-gold-500/10 border border-gold-500/20 rounded-full text-gold-400 text-xs font-medium font-mono tracking-wider uppercase">
                React &bull; Rails &bull; UI/UX
              </span>
            </motion.div>

            <motion.h1
              className="text-7xl sm:text-8xl md:text-9xl lg:text-[8rem] font-bold mb-4 tracking-tighter leading-none font-heading"
              style={{
                background:
                  "linear-gradient(135deg, #ffffff 0%, #FFD700 50%, #DAA520 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              HENRY
            </motion.h1>

            <motion.div
              className="text-2xl md:text-4xl font-light text-gray-400 mb-4 h-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWord}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="inline-block"
                >
                  {words[currentWord]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            <motion.p
              className="text-gray-400 text-lg max-w-lg mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
            >
              I build responsive, human-centered web experiences with React,
              Ruby on Rails, and modern design tools. Every project is crafted
              with purpose.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, type: "spring" }}
            >
              <motion.button
                onClick={() => onNavigate("work")}
                className="px-8 py-4 bg-gold-500 text-black rounded-full font-bold text-base hover:bg-gold-400 transition-colors"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(255, 215, 0, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                data-hoverable="true"
              >
                View My Work
              </motion.button>
              <motion.button
                onClick={() => onNavigate("contact")}
                className="px-8 py-4 border-2 border-gold-500/50 text-gold-300 rounded-full font-bold text-base hover:border-gold-400 hover:text-gold-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-hoverable="true"
              >
                Get In Touch
              </motion.button>
              <motion.a
                href="https://github.com/cheche-henry"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border border-white/10 text-gray-400 rounded-full font-bold text-base hover:text-white hover:border-white/30 transition-all inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-hoverable="true"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </motion.a>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-white/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.4 }}
            >
              {[
                { label: "Experience", value: "2+ Years" },
                { label: "Projects", value: "50+" },
                { label: "Status", value: "Open to Work" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-gold-400 font-bold font-heading text-lg">
                    {stat.value}
                  </div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2 relative"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5, type: "spring" }}
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 border rounded-full"
                  style={{
                    borderColor: `hsla(${45 + i * 5}, 80%, ${55 - i * 8}%, ${0.2 - i * 0.03})`,
                    width: `${100 - i * 15}%`,
                    height: `${100 - i * 15}%`,
                    left: `${i * 7.5}%`,
                    top: `${i * 7.5}%`,
                  }}
                  animate={{ rotate: 360 * (i % 2 === 0 ? 1 : -1) }}
                  transition={{
                    duration: 20 + i * 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}

              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-gold-400 via-yellow-500 to-amber-600 p-1 shadow-[0_0_60px_rgba(255,215,0,0.25)]">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                    <img
                      src="https://avatars.githubusercontent.com/u/126640901?v=4"
                      alt="Henry Chochu Gikonyo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>

              {floatingDots.map((dot) => (
                <motion.div
                  key={dot.id}
                  className="absolute w-3 h-3 rounded-full shadow-lg"
                  style={{
                    background: `hsla(${dot.hue}, 85%, 55%, 0.8)`,
                    left: `${dot.left}%`,
                    top: `${dot.top}%`,
                  }}
                  animate={{
                    y: [0, -25, 0],
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: dot.duration,
                    repeat: Infinity,
                    delay: dot.delay,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 border-2 border-gold-500/30 rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1 h-2 bg-gold-400/50 rounded-full"
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
