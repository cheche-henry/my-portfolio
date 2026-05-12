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
      <motion.div
        className="container mx-auto px-6 relative"
        style={{ y, opacity, scale }}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.2, type: "spring" }}
            className="order-2 md:order-1"
          >
            <motion.div
              className="text-6xl md:text-8xl lg:text-9xl font-black mb-4 tracking-tighter"
              style={{
                background:
                  "linear-gradient(135deg, #ffffff 0%, #FFD700 50%, #DAA520 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              HENRY
            </motion.div>

            <motion.div
              className="text-2xl md:text-4xl font-light text-gray-400 mb-6 h-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWord}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="inline-block"
                >
                  {words[currentWord]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            <motion.p
              className="text-gray-400 text-lg max-w-md mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
            >
              React.js Developer | Ruby on Rails Enthusiast | UI/UX Designer
              with Figma Proficiency. I build responsive, human-centered web
              experiences that blend function with craft.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, type: "spring" }}
            >
              <motion.button
                onClick={() => onNavigate("work")}
                className="px-8 py-4 bg-gold-500 text-black rounded-full font-bold hover:bg-gold-400 transition-colors"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(255, 215, 0, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                data-hoverable="true"
              >
                Explore Work
              </motion.button>
              <motion.button
                onClick={() => onNavigate("contact")}
                className="px-8 py-4 border-2 border-gold-500/50 text-gold-300 rounded-full font-bold hover:border-gold-400 hover:text-gold-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-hoverable="true"
              >
                Let's Talk
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            className="order-1 md:order-2 relative"
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
                    borderColor: `hsla(${45 + i * 5}, 80%, ${55 - i * 8}%, ${0.25 - i * 0.04})`,
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
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-gold-400 via-yellow-500 to-amber-600 p-1 shadow-[0_0_40px_rgba(255,215,0,0.3)]">
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
        <div className="w-6 h-10 border-2 border-gold-500/40 rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1 h-2 bg-gold-400/60 rounded-full"
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
