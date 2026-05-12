import { motion } from "framer-motion";

const experiences = [
  {
    year: "2025",
    title: "Junior Software Developer",
    company: "Kugi Tech",
    description:
      "Developing and maintaining web applications using React and Ruby on Rails. Contributing to full-stack features across the product.",
  },
  {
    year: "2023",
    title: "Computer Science",
    company: "Multimedia University of Kenya",
    description:
      "Pursuing a degree in Computer Science while building real-world projects and expanding technical skills.",
  },
  {
    year: "2023",
    title: "Software Developer",
    company: "Moringa School",
    description:
      "Completed an intensive software development certification with focus on full-stack JavaScript and Rails.",
  },
  {
    year: "2021",
    title: "Freelance Web Developer",
    company: "Self-Employed",
    description:
      "Built websites and web applications for small businesses. Developed foundational skills in HTML, CSS, JavaScript, and responsive design.",
  },
  {
    year: "2020",
    title: "Started Coding",
    company: "Self-Taught",
    description:
      "Began the journey with curiosity and determination. Learned programming fundamentals through online resources and personal projects.",
  },
];

const skills = [
  {
    name: "Frontend",
    items: [
      { name: "React", level: 5 },
      { name: "Next.js", level: 3 },
      { name: "TypeScript", level: 4 },
      { name: "Tailwind CSS", level: 5 },
      { name: "Framer Motion", level: 4 },
    ],
  },
  {
    name: "Backend",
    items: [
      { name: "Node.js", level: 4 },
      { name: "Python", level: 3 },
      { name: "Ruby on Rails", level: 4 },
      { name: "GraphQL", level: 3 },
      { name: "Firebase", level: 3 },
    ],
  },
  {
    name: "Design",
    items: [
      { name: "Figma", level: 4 },
      { name: "Blender", level: 2 },
      { name: "UI/UX Principles", level: 4 },
    ],
  },
  {
    name: "DevOps",
    items: [
      { name: "Git & GitHub", level: 5 },
      { name: "CI/CD", level: 3 },
      { name: "Vercel / Netlify", level: 4 },
      { name: "AWS Basics", level: 2 },
    ],
  },
];

const timelineVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const timelineItemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen py-20 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-4">
            <span className="bg-gradient-to-r from-gold-300 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
              THE JOURNEY
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold-500 via-yellow-500 to-amber-600" />

            <motion.div
              variants={timelineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {experiences.map((exp) => (
                <motion.div
                  key={`${exp.year}-${exp.title}`}
                  className="relative pl-20 pb-12 last:pb-0"
                  variants={timelineItemVariants}
                >
                  <motion.div
                    className="absolute left-6 w-5 h-5 rounded-full bg-gradient-to-r from-gold-500 to-amber-600 border-4 border-black"
                    whileHover={{ scale: 1.3 }}
                  />
                  <div className="text-gold-400 font-mono text-sm mb-1">
                    {exp.year}
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {exp.title}
                  </h3>
                  <div className="text-amber-400 mb-1">{exp.company}</div>
                  <p className="text-gray-400">{exp.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
                custom={i}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: (i) => ({
                    opacity: 1,
                    y: 0,
                    transition: { delay: i * 0.1, duration: 0.8, ease: "easeOut" },
                  }),
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(255, 215, 0, 0.5)",
                  boxShadow: "0 0 30px rgba(255, 215, 0, 0.15)",
                }}
              >
                <h3 className="text-xl font-bold text-white mb-4">
                  {skill.name}
                </h3>
                <div className="space-y-3">
                  {skill.items.map((item) => (
                    <motion.div
                      key={item.name}
                      className="space-y-1"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-gold-500 to-amber-600" />
                          <span className="text-gray-300 text-sm">
                            {item.name}
                          </span>
                        </div>
                      </div>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden ml-4">
                        <motion.div
                          className="h-full bg-gradient-to-r from-gold-500 to-amber-600 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.level * 20}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1,
                            delay: i * 0.15,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-6">
          <motion.a
            href="https://github.com/cheche-henry"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 text-center group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{
              scale: 1.03,
              borderColor: "rgba(255, 215, 0, 0.5)",
            }}
            data-hoverable="true"
          >
            <div className="text-3xl font-black text-gold-400 mb-1">143+</div>
            <div className="text-gray-400 text-sm">GitHub Repositories</div>
          </motion.a>
          <motion.a
            href="https://github.com/cheche-henry"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 text-center group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            whileHover={{
              scale: 1.03,
              borderColor: "rgba(255, 215, 0, 0.5)",
            }}
            data-hoverable="true"
          >
            <div className="text-3xl font-black text-gold-400 mb-1">Full-Stack</div>
            <div className="text-gray-400 text-sm">React + Rails Developer</div>
          </motion.a>
          <motion.a
            href="#contact"
            className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 text-center group cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{
              scale: 1.03,
              borderColor: "rgba(255, 215, 0, 0.5)",
            }}
            data-hoverable="true"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <div className="text-3xl font-black text-gold-400 mb-1">Open</div>
            <div className="text-gray-400 text-sm">Available for Work</div>
          </motion.a>
        </div>

        <motion.div
          className="mt-20 p-8 md:p-12 bg-gradient-to-r from-black/60 to-gold-900/30 rounded-3xl border border-gold-500/20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <blockquote className="text-2xl md:text-4xl font-light text-center text-white/90 leading-relaxed">
            "I believe great software is like great architecture — it should be
            beautiful, functional, and stand the test of time."
          </blockquote>
          <div className="text-center mt-6 text-gold-400">
            — Henry Chochu Gikonyo
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
