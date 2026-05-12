import { useState } from "react";
import { motion } from "framer-motion";

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
  },
  {
    title: "Charades",
    category: "Real-time Multiplayer Game",
    description:
      "A real-time multiplayer Kenyan-inspired charades game where teams join via a session code and compete to guess words within a time limit across multiple devices.",
    tech: ["React", "Firebase", "Realtime Database", "Tailwind"],
    gradient: "from-gold-700 to-amber-800",
    year: "2026",
    link: "https://cheche-henry.github.io/50-50-game/",
  },
  {
    title: "Thami Water Billing System",
    category: "Billing & Payment Platform",
    description:
      "Water billing and management platform supporting customer accounts, meter tracking, and M-Pesa payment integration via Daraja API.",
    tech: ["Ruby on Rails", "PostgreSQL", "M-Pesa Daraja API", "JWT"],
    gradient: "from-amber-700 to-gold-800",
    year: "2025",
    link: "https://github.com/cheche-henry/thami-billing",
    isPrivate: true,
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

  return (
    <section id="work" className="min-h-screen py-20 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-4">
            <span className="bg-gradient-to-r from-gold-300 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
              SELECTED
            </span>
          </h2>
          <h2 className="text-5xl md:text-7xl font-black text-white">WORKS</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                variants={cardVariants}
                onClick={() => setActiveCard(i)}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-500 ${
                  activeCard === i
                    ? "bg-white/10 backdrop-blur-md border border-gold-500/30"
                    : "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-gold-500/20"
                }`}
                whileHover={{ scale: 1.02, x: 10 }}
                data-hoverable="true"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-gold-400 text-sm font-mono">
                      {project.year}
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-1">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      {project.category}
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: activeCard === i ? 45 : 0 }}
                    transition={{ duration: 0.4, ease: "backOut" }}
                  >
                    <svg
                      className="w-8 h-8 text-gold-400/50"
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
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="relative h-96 lg:h-auto rounded-3xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
            key={activeCard}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${projects[activeCard].gradient} opacity-80`}
            />

            <div className="relative h-full p-8 flex flex-col justify-end">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-4xl font-bold text-white mb-4">
                  {projects[activeCard].title}
                </h3>
                <p className="text-white/80 text-lg mb-6">
                  {projects[activeCard].description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {projects[activeCard].tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  {projects[activeCard].isPrivate ? (
                    <span className="inline-block px-4 py-2 bg-white/10 rounded-full text-white/70 text-sm font-medium">
                      Private Repository
                    </span>
                  ) : (
                    <motion.a
                      href={projects[activeCard].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-3 bg-white text-black rounded-full font-bold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      data-hoverable="true"
                    >
                      View on GitHub
                    </motion.a>
                  )}
                </div>
              </motion.div>
            </div>

            <div className="absolute top-8 right-8 w-32 h-32">
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
