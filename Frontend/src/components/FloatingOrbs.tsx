import { motion } from "framer-motion";

export function FloatingOrbs() {
  const orbs = [
    { size: 300, x: "10%", y: "20%", color: "oklch(0.55 0.22 290 / 15%)", delay: 0 },
    { size: 200, x: "70%", y: "60%", color: "oklch(0.78 0.15 200 / 12%)", delay: 2 },
    { size: 250, x: "80%", y: "10%", color: "oklch(0.55 0.22 290 / 10%)", delay: 4 },
    { size: 180, x: "20%", y: "70%", color: "oklch(0.8 0.25 155 / 8%)", delay: 1 },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            filter: "blur(40px)",
          }}
          animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, delay: orb.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
