import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

// =============================================================================
// COMPONENT: Interactive Background Canvas
// Description: Renders a particle network that reacts to mouse movement.
// =============================================================================
const InteractiveBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        // Reduced velocity for smoother movement
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 2 + 1;
        this.color = `hsla(${Math.random() * 60 + 250}, 70%, 60%, ${Math.random() * 0.5 + 0.2})`;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          const angle = Math.atan2(dy, dx);
          this.vx -= Math.cos(angle) * 0.01;
          this.vy -= Math.sin(angle) * 0.01;
        }

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        this.vx *= 0.99;
        this.vy *= 0.99;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < 80; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.update();
        particle.draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(270, 70%, 60%, ${0.15 * (1 - dist / 100)})`;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    resize();
    init();
    animate();

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0f0a1a 100%)' }}
    />
  );
};

// =============================================================================
// COMPONENT: Custom Cursor
// Description: A trailing cursor that reacts to hoverable elements.
// =============================================================================
const CustomCursor = () => {
  const [positions, setPositions] = useState([]);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPositions(prev => [...prev.slice(-15), { x: e.clientX, y: e.clientY, id: Date.now() }]);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      setIsHovering(
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-hoverable]')
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {positions.map((pos, i) => (
        <motion.div
          key={pos.id}
          className="fixed w-2 h-2 rounded-full pointer-events-none z-50"
          style={{
            left: pos.x,
            top: pos.y,
            background: `hsla(${250 + i * 5}, 80%, 60%, ${i / positions.length * 0.5})`
          }}
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      ))}
      <motion.div
        className="fixed w-8 h-8 border-2 border-purple-400 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          scale: isHovering ? 2.5 : 1,
          rotate: isHovering ? 45 : 0
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          x: positions[positions.length - 1]?.x - 16 || 0,
          y: positions[positions.length - 1]?.y - 16 || 0
        }}
      />
    </>
  );
};

// =============================================================================
// COMPONENT: Navigation Orb
// Description: Floating navigation dots on the right side.
// =============================================================================
const NavigationOrb = ({ activeSection, setActiveSection }) => {
  const sections = ['home', 'work', 'about', 'contact'];

  return (
    <motion.div
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:block"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 1, type: "spring" }}
    >
      <div className="relative">
        {sections.map((section, i) => (
          <motion.button
            key={section}
            onClick={() => setActiveSection(section)}
            className="block w-3 h-3 rounded-full mb-4 relative group"
            style={{
              background: activeSection === section
                ? 'linear-gradient(135deg, #a855f7, #ec4899)'
                : 'rgba(255,255,255,0.3)'
            }}
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.8 }}
            data-hoverable="true"
          >
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap capitalize">
              {section}
            </span>
          </motion.button>
        ))}
        <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-purple-500 to-pink-500 opacity-30" />
      </div>
    </motion.div>
  );
};

// =============================================================================
// COMPONENT: Hero Section
// Description: The main landing area with animated typography and graphics.
// =============================================================================
const HeroSection = ({ onNavigate }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.8]);

  const words = ['Creator', 'Developer', 'Designer', 'Thinker'];
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord(prev => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative z-10 overflow-hidden">
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
                background: 'linear-gradient(135deg, #ffffff 0%, #a855f7 50%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              HENRY
            </motion.div>
            
            <motion.div
              className="text-3xl md:text-5xl font-light text-gray-400 mb-8 h-16"
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
              Crafting digital experiences at the intersection of art and technology. 
              Every pixel has purpose. Every interaction tells a story.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, type: "spring" }}
            >
              <motion.button
                onClick={() => onNavigate('work')}
                className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-purple-100 transition-colors"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                data-hoverable="true"
              >
                Explore Work
              </motion.button>
              <motion.button
                onClick={() => onNavigate('contact')}
                className="px-8 py-4 border-2 border-white/30 rounded-full font-bold hover:border-white transition-colors"
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
              {/* Rotating rings */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 border-2 rounded-full"
                  style={{
                    borderColor: `hsla(${250 + i * 20}, 70%, 60%, ${0.3 - i * 0.05})`,
                    width: `${100 - i * 15}%`,
                    height: `${100 - i * 15}%`,
                    left: `${i * 7.5}%`,
                    top: `${i * 7.5}%`
                  }}
                  animate={{ rotate: 360 * (i % 2 === 0 ? 1 : -1) }}
                  transition={{ duration: 25 + i * 5, repeat: Infinity, ease: "linear" }}
                />
              ))}

              {/* Center image placeholder */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 p-1">
                  <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                    <svg className="w-24 h-24 md:w-32 md:h-32 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                </div>
              </motion.div>

              {/* Floating elements */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 rounded-full"
                  style={{
                    background: `hsla(${250 + i * 40}, 80%, 60%, 0.8)`,
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`
                  }}
                  animate={{
                    y: [0, -20, 0],
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 4 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1 h-2 bg-white/50 rounded-full"
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

// =============================================================================
// COMPONENT: Work Section
// Description: Displays project cards with interactive details.
// =============================================================================
const WorkSection = () => {
  const [activeCard, setActiveCard] = useState(0);

  const projects = [
    {
      title: 'Nebula Dashboard',
      category: 'Web Application',
      description: 'Real-time analytics platform processing 1M+ events daily with sub-second latency.',
      tech: ['React', 'TypeScript', 'GraphQL', 'PostgreSQL'],
      color: 'from-violet-600 to-indigo-600',
      year: '2024'
    },
    {
      title: 'Quantum UI',
      category: 'Design System',
      description: 'Component library used by 50+ teams, featuring 100+ accessible components.',
      tech: ['Vue', 'Storybook', 'Figma', 'A11y'],
      color: 'from-fuchsia-600 to-pink-600',
      year: '2024'
    },
    {
      title: 'Echo API',
      category: 'Backend Service',
      description: 'Distributed microservices architecture handling 10K requests per second.',
      tech: ['Node.js', 'Redis', 'Kubernetes', 'AWS'],
      color: 'from-cyan-600 to-blue-600',
      year: '2023'
    },
    {
      title: 'Prism Mobile',
      category: 'Mobile App',
      description: 'Cross-platform app with 100K+ downloads and 4.8 star rating.',
      tech: ['React Native', 'Firebase', 'Stripe', 'Analytics'],
      color: 'from-orange-600 to-red-600',
      year: '2023'
    }
  ];

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
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              SELECTED
            </span>
          </h2>
          <h2 className="text-5xl md:text-7xl font-black text-white">
            WORKS
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Project Cards */}
          <div className="space-y-4">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                onClick={() => setActiveCard(i)}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-500 ${
                  activeCard === i
                    ? 'bg-white/10 backdrop-blur-md border border-white/20'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                whileHover={{ scale: 1.02, x: 10 }}
                data-hoverable="true"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-purple-400 text-sm font-mono">{project.year}</span>
                    <h3 className="text-2xl font-bold text-white mt-1">{project.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">{project.category}</p>
                  </div>
                  <motion.div
                    animate={{ rotate: activeCard === i ? 45 : 0 }}
                    transition={{ duration: 0.4, ease: "backOut" }}
                  >
                    <svg className="w-8 h-8 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Project Details */}
          <motion.div
            className="relative h-96 lg:h-auto rounded-3xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            key={activeCard}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${projects[activeCard].color} opacity-80`} />
            
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
                <motion.button
                  className="px-6 py-3 bg-white text-black rounded-full font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-hoverable="true"
                >
                  View Case Study
                </motion.button>
              </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-8 right-8 w-32 h-32">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-full h-full border-2 border-white/20 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// =============================================================================
// COMPONENT: About Section
// Description: Timeline of experience and skills grid.
// =============================================================================
const AboutSection = () => {
  const experiences = [
    {
      year: '2024',
      title: 'Senior Developer',
      company: 'Tech Innovators Inc.',
      description: 'Leading frontend architecture for enterprise applications.'
    },
    {
      year: '2022',
      title: 'Full Stack Developer',
      company: 'Digital Dreams',
      description: 'Built scalable web applications serving millions of users.'
    },
    {
      year: '2020',
      title: 'Frontend Developer',
      company: 'Creative Studio',
      description: 'Crafted immersive web experiences for global brands.'
    },
    {
      year: '2019',
      title: 'Started Journey',
      company: 'Self-Taught',
      description: 'Began coding journey with curiosity and determination.'
    }
  ];

  const skills = [
    { name: 'Frontend', items: ['React', 'Vue', 'TypeScript', 'WebGL'] },
    { name: 'Backend', items: ['Node.js', 'Python', 'Go', 'GraphQL'] },
    { name: 'Design', items: ['Figma', 'Blender', 'After Effects', 'Principle'] },
    { name: 'DevOps', items: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'] }
  ];

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
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              THE JOURNEY
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-orange-500" />
            
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.year}
                className="relative pl-20 pb-12 last:pb-0"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8 }}
              >
                <motion.div
                  className="absolute left-6 w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-4 border-gray-900"
                  whileHover={{ scale: 1.3 }}
                />
                <div className="text-purple-400 font-mono text-sm mb-2">{exp.year}</div>
                <h3 className="text-2xl font-bold text-white">{exp.title}</h3>
                <div className="text-pink-400 mb-2">{exp.company}</div>
                <p className="text-gray-400">{exp.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 gap-6">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                whileHover={{ 
                  scale: 1.05,
                  borderColor: 'rgba(168, 85, 247, 0.5)',
                  boxShadow: '0 0 30px rgba(168, 85, 247, 0.2)'
                }}
              >
                <h3 className="text-xl font-bold text-white mb-4">{skill.name}</h3>
                <div className="space-y-2">
                  {skill.items.map((item) => (
                    <motion.div
                      key={item}
                      className="flex items-center space-x-2"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                      <span className="text-gray-300">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Philosophy Section */}
        <motion.div
          className="mt-20 p-8 md:p-12 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-3xl border border-white/10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <blockquote className="text-2xl md:text-4xl font-light text-center text-white/90 leading-relaxed">
            "I believe great software is like great architecture — 
            it should be beautiful, functional, and stand the test of time."
          </blockquote>
          <div className="text-center mt-6 text-purple-400">— Henry Chochu Gikonyo</div>
        </motion.div>
      </div>
    </section>
  );
};

// =============================================================================
// COMPONENT: Contact Section
// Description: Interactive form and contact details.
// =============================================================================
const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStatus('success');
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section id="contact" className="min-h-screen py-20 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-4">
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              LET'S CREATE
            </span>
          </h2>
          <h2 className="text-5xl md:text-7xl font-black text-white">
            TOGETHER
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <p className="text-xl text-gray-300 leading-relaxed">
              Have a project in mind? Want to collaborate? Or just want to say hi? 
              I'm always open to discussing new opportunities and interesting ideas.
            </p>

            <div className="space-y-6">
              {[
                { label: 'Email', value: 'gikonyohenrychochu@gmail.com', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
                { label: 'Location', value: 'Nairobi, Kenya', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
                { label: 'Phone', value: '+254 754 106 234', icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' }
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">{item.label}</div>
                    <div className="text-white font-semibold">{item.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 pt-8">
              {['GitHub', 'LinkedIn', 'Twitter', 'Dribbble'].map((social, i) => (
                <motion.a
                  key={social}
                  href="#"
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  data-hoverable="true"
                >
                  <span className="text-xs font-bold">{social[0]}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            onMouseMove={handleMouseMove}
            className="relative p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                background: useTransform(
                  [mouseX, mouseY],
                  ([latestX, latestY]) => `radial-gradient(600px circle at ${latestX + 200}px ${latestY + 100}px, rgba(168, 85, 247, 0.4), transparent 40%)`
                )
              }}
            />

            <div className="relative space-y-6">
              <div>
                <label className="block text-gray-300 mb-2 text-sm">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={status !== 'idle'}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-bold disabled:opacity-50"
                whileHover={{ scale: status === 'idle' ? 1.02 : 1 }}
                whileTap={{ scale: status === 'idle' ? 0.98 : 1 }}
                data-hoverable="true"
              >
                {status === 'idle' && 'Send Message'}
                {status === 'submitting' && (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </span>
                )}
                {status === 'success' && (
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Message Sent!
                  </span>
                )}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

// =============================================================================
// COMPONENT: Main App
// Description: Root component assembling all sections.
// =============================================================================
export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  const handleNavigate = (section) => {
    setActiveSection(section);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white overflow-x-hidden">
      <InteractiveBackground />
      <CustomCursor />
      <NavigationOrb activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main>
        <HeroSection onNavigate={handleNavigate} />
        <WorkSection />
        <AboutSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Henry Chochu Gikonyo. Crafted with passion.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
