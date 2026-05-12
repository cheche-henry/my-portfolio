import { motion } from "framer-motion";

const sections = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const NavigationOrb = ({ activeSection, setActiveSection }) => {
  return (
    <motion.nav
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:block"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 1, type: "spring", stiffness: 100 }}
    >
      <div className="relative flex flex-col items-center">
        <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-gold-500 to-amber-600 opacity-20" />
        {sections.map((section) => (
          <motion.button
            key={section.id}
            onClick={() => {
              setActiveSection(section.id);
              document.getElementById(section.id)?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="block w-3 h-3 rounded-full mb-4 relative group"
            style={{
              background:
                activeSection === section.id
                  ? "linear-gradient(135deg, #FFD700, #DAA520)"
                  : "rgba(255,255,255,0.25)",
            }}
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.8 }}
            data-hoverable="true"
          >
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gold-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap capitalize font-medium">
              {section.label}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
};

export default NavigationOrb;
