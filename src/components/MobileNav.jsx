import { motion } from "framer-motion";

const sections = [
  { id: "home", label: "Home", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { id: "work", label: "Work", icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { id: "about", label: "About", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
  { id: "contact", label: "Contact", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
];

const MobileNav = ({ activeSection, setActiveSection }) => {
  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-black/80 backdrop-blur-lg border-t border-gold-500/20"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
    >
      <div className="flex justify-around items-center h-16 px-2">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <motion.button
              key={section.id}
              onClick={() => {
                setActiveSection(section.id);
                document
                  .getElementById(section.id)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex flex-col items-center justify-center gap-0.5 py-1 px-3 rounded-lg min-w-0"
              whileTap={{ scale: 0.9 }}
              data-hoverable="true"
            >
              <svg
                className={`w-5 h-5 ${isActive ? "text-gold-400" : "text-gray-500"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={section.icon}
                />
              </svg>
              <span
                className={`text-[10px] font-medium ${isActive ? "text-gold-400" : "text-gray-500"}`}
              >
                {section.label}
              </span>
              {isActive && (
                <motion.div
                  className="absolute -top-0.5 w-8 h-0.5 bg-gold-500 rounded-full"
                  layoutId="mobileNavIndicator"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default MobileNav;
