import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Facebook, Send, Phone, X, Headphones, MessageSquareText } from 'lucide-react';
import { cn } from '../lib/utils';

export function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const supportLinks = [
    {
      name: 'ZALO_NODE',
      icon: <Phone className="size-3.5" />,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      shadow: 'shadow-[inset_0_0_10px_rgba(59,130,246,0.2)]',
      url: '#'
    },
    {
      name: 'FB_MESSENGER',
      icon: <Facebook className="size-3.5" />,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/30',
      shadow: 'shadow-[inset_0_0_10px_rgba(99,102,241,0.2)]',
      url: '#'
    },
    {
      name: 'TERMNL_TG',
      icon: <Send className="size-3.5" />,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/30',
      shadow: 'shadow-[inset_0_0_10px_rgba(6,182,212,0.2)]',
      url: '#'
    }
  ];

  return (
    <div className="fixed bottom-6 lg:bottom-10 right-6 lg:right-10 z-[100] flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, height: 'auto', filter: 'blur(0px)' }}
            exit={{ opacity: 0, height: 0, filter: 'blur(10px)', transition: { duration: 0.2 } }}
            className="flex flex-col gap-3 items-end mb-2 relative"
          >
            {/* HUD Connecting Line */}
            <div className="absolute right-[27px] bottom-[-20px] w-px h-[calc(100%+20px)] bg-gradient-to-t from-cyan-500 to-transparent opacity-30 z-[-1]" />
            
            {supportLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.9 }}
                transition={{ delay: (supportLinks.length - 1 - index) * 0.1, type: "spring", stiffness: 200 }}
                className={cn(
                  "flex items-center gap-0 group backdrop-blur-md relative",
                  "transition-all hover:-translate-x-2 w-auto justify-end"
                )}
              >
                <div className="bg-[#020617]/95 border border-cyan-500/30 p-2 pl-4 pr-3 flex items-center justify-between gap-4 [clip-path:polygon(10px_0,100%_0,100%_100%,0_100%,0_10px)] relative overflow-hidden group-hover:bg-cyan-950/40 group-hover:border-cyan-400 transition-colors">
                  {/* Scanning line effect */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400 opacity-0 group-hover:opacity-100 group-hover:animate-[scan_1.5s_ease-in-out_infinite]" />
                  
                  <div className="flex flex-col items-start pr-2">
                    <span className="font-mono text-[8.5px] text-cyan-600 uppercase tracking-[0.2em] leading-none mb-1">
                      [SYS.UPLINK]
                    </span>
                    <span className={cn("font-mono text-sm font-bold uppercase tracking-widest whitespace-nowrap drop-shadow-md", link.color)}>
                      {link.name}
                    </span>
                  </div>
                  <div className={cn(
                    "p-2 flex items-center justify-center [clip-path:polygon(5px_0,100%_0,100%_calc(100%-5px),calc(100%-5px)_100%,0_100%,0_5px)] border border-cyan-500/20",
                    link.bg, link.color, link.shadow
                  )}>
                    {link.icon}
                  </div>
                </div>
                {/* Connecting node dot */}
                <div className="w-6 h-px bg-cyan-500/50 relative">
                   <div className="absolute right-0 top-1/2 -translate-y-1/2 size-[3px] bg-cyan-400 group-hover:bg-white shadow-[0_0_5px_rgba(6,182,212,1)]" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div className="relative">
        {/* Outer Rotating HUD Ring */}
        <div className={cn(
          "absolute -inset-2 border border-dashed border-cyan-500/50 rounded-full pointer-events-none transition-all duration-1000",
          isOpen ? "animate-[spin_4s_linear_infinite] opacity-100" : "opacity-0"
        )} />
        <div className={cn(
          "absolute -inset-1 border border-cyan-500/30 rounded-full pointer-events-none transition-all duration-700",
          isOpen ? "animate-[spin_3s_linear_infinite_reverse] opacity-100" : "opacity-0 scale-75"
        )} />
        
        <motion.button
          onClick={toggleOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="size-14 rounded-full bg-[#020617] border-[1.5px] border-cyan-400 text-cyan-400 flex items-center justify-center shadow-[inset_0_0_15px_rgba(6,182,212,0.5),0_0_15px_rgba(6,182,212,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.8)] hover:bg-cyan-950/50 relative group transition-all"
        >
          {/* Inner glow on hover */}
          <div className="absolute inset-0 rounded-full bg-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="relative z-10"
              >
                <X className="size-6 text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="relative z-10 flex flex-col items-center justify-center"
              >
                <Headphones className="size-6 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulse effect when closed */}
          {!isOpen && (
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping opacity-40" />
          )}
        </motion.button>
      </motion.div>
    </div>
  );
}
