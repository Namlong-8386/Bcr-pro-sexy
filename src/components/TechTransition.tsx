import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface TechTransitionProps {
  children: ReactNode;
}

export function TechTransition({ children }: TechTransitionProps) {
  return (
    <div className="relative w-full h-full">
      {/* The actual content */}
      <motion.div
        initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
      >
        {children}
      </motion.div>

      {/* High-Tech Transition Overlays */}
      
      {/* 1. Main Sweep Beam */}
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ 
          scaleY: [0, 1, 1, 0], 
          opacity: [0, 0.8, 0.8, 0],
          y: ['-100%', '0%', '0%', '100%'] 
        }}
        transition={{ duration: 0.8, times: [0, 0.4, 0.6, 1], ease: "easeInOut" }}
        className="fixed inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent pointer-events-none z-[100] backdrop-blur-[2px] border-y border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.5)]"
      />

      {/* 2. Digital Glitch Artifacts (Randomly flickering boxes) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0, 1, 0] }}
        transition={{ duration: 0.6, times: [0, 0.1, 0.2, 0.3, 0.4] }}
        className="fixed inset-0 z-[110] pointer-events-none"
      >
        <div className="absolute top-[10%] left-[20%] w-32 h-1 bg-cyan-400 shadow-[0_0_10px_cyan]" />
        <div className="absolute top-[80%] right-[15%] w-48 h-[1px] bg-cyan-400 shadow-[0_0_10px_cyan]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[1px] bg-cyan-400/30" />
      </motion.div>

      {/* 3. Scanning Data Text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -10] }}
        transition={{ duration: 0.8, times: [0, 0.3, 0.7, 1] }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[120] pointer-events-none text-center"
      >
        <div className="text-cyan-400 font-mono text-[10px] tracking-[1.5em] uppercase mb-2 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
          TRANSITIONING_MODULE
        </div>
        <div className="flex gap-1 justify-center">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0.2 }}
              animate={{ scaleY: [0.2, 1, 0.2] }}
              transition={{ duration: 0.4, repeat: 2, delay: i * 0.05 }}
              className="w-1 h-3 bg-cyan-500"
            />
          ))}
        </div>
      </motion.div>

      {/* 4. Peripheral HUD Flashes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-[90] pointer-events-none border-[20px] border-cyan-500/5 mix-blend-screen"
      />
    </div>
  );
}
