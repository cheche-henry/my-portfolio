import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const base = import.meta.env.BASE_URL;

const projects = [
  {
    title: "Tumaini Hospital System",
    category: "Full Stack Web Application",
    description:
      "Hospital management system connecting patients and doctors with appointment scheduling, patient records, and real-time availability tracking.",
    tech: ["React", "Ruby on Rails", "PostgreSQL", "REST API"],
    gradient: "from-gold-800 to-amber-900",
    year: "2025",
    link: "https://github.com/cheche-henry/tumaini-hospital",
    isPrivate: true,
    images: [],
  },
  {
    title: "On The Clock",
    category: "Real-time Multiplayer Game",
    description:
      "A real-time Kenyan party word game where teams race against the clock. The host streams game state from one screen while players guess on their phones via Firebase sync.",
    tech: ["React", "Firebase Realtime DB", "Tailwind CSS", "Framer Motion"],
    gradient: "from-gold-700 to-amber-800",
    year: "2026",
    link: "https://github.com/cheche-henry/50-50-game",
    liveUrl: "https://on-the-clock-ten.vercel.app/",
    images: [
      `${base}on-the-clock-landing.png`,
      `${base}on-the-clock-host.png`,
      `${base}on-the-clock-player.png`,
    ],
  },
  {
    title: "Developer Portfolio",
    category: "Frontend Application",
    description:
      "Interactive portfolio built with React, Framer Motion, and Tailwind CSS featuring a dynamic particle background, smooth animations, and responsive design.",
    tech: ["React", "Vite", "Framer Motion", "Tailwind CSS"],
    gradient: "from-gold-600 to-amber-700",
    year: "2026",
    link: "https://github.com/cheche-henry/my-portfolio",
    images: [],
  },
  {
    title: "Mobile App",
    category: "Mobile Application",
    description:
      "A cross-platform mobile application built with React Native. Details coming soon.",
    tech: ["React Native", "TypeScript", "Firebase"],
    gradient: "from-amber-700 to-gold-800",
    year: "2026",
    link: "#",
    images: [],
    mobileApp: true,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const WorkSection = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [activeImage, setActiveImage] = useState(0);

  const project = projects[activeCard];
  const hasImages = project.images && project.images.length > 0;

  return (
    <section id="work" className="min-h-screen py-20 relative z-10">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,215,0,0.02) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="w-full max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="w-12 h-0.5 bg-gradient-to-r from-gold-500 to-amber-600 mb-6" />
          <h2 className="text-5xl md:text-7xl font-black mb-4 font-heading">
            <span className="bg-gradient-to-r from-gold-300 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
              SELECTED
            </span>
          </h2>
          <h2 className="text-5xl md:text-7xl font-black text-white font-heading">
            WORKS
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projects.map((p, i) => (
              <motion.div
                key={p.title}
                variants={cardVariants}
                onClick={() => {
                  setActiveCard(i);
                  setActiveImage(0);
                }}
                className={`p-5 rounded-2xl cursor-pointer transition-all duration-500 flex items-center gap-4 ${
                  activeCard === i
                    ? "bg-white/10 backdrop-blur-md border border-gold-500/30"
                    : "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-gold-500/20"
                }`}
                whileHover={{ scale: 1.02, x: 10 }}
                data-hoverable="true"
              >
                {p.images && p.images.length > 0 && (
                  <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-white/5">
                    <img
                      src={p.images[0]}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <span className="text-gold-400 text-sm font-mono">
                    {p.year}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-0.5 truncate">
                    {p.title}
                  </h3>
                  <p className="text-gray-400 text-sm truncate">
                    {p.category}
                  </p>
                </div>
                <motion.div
                  animate={{ rotate: activeCard === i ? 45 : 0 }}
                  transition={{ duration: 0.4, ease: "backOut" }}
                  className="flex-shrink-0"
                >
                  <svg
                    className="w-6 h-6 text-gold-400/50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="relative rounded-3xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
            key={activeCard}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-85`}
            />

            {hasImages && (
              <div className="relative w-full bg-black/40 overflow-hidden">
                {project.mobileApp ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="relative w-[240px] sm:w-[280px] aspect-[9/16]">
                      <div className="absolute inset-0 rounded-[28px] border-[3px] border-white/15 bg-black shadow-2xl overflow-hidden">
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={activeImage}
                            src={project.images[activeImage]}
                            alt={`${project.title} screenshot ${activeImage + 1}`}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="w-full h-full object-contain"
                          />
                        </AnimatePresence>
                      </div>
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[18px] bg-black rounded-b-xl z-10" />
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-56 md:h-72 overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activeImage}
                        src={project.images[activeImage]}
                        alt={`${project.title} screenshot ${activeImage + 1}`}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full object-cover object-top"
                      />
                    </AnimatePresence>
                  </div>
                )}
                {project.images.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {project.images.map((img, i) => (
                      <motion.button
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImage(i);
                        }}
                        className={`w-10 h-7 rounded-md overflow-hidden border transition-all ${
                          activeImage === i
                            ? "border-gold-400 ring-1 ring-gold-400/50"
                            : "border-white/10 opacity-60 hover:opacity-100"
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <img
                          src={img}
                          alt={`view ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="relative p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <h3 className="text-4xl font-bold text-white mb-3 font-heading">
                  {project.title}
                </h3>
                <p className="text-white/80 text-lg mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-3 bg-gold-500 text-black rounded-full font-bold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      data-hoverable="true"
                    >
                      View Live
                    </motion.a>
                  )}
                  {!project.isPrivate ? (
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-bold"
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                      whileTap={{ scale: 0.95 }}
                      data-hoverable="true"
                    >
                      Source Code
                    </motion.a>
                  ) : (
                    <span className="inline-block px-4 py-2 bg-white/10 rounded-full text-white/70 text-sm font-medium">
                      Private Repo
                    </span>
                  )}
                </div>
              </motion.div>
            </div>

            {!hasImages && (
              <div className="absolute top-8 right-8 w-32 h-32 pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-full h-full border-2 border-white/20 rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
