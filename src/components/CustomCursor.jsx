import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [positions, setPositions] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [disabled] = useState(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    return prefersReduced || isTouch;
  });

  useEffect(() => {
    if (disabled) return;

    let rafId;
    let currentPositions = [];

    const handleMouseMove = (e) => {
      currentPositions = [
        ...currentPositions.slice(-10),
        { x: e.clientX, y: e.clientY, id: Date.now() + Math.random() },
      ];
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setPositions(currentPositions);
      });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e) => {
      const target = e.target;
      setIsHovering(
        target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          !!target.closest("a") ||
          !!target.closest("button") ||
          !!target.closest("[data-hoverable]"),
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [disabled]);

  if (disabled) return null;

  return (
    <>
      {positions.map((pos, i) => (
        <motion.div
          key={pos.id}
          className="fixed w-2 h-2 rounded-full pointer-events-none z-50"
          style={{
            left: pos.x,
            top: pos.y,
            background: `hsla(${45 + i * 2}, 80%, ${55 - (i / positions.length) * 20}%, ${(i / positions.length) * 0.4})`,
          }}
          initial={{ scale: 1, opacity: 0.4 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      ))}
      <motion.div
        className="fixed w-8 h-8 border border-gold-400 rounded-full pointer-events-none z-50"
        animate={{
          scale: isHovering ? 2.5 : isVisible ? 1 : 0,
          rotate: isHovering ? 45 : 0,
          opacity: isVisible ? 0.6 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          x: positions[positions.length - 1]?.x - 16 || 0,
          y: positions[positions.length - 1]?.y - 16 || 0,
        }}
      />
    </>
  );
};

export default CustomCursor;
