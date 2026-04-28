import { useState, useEffect } from 'react';
import { useAuth } from '@/src/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, Lock, Play, Square, Settings2, RotateCcw, 
  BarChart3, RefreshCw, Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

export function Tool() {
  const { user } = useAuth();
  const [isRunning, setIsRunning] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [history, setHistory] = useState<('P' | 'B' | 'T')[]>([]); // Player, Banker, Tie
  const [prediction, setPrediction] = useState<{ result: 'P' | 'B' | 'T', confidence: number } | null>(null);

  const toggleModule = async (targetState: boolean) => {
    setIsTransitioning(true);
    // Giả lập thời gian nạp giao thức hoặc ngắt kết nối
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRunning(targetState);
    if (!targetState) setPrediction(null);
    setIsTransitioning(false);
  };

  // Giả lập nhận kết quả real-time khi tool chạy
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        // Random kết quả cho demo
        const rand = Math.random();
        const res = rand < 0.45 ? 'B' : rand < 0.9 ? 'P' : 'T';
        setHistory(prev => [...prev.slice(-39), res]); // Lưu tối đa 40 ván gần nhất

        // Render dự đoán mới
        setTimeout(() => {
          setPrediction({
            result: Math.random() > 0.5 ? 'B' : 'P',
            confidence: Math.floor(Math.random() * 20) + 75 // 75-95%
          });
        }, 1000);

      }, 4000); // Mỗi 4s có kết quả mới
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  if (!user || user.plan === 'free') {
    return (
      <div className="max-w-2xl mx-auto mt-20 text-center relative">
        <div className="absolute inset-0 bg-red-500/5 blur-[100px] rounded-full" />
        <div className="size-24 bg-[#030712] rounded-none flex items-center justify-center mx-auto mb-6 border border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.2)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-red-500/10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute top-0 w-full h-[1px] bg-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-[scan_2s_ease-in-out_infinite]" />
          <Lock className="size-10 text-red-500 relative z-10 drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]" />
        </div>
        <h2 className="text-3xl font-mono font-bold text-red-500 mb-4 uppercase tracking-widest text-shadow-glow">Access Denied</h2>
        <p className="text-cyan-50/60 font-mono mb-8 max-w-md mx-auto uppercase tracking-widest text-sm">
          Core AI Module requires elevated clearance. Purchase system credits to decode signal pattern strings.
        </p>
        <Link to="/dashboard/buy-credit">
          <Button variant="danger" className="h-12 px-8 text-base shadow-[0_0_30px_rgba(239,68,68,0.3)] font-mono">
            ACQUIRE_ACCESS_CREDITS
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:h-[calc(100vh-8rem)]">
      {/* Cột trái: Cấu hình và Control */}
      <div className="space-y-6 flex flex-col">
        <div className="relative bg-[#020617]/80 border border-cyan-500/30 shadow-[inset_0_0_20px_rgba(6,182,212,0.05)] [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)]">
          <div className="absolute top-0 inset-x-0 h-1 bg-cyan-500/20" />
          <div className="p-4 border-b border-cyan-500/20 bg-cyan-950/20">
            <h3 className="text-sm font-bold flex items-center gap-2 text-cyan-400 font-mono tracking-widest uppercase">
              <Settings2 className="size-4 text-cyan-400" /> SIGNAL FILTERS
            </h3>
          </div>
          <div className="p-6 space-y-5">
            <div>
              <div className="flex justify-between items-center mb-2">
                 <p className="text-[9px] text-cyan-400/80 uppercase font-mono tracking-[0.2em] flex items-center gap-1"><span className="text-cyan-500">◈</span> MIN_CONFIDENCE_THRESHOLD</p>
                 <span className="text-[10px] text-cyan-300 font-mono font-bold bg-cyan-950/50 px-1 border border-cyan-900/50">85%</span>
              </div>
              <div className="h-2.5 bg-[#010308] rounded-none overflow-hidden border border-cyan-900/80 group shadow-[inset_0_0_5px_rgba(0,0,0,1)] relative">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_50%,rgba(255,255,255,0.05)_50%)] bg-[length:4px_100%] pointer-events-none z-10" />
                <div className="w-[85%] h-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)] relative">
                   <div className="absolute top-0 right-0 w-2 h-full bg-white/80 animate-[scan_2s_ease-in-out_infinite]" />
                   <div className="absolute top-0 right-0 w-[1px] h-full bg-white shadow-[0_0_5px_white]" />
                </div>
              </div>
              <div className="flex justify-between mt-1 text-[8px] text-cyan-600 font-mono uppercase tracking-[0.3em]">
                <div className="flex flex-col">
                  <span>LV_MIN</span>
                  <span className="text-[6px] opacity-50">STABLE_CORE</span>
                </div>
                <div className="flex flex-col items-end">
                  <span>LV_MAX</span>
                  <span className="text-[6px] opacity-50">OVERDRIVE</span>
                </div>
              </div>
            </div>
            
            <div className="pt-2">
              <p className="text-[9px] text-cyan-400/80 mb-2 uppercase font-mono tracking-[0.2em] flex items-center gap-1"><span className="text-cyan-500">◈</span> MODEL_ALGORITHM</p>
              <div className="grid grid-cols-2 gap-3 relative">
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-[2px] h-full bg-cyan-900/50" />
                <button className="py-2.5 px-3 rounded-none text-[9px] uppercase font-mono tracking-[0.2em] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-400/50 shadow-[inset_0_0_15px_rgba(6,182,212,0.2),0_0_10px_rgba(6,182,212,0.1)] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(6,182,212,0.1)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] group-hover:animate-[scan_2s_linear_infinite]" />
                  <span className="relative z-10 flex items-center justify-center gap-1"><span className="text-cyan-400">●</span> DEEP_CHAIN</span>
                </button>
                <button className="py-2.5 px-3 rounded-none text-[9px] uppercase font-mono tracking-[0.2em] font-bold bg-[#010308] text-cyan-700 border border-cyan-900 hover:text-cyan-400 hover:border-cyan-700 transition-colors flex items-center justify-center gap-1">
                  <span>○</span> FAST_HEURISTIC
                </button>
              </div>
            </div>
            
            <div className="pt-5 mt-2 border-t border-cyan-900/50 relative">
               <div className="absolute top-0 right-0 w-12 h-[1px] bg-cyan-500 shadow-[0_0_5px_rgba(6,182,212,1)]" />
               <div className="flex items-center justify-between">
                 <span className="text-[10px] tracking-[0.2em] font-mono font-bold uppercase text-cyan-400 flex items-center gap-2">
                     AUTO_SYNC_DATA <span className="text-cyan-600 text-[8px] border border-cyan-900/50 px-1">ON</span>
                 </span>
                 <div className="w-12 h-5 bg-cyan-500 rounded-none relative cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:bg-cyan-400 transition-colors border border-cyan-400">
                   <div className="absolute right-0.5 top-0.5 size-3.5 bg-[#010308] rounded-none shadow-[-2px_0_5px_rgba(0,0,0,0.5)] border border-cyan-400/50 flex items-center justify-center">
                       <div className="w-0.5 h-1.5 bg-cyan-500" />
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>

        <div className="relative bg-[#020617]/90 border border-cyan-500/30 overflow-hidden shadow-2xl shadow-[inset_0_0_30px_rgba(6,182,212,0.05)] [clip-path:polygon(0_0,calc(100%-20px)_0,100%_20px,100%_100%,20px_100%,0_calc(100%-20px))]">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/5 translate-x-1/3 -translate-y-1/3 rounded-full blur-[80px] pointer-events-none" />
          <div className="p-6 relative z-10 flex flex-col items-center justify-center space-y-4 text-center">
             <div className="size-20 bg-[#061026] rounded-none flex items-center justify-center border border-cyan-500/50 mb-2 relative shadow-[0_0_20px_rgba(6,182,212,0.2)] [clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]">
               {(isRunning || isTransitioning) && (
                 <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-none h-3 w-3 bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"></span>
                  </span>
               )}
               <ShieldAlert className={cn(
                 "size-10 transition-colors relative z-10",
                 isTransitioning ? "text-cyan-600 animate-pulse" :
                 isRunning ? "text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" : "text-cyan-900"
               )} />
               {(isRunning || isTransitioning) && <div className="absolute inset-0 bg-cyan-500/10 animate-pulse" />}
             </div>
             
             <div>
               <h3 className={cn("text-lg font-mono font-black mb-1 tracking-widest uppercase", isRunning && !isTransitioning ? "text-cyan-400 text-shadow-glow" : "text-cyan-900")}>
                 {isTransitioning ? '> TRANSITIONING...' : isRunning ? '> MODULE_ACTIVE' : '> MODULE_OFFLINE'}
               </h3>
               <p className="text-[10px] tracking-widest text-cyan-400/50 font-mono uppercase mt-2 border-l-2 border-cyan-900/50 pl-2">
                 {isTransitioning ? 'CONFIGUARING_NEURAL_LAYERS...' : isRunning ? 'SCANNING_&_DECODING_LIVE_SIGNALS...' : 'INITIALIZE_NEURAL_PROCESSING_CORE'}
               </p>
             </div>

             <div className="w-full grid grid-cols-2 gap-3 mt-4">
               {!isRunning ? (
                 <Button 
                    variant="glow"
                    className="col-span-2 h-16 tracking-[0.3em] uppercase font-black [clip-path:polygon(15px_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%,0_15px)] text-sm shadow-[0_0_30px_rgba(6,182,212,0.3)] group relative overflow-hidden" 
                    onClick={() => toggleModule(true)}
                    disabled={isTransitioning}
                  >
                   <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] group-hover:animate-[scan_2s_linear_infinite]" />
                   <span className="relative z-10 flex items-center gap-3">
                     {isTransitioning ? (
                       <RefreshCw className="size-5 animate-spin" />
                     ) : (
                       <Play className="size-5" />
                     )}
                     {isTransitioning ? 'INITIALIZING...' : 'INITIALIZE_MODULE'}
                   </span>
                 </Button>
               ) : (
                 <>
                   <Button 
                      variant="outline"
                      className="h-12 tracking-widest uppercase text-[10px] border-cyan-800 text-cyan-400 hover:bg-cyan-900/30" 
                      onClick={() => setHistory([])}
                      disabled={isTransitioning}
                    >
                     <RotateCcw className="size-4 mr-2" /> FLUSH_DATA
                   </Button>
                   <Button 
                      variant="danger"
                      className="h-12 tracking-widest uppercase text-[10px] font-bold shadow-[0_0_15px_rgba(239,68,68,0.3)] [clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]" 
                      onClick={() => toggleModule(false)}
                      disabled={isTransitioning}
                    >
                     {isTransitioning ? (
                       <RefreshCw className="size-4 mr-2 animate-spin" />
                     ) : (
                       <Square className="size-4 mr-2 fill-current" />
                     )}
                     {isTransitioning ? 'HALTING...' : 'HALT_PROCESS'}
                   </Button>
                 </>
               )}
             </div>
          </div>
        </div>
      </div>

      {/* Cột phải: Màn hình chính */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        
        {/* Kết quả Tool Dự Đoán */}
        <div className="flex-1 bg-black/60 border border-cyan-500/30 shadow-2xl overflow-hidden relative flex flex-col justify-center min-h-[300px] [clip-path:polygon(0_0,calc(100%-30px)_0,100%_30px,100%_100%,30px_100%,0_calc(100%-30px))] group">
           {/* Background effects */}
           <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-500/0 via-cyan-400 to-cyan-500/0 opacity-50" />
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.2] saturate-0 mix-blend-overlay pointer-events-none"></div>
           <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
           <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-cyan-950/40 to-transparent pointer-events-none"></div>

           {/* Corner accents */}
           <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-cyan-500/50" />
           <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-cyan-500/50" />
           <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-cyan-500/50" />
           <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-cyan-500/50" />
           
           {/* Scanline overlay */}
           <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-20 pointer-events-none bg-[length:100%_2px,3px_100%]" />

           <div className="absolute top-6 left-12 flex gap-3 z-10 bg-[#020617]/80 px-4 py-1 border border-cyan-900/50 backdrop-blur-sm [clip-path:polygon(0_0,calc(100%-10px)_0,100%_10px,100%_100%,10px_100%,0_calc(100%-10px))]">
             <div className="flex items-center gap-2">
               <div className={cn("size-2 rounded-none", isRunning ? "bg-cyan-500 animate-[pulse_1s_ease-in-out_infinite] shadow-[0_0_8px_rgba(6,182,212,1)]" : "bg-zinc-700")} />
               <span className="text-[10px] font-mono font-bold text-cyan-400 tracking-[0.2em] uppercase">SERVER_SECURE</span>
             </div>
           </div>

           <div className="absolute top-6 right-6 text-cyan-600 font-mono text-[8px] text-right pointer-events-none hidden sm:flex flex-col gap-1 items-end bg-[#020617]/50 p-2 border-r-2 border-cyan-900/50 backdrop-blur-sm">
              <p>HASH_RATE: <span className="text-cyan-400">489.2 TH/s</span></p>
              <p>LATENCY: <span className="text-cyan-400">12ms</span></p>
              <p>VAR_INDEX: <span className="text-cyan-400">+0.024</span></p>
           </div>

           <div className="absolute top-1/2 left-0 w-2 h-16 -translate-y-1/2 flex flex-col justify-between opacity-50 z-10">
             <div className="w-full h-[1px] bg-cyan-500" />
             <div className="w-1/2 h-[1px] bg-cyan-500" />
             <div className="w-full h-[1px] bg-cyan-500" />
           </div>
           <div className="absolute top-1/2 right-0 w-2 h-16 -translate-y-1/2 flex flex-col justify-between items-end opacity-50 z-10">
             <div className="w-full h-[1px] bg-cyan-500" />
             <div className="w-1/2 h-[1px] bg-cyan-500" />
             <div className="w-full h-[1px] bg-cyan-500" />
           </div>

           <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center pt-16">
             {!isRunning ? (
               <div className="opacity-30 relative">
                 <ShieldAlert className="size-24 text-cyan-800 mx-auto mb-4 drop-shadow-[0_0_15px_rgba(6,182,212,0.2)]" />
                 <p className="text-cyan-700 font-mono text-xs tracking-[0.3em] uppercase border-y border-cyan-900/30 py-2">WAITING_FOR_AI_SIGNAL</p>
               </div>
             ) : (
               <div className="w-full max-w-sm">
                 <h4 className="text-xs tracking-[0.2em] text-cyan-400 uppercase mb-8 flex items-center justify-center gap-2 drop-shadow-[0_0_5px_rgba(6,182,212,0.8)] border border-cyan-500/20 py-2 bg-cyan-950/20">
                   <RefreshCw className="size-4 animate-spin text-cyan-400" /> SYNCING_NEURAL_NET
                 </h4>
                 
                 <AnimatePresence mode="wait">
                   {prediction ? (
                     <motion.div
                       key="result"
                       initial={{ scale: 0.8, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1 }}
                       exit={{ scale: 1.1, opacity: 0 }}
                       className="space-y-6"
                     >
                       <div className="relative inline-block">
                         <div className={cn(
                           "absolute inset-0 blur-2xl opacity-60 rounded-full animate-pulse",
                           prediction.result === 'B' ? "bg-rose-600" : "bg-blue-600"
                         )}></div>
                         
                         {/* Target reticle decor */}
                         <div className="absolute -inset-4 border border-cyan-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
                         <div className="absolute -inset-8 border border-dashed border-cyan-500/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

                         <div className={cn(
                           "relative size-48 mx-auto rounded-none flex flex-col items-center justify-center border-4 shadow-[0_0_40px_rgba(0,0,0,0.5)] backdrop-blur-md [clip-path:polygon(20px_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%,0_20px)]",
                           prediction.result === 'B' 
                             ? "bg-rose-950/60 border-rose-500 text-rose-400 shadow-rose-500/40" 
                             : "bg-blue-950/60 border-blue-500 text-blue-400 shadow-blue-500/40"
                         )}>
                           <span className="absolute top-2 left-2 text-[8px] font-mono opacity-50">RES: {prediction.result}</span>
                           <span className="text-4xl font-mono font-black drop-shadow-[0_0_10px_currentColor] tracking-widest z-10">{prediction.result === 'B' ? 'BANKER' : 'PLAYER'}</span>
                           <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                         </div>
                       </div>
                       
                       <div className="bg-[#020617]/80 backdrop-blur border border-cyan-500/30 rounded-none p-4 shadow-[inset_0_0_15px_rgba(6,182,212,0.1)] relative">
                         <div className="absolute top-0 right-0 w-4 h-[1px] bg-cyan-400" />
                         <div className="absolute bottom-0 left-0 w-4 h-[1px] bg-cyan-400" />
                         <div className="flex justify-between items-center mb-2">
                           <span className="text-xs text-cyan-400/70 font-mono tracking-widest uppercase">AI_CONFIDENCE</span>
                           <span className="text-sm font-mono font-black text-cyan-400 drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]">{prediction.confidence}%</span>
                         </div>
                         <div className="h-2 bg-[#030712] rounded-none overflow-hidden border border-cyan-900/40 relative">
                           <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_50%,rgba(255,255,255,0.1)_50%)] bg-[length:4px_100%] pointer-events-none z-10" />
                           <div 
                             className={cn(
                               "h-full transition-all duration-1000 shadow-[0_0_10px_currentColor] relative",
                               prediction.result === 'B' ? "bg-rose-500" : "bg-blue-500"
                             )} 
                             style={{ width: `${prediction.confidence}%` }} 
                           >
                              <div className="absolute right-0 top-0 w-2 h-full bg-white/50" />
                           </div>
                         </div>
                       </div>
                     </motion.div>
                   ) : (
                     <motion.div
                       key="scanning"
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       className="space-y-6 py-12"
                     >
                       <div className="flex gap-2 justify-center items-end h-16">
                         <div className="w-1.5 h-6 bg-cyan-900 animate-[bounce_1s_infinite_0ms] rounded-none border border-cyan-800"></div>
                         <div className="w-1.5 h-10 bg-cyan-500/50 animate-[bounce_1s_infinite_200ms] rounded-none border border-cyan-400"></div>
                         <div className="w-2 h-16 bg-cyan-400 animate-[bounce_1s_infinite_400ms] rounded-none shadow-[0_0_15px_rgba(6,182,212,0.8)] border border-cyan-300"></div>
                         <div className="w-1.5 h-10 bg-cyan-500/50 animate-[bounce_1s_infinite_600ms] rounded-none border border-cyan-400"></div>
                         <div className="w-1.5 h-6 bg-cyan-900 animate-[bounce_1s_infinite_800ms] rounded-none border border-cyan-800"></div>
                       </div>
                       <p className="text-xs text-cyan-400 font-mono animate-pulse uppercase tracking-widest drop-shadow-[0_0_5px_rgba(6,182,212,0.8)] border-y border-cyan-900/50 py-2">ANALYZING_BLOCKS...</p>
                     </motion.div>
                   )}
                 </AnimatePresence>
               </div>
             )}
           </div>
        </div>

        {/* Lịch sử soi cầu */}
        <div className="h-48 bg-[#020617]/80 border border-cyan-500/30 overflow-hidden flex flex-col rounded-none shadow-[inset_0_0_20px_rgba(6,182,212,0.05)] [clip-path:polygon(0_0,100%_0,100%_100%,15px_100%,0_calc(100%-15px))] relative">
          <div className="absolute top-0 inset-x-0 h-[1px] bg-cyan-500/30" />
          <div className="py-2 px-4 border-b border-cyan-500/30 bg-cyan-950/20 flex flex-row items-center justify-between shrink-0 relative">
            <h3 className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-2 tracking-[0.2em] uppercase">
              <Layers className="size-4" /> BẢN_GHI_DATA
            </h3>
            <div className="flex items-center gap-4 text-[10px] uppercase font-mono text-cyan-400/80">
              <div className="flex items-center gap-1.5"><span className="size-2 bg-blue-500 inline-block shadow-[0_0_5px_rgba(59,130,246,0.8)]"/> Player</div>
              <div className="flex items-center gap-1.5"><span className="size-2 bg-rose-500 inline-block shadow-[0_0_5px_rgba(244,63,94,0.8)]"/> Banker</div>
              <div className="flex items-center gap-1.5"><span className="size-2 bg-green-500 inline-block shadow-[0_0_5px_rgba(34,197,94,0.8)]"/> Tie</div>
            </div>
          </div>
          <div className="p-4 flex-1 flex flex-col justify-end overflow-hidden">
            <div className="flex gap-1.5 flex-wrap flex-col-reverse max-h-full content-start border-l-2 border-b-2 border-cyan-900/50 p-2 relative shadow-[inset_0_0_10px_rgba(6,182,212,0.05)] bg-[#030712]/50">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0,transparent_100%)] pointer-events-none"></div>
              {/* Grid lines inside data box */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />
              
              {history.map((r, i) => (
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  key={i} 
                  className={cn(
                    "size-5 rounded-none flex items-center justify-center text-[10px] font-mono font-bold shrink-0 border border-[#030712] shadow-[0_0_5px_rgba(0,0,0,0.5)] z-10 relative",
                    r === 'B' ? "bg-rose-600 text-white shadow-[0_0_8px_rgba(244,63,94,0.6)]" : 
                    r === 'P' ? "bg-blue-600 text-white shadow-[0_0_8px_rgba(59,130,246,0.6)]" : "bg-green-600 text-white shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                  )}
                >
                  {r}
                  {i === history.length - 1 && (
                    <div className="absolute -inset-1 border border-white/50 animate-ping" />
                  )}
                </motion.div>
              ))}
              {history.length === 0 && (
                <div className="text-xs text-cyan-900 font-mono h-full flex items-center justify-center w-full uppercase tracking-widest z-10 animate-pulse">Awaiting Signal Sync...</div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
