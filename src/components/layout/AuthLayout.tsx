import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#010308] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-mono text-cyan-500 selection:bg-cyan-500/30">
      {/* Dynamic Cyber Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Core Glow & Grid Overlay */}
        <div className="absolute w-[1200px] h-[1200px] bg-cyan-900/10 blur-[150px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_90%)]" />
        
        {/* Dotted Grid Micro-Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(6,182,212,0.15)_1px,transparent_1px)] bg-[size:8px_8px] [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black_80%)] opacity-40" />

        {/* Honeycomb / Hexagon Overlay */}
        <div className="absolute inset-0 opacity-[0.02] flex items-center justify-center scale-150 mix-blend-overlay">
           <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
             <defs>
               <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                 <path d="M25,0 L50,14.4 L50,43.4 L25,28.8 L0,43.4 L0,14.4 L25,0 Z M25,14.4 L25,43.4 M0,28.8 L25,14.4 M50,28.8 L25,14.4" fill="none" stroke="currentColor" strokeWidth="1" className="text-cyan-500" />
               </pattern>
             </defs>
             <rect width="100%" height="100%" fill="url(#hexagons)" />
           </svg>
        </div>

        {/* Radar Rings & Data Circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[400px] border border-cyan-500/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] border border-cyan-500/10 rounded-full flex items-center justify-center">
            <div className="absolute right-0 top-1/2 w-4 h-1 bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
            <div className="absolute left-0 top-1/2 w-4 h-1 bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[800px] border border-dashed border-cyan-500/15 rounded-full animate-[spin_120s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[1000px] border border-cyan-500/5 rounded-full opacity-50" />
        
        {/* Circular Targeting Overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[1200px] opacity-10 animate-[spin_200s_linear_infinite_reverse]">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-cyan-400 stroke-[0.1]">
                <circle cx="50" cy="50" r="48" strokeDasharray="2 4" />
                <circle cx="50" cy="50" r="45" strokeDasharray="1 10" />
                <path d="M50 0 L50 4 M50 96 L50 100 M0 50 L4 50 M96 50 L100 50" strokeWidth="0.5" />
            </svg>
        </div>

        {/* Tech Lines & Rulers */}
        <div className="absolute top-[5%] left-10 w-[1px] h-[90%] bg-gradient-to-b from-transparent via-cyan-500/40 to-transparent flex flex-col justify-between items-center py-20">
            <div className="w-1.5 h-8 bg-cyan-400/80 shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
            <div className="w-1 h-4 bg-cyan-500/30" />
            <div className="w-2 h-[2px] bg-cyan-400" />
            <div className="w-1 h-12 bg-cyan-500/40" />
        </div>
        <div className="absolute top-[5%] right-10 w-[1px] h-[90%] bg-gradient-to-b from-transparent via-cyan-500/40 to-transparent flex flex-col justify-between items-center py-32">
            <div className="w-2 h-[2px] bg-cyan-400" />
            <div className="w-1 h-4 bg-cyan-500/30" />
            <div className="w-1 h-16 bg-cyan-500/20" />
            <div className="w-1.5 h-6 bg-cyan-400/80 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
        </div>
        <div className="absolute top-10 left-[10%] w-[80%] h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent flex justify-between items-center px-32">
            <div className="w-8 h-1.5 bg-cyan-400/50" />
            <div className="w-4 h-1 bg-cyan-500/30" />
        </div>
        <div className="absolute bottom-10 left-[10%] w-[80%] h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
        
        {/* Scanning Beam */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-cyan-500/0 via-cyan-500/[0.08] to-cyan-400/0 animate-[scan_4s_ease-in-out_infinite]" />
        
        {/* Floating Data Particles & Circuit Lines */}
        <div className="absolute top-1/4 left-1/4 size-1 bg-cyan-400 rounded-full animate-ping opacity-50" />
        <div className="absolute top-3/4 right-1/4 size-1.5 bg-cyan-300 rounded-full animate-ping opacity-70" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-1/3 size-1 bg-blue-400 rounded-full animate-ping opacity-40" style={{ animationDelay: '2s' }} />

        {/* Animated Circuit Path */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
          <path d="M 0 100 L 100 100 L 150 150 L 300 150" stroke="currentColor" fill="none" strokeWidth="0.5" className="text-cyan-500" strokeDasharray="5,5" />
          <path d="M 100% 200 L calc(100% - 100px) 200 L calc(100% - 150px) 250" stroke="currentColor" fill="none" strokeWidth="0.5" className="text-cyan-500" strokeDasharray="5,5" />
        </svg>

        {/* Viewport Crosshairs & Brackets */}
        <div className="absolute top-20 left-20 size-16 border-t-2 border-l-2 border-cyan-500/50 opacity-80 flex">
           <div className="w-full h-px bg-cyan-400/50 mt-2" />
           <div className="w-px h-full bg-cyan-400/50 ml-2 absolute" />
           <div className="absolute top-0 left-0 w-4 h-4 bg-cyan-500/20 mix-blend-screen" />
        </div>
        <div className="absolute top-20 right-20 size-16 border-t-2 border-r-2 border-cyan-500/50 opacity-80 flex justify-end">
           <div className="w-full h-px bg-cyan-400/50 mt-2" />
           <div className="w-px h-full bg-cyan-400/50 mr-2 absolute right-0" />
        </div>
        <div className="absolute bottom-20 left-20 size-16 border-b-2 border-l-2 border-cyan-500/50 opacity-80 flex items-end">
           <div className="w-full h-px bg-cyan-400/50 mb-2" />
           <div className="w-px h-full bg-cyan-400/50 ml-2 absolute bottom-0" />
        </div>
        <div className="absolute bottom-20 right-20 size-16 border-b-2 border-r-2 border-cyan-500/50 opacity-80 flex justify-end items-end">
           <div className="w-full h-px bg-cyan-400/50 mb-2" />
           <div className="w-px h-full bg-cyan-400/50 mr-2 absolute bottom-0 right-0" />
           <div className="w-4 h-4 border-b border-r border-cyan-300 absolute bottom-2 right-2 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
        </div>
      </div>
      
      {/* Decorative HUD Elements - Top Left */}
      <div className="absolute top-12 left-14 font-mono text-[9px] uppercase tracking-[0.3em] hidden md:flex flex-col gap-2 z-0">
        <div className="flex animate-pulse items-center gap-3 mb-4">
           <div className="size-2 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] relative">
              <div className="absolute inset-0 animate-ping bg-red-400 opacity-50" />
           </div>
           <span className="text-red-400 font-bold border border-red-500/30 px-3 py-1 bg-red-950/30 shadow-[inset_0_0_10px_rgba(239,68,68,0.2)]">WARNING: UNAUTHORIZED SECTOR</span>
        </div>
        <div className="flex items-center gap-2 text-cyan-500/60 w-56">
           <span>SYS_INIT</span>
           <div className="flex-1 h-[1px] bg-[linear-gradient(90deg,currentColor_50%,transparent_50%)] bg-[size:4px_1px]" />
           <span className="text-cyan-300 font-bold">[ OK ]</span>
        </div>
        <div className="flex items-center gap-2 text-cyan-500/80 w-56">
           <span>CORE_OVR</span>
           <div className="flex-1 h-[1px] bg-[linear-gradient(90deg,currentColor_50%,transparent_50%)] bg-[size:4px_1px]" />
           <span className="text-cyan-200 animate-pulse">WAITING</span>
        </div>
        <div className="flex items-center gap-2 text-cyan-500/60 w-56">
           <span>SEC_LVL</span>
           <div className="flex-1 h-[1px] bg-[linear-gradient(90deg,currentColor_50%,transparent_50%)] bg-[size:4px_1px]" />
           <span>ALPH_9</span>
         </div>
         <div className="flex items-center gap-2 text-cyan-500/40 w-56">
           <span>UPLINK</span>
           <div className="flex-1 h-[1px] bg-[linear-gradient(90deg,currentColor_50%,transparent_50%)] bg-[size:4px_1px]" />
           <span className="animate-pulse">STABLE</span>
         </div>
        <div className="mt-4 text-cyan-500/50 text-[8px] bg-cyan-950/40 p-3 inline-block border-l-2 border-cyan-500 relative shadow-[0_0_15px_rgba(6,182,212,0.1)]">
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500/50" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/50" />
          DATA_STREAM: <span className="text-cyan-300">{Array.from({length: 8}, () => Math.floor(Math.random()*2).toString()).join('')}</span><br/>
          MEM_ALLOC: <span className="text-cyan-300">4096TB</span><br/>
          PROTO: AI_SEX_V4.0
        </div>
      </div>
      
      {/* Decorative HUD Elements - Bottom Right */}
      <div className="absolute bottom-12 right-14 font-mono text-[9px] text-right uppercase tracking-[0.3em] hidden md:flex flex-col items-end gap-2 z-0">
        <div className="flex gap-4 items-end mb-2">
            <div className="flex flex-col gap-1.5 items-end opacity-60">
                <div className="w-20 h-[2px] bg-cyan-500 shadow-[0_0_5px_rgba(6,182,212,0.8)]" />
                <div className="w-10 h-[2px] bg-cyan-500 shadow-[0_0_5px_rgba(6,182,212,0.8)]" />
                <div className="w-16 h-[2px] bg-cyan-500 shadow-[0_0_5px_rgba(6,182,212,0.8)]" />
            </div>
            <p className="text-cyan-400/70">S-TIME: <span className="text-cyan-200">{new Date().toISOString().split('T')[1].slice(0,-1)}Z</span></p>
        </div>
        
        <p className="text-cyan-500/50">LATENCY: <span className="text-cyan-300">14.02ms (OPTIMAL)</span></p>
        <p className="text-cyan-500/50">UPLINK_HASH: <span className="text-cyan-400">0x9FA...B8C</span></p>
        
        <div className="flex items-center gap-3 mt-4 border border-emerald-500/40 p-2.5 bg-emerald-950/20 shadow-[inset_0_0_15px_rgba(16,185,129,0.15)] relative">
           <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-emerald-400" />
           <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-emerald-400" />
           <span className="text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)] flex items-center gap-2 font-bold">
               <div className="size-2 bg-emerald-400 rounded-full animate-pulse" />
               LINK_SECURE
           </span>
        </div>
        
        {/* Fake Barcode / Spectrum Analyzer */}
        <div className="flex gap-[3px] h-10 mt-6 opacity-70">
           {[...Array(35)].map((_, i) => (
             <div key={i} className="bg-cyan-500/80 w-0.5 relative overflow-hidden" style={{ height: `${Math.random() * 70 + 30}%` }}>
                {Math.random() > 0.6 && <div className="absolute bottom-0 w-full h-1.5 bg-white shadow-[0_0_5px_white]" />}
             </div>
           ))}
        </div>
      </div>
      
      <div className="relative z-10 w-full max-w-md mx-auto">
        <Outlet />
      </div>
    </div>
  );
}
