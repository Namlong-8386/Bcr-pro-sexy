import { useAuth } from '@/src/context/AuthContext';
import { Card, CardContent } from '@/src/components/ui/Card';
import { ShieldCheck, Activity, Target, Zap, ShieldAlert, Cpu, User, Shield, Terminal, Globe, Lock, Wallet, Coins, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from '@/src/components/ui/Button';
import { AreaChart, Area, ResponsiveContainer, YAxis, Tooltip } from 'recharts';

export function Profile() {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="size-12 text-cyan-400 animate-spin" />
        <p className="font-mono text-cyan-500 text-xs tracking-[0.3em] uppercase animate-pulse">Initializing Neural Link...</p>
      </div>
    );
  }
  
  const balanceTrendData = [
    { day: '6d ago', value: 1200000 },
    { day: '5d ago', value: 1350000 },
    { day: '4d ago', value: 1100000 },
    { day: '3d ago', value: 1450000 },
    { day: '2d ago', value: 1300000 },
    { day: 'Yesterday', value: 1550000 },
    { day: 'Today', value: user?.balance || 1500000 },
  ];

  const stats = [
    { title: 'Tỉ Lệ Thắng AI', value: '89.5%', subtitle: '+2.4% tuần này', icon: Target, color: 'text-cyan-400 drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]', bg: 'bg-cyan-950/30 border-cyan-500/30' },
    { title: 'Phiên Dự Đoán', value: '1,248', subtitle: 'Hoạt động tốt', icon: Activity, color: 'text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.8)]', bg: 'bg-emerald-950/30 border-emerald-500/30' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 md:space-y-8 relative"
    >
      {/* Background Decorative Tech Layer */}
      <div className="absolute -top-10 -left-10 w-64 h-64 bg-cyan-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-80 h-80 bg-blue-500/5 blur-[120px] pointer-events-none" />

      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 relative z-10">
          <div className="relative group">
            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]">
               <div className="w-full h-1 bg-cyan-400 absolute top-0 shadow-[0_0_10px_rgba(6,182,212,1)] animate-[scan_3s_ease-in-out_infinite]" />
            </div>
            <div className="size-32 rounded-none border-2 border-cyan-500/50 p-1 bg-cyan-950/20 [clip-path:polygon(20%_0,100%_0,100%_80%,80%_100%,0_100%,0_20%)] relative">
              <div className="w-full h-full bg-zinc-900 flex items-center justify-center [clip-path:polygon(20%_0,100%_0,100%_80%,80%_100%,0_100%,0_20%)] overflow-hidden relative">
                <User className="size-16 text-cyan-500/30" />
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:10px_10px] opacity-30" />
              </div>
              <div className="absolute -top-1 -right-1 size-4 border-t-2 border-r-2 border-cyan-400" />
              <div className="absolute -bottom-1 -left-1 size-4 border-b-2 border-l-2 border-cyan-400" />
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase font-mono text-shadow-glow">
                {user?.username}
              </h2>
              <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[10px] tracking-widest uppercase inline-block self-center md:self-auto [clip-path:polygon(5px_0,100%_0,100%_calc(100%-5px),calc(100%-5px)_100%,0_100%,0_5px)] shadow-[0_0_10px_rgba(6,182,212,0.1)]">
                LEVEL_01_OPERATOR
              </div>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-xs font-mono text-cyan-600/80 uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><Shield className="size-3.5 text-cyan-500" /> ID: AIS-{user?.id?.slice(0, 8)}</span>
              <span className="flex items-center gap-1.5">● STATUS: <span className="text-emerald-500 animate-pulse">ACTIVE_UPLINK</span></span>
            </div>
          </div>
        </div>
        <Link to="/dashboard/buy-credit" className="relative group">
          <div className="absolute -inset-1 bg-cyan-500/20 blur-md group-hover:bg-cyan-500/30 transition-all opacity-0 group-hover:opacity-100" />
          <Button variant="glow" className="w-full md:w-auto font-black tracking-widest uppercase h-12 [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)]">
            <Coins className="size-4 mr-2" /> RECHARGE_CORE
          </Button>
        </Link>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              variants={itemVariants}
            >
              <div className="relative border border-cyan-500/30 bg-[#020617]/80 backdrop-blur-md [clip-path:polygon(20px_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%,0_20px)] p-6 shadow-[inset_0_0_30px_rgba(6,182,212,0.05)] group hover:bg-cyan-950/30 transition-colors">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="absolute top-2 right-2 flex gap-1">
                   <div className="w-1 h-1 bg-cyan-500/30 group-hover:bg-cyan-400 transition-colors" />
                   <div className="w-1 h-1 bg-cyan-500/30 group-hover:bg-cyan-400 transition-colors" />
                </div>
                <div className="absolute bottom-0 left-0 w-8 h-[2px] bg-cyan-500/30 group-hover:bg-cyan-400/80 transition-colors" />
                <div className="absolute bottom-0 left-0 w-[2px] h-8 bg-cyan-500/30 group-hover:bg-cyan-400/80 transition-colors" />
                
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 saturate-0 mix-blend-overlay pointer-events-none transition-opacity group-hover:opacity-20" />

                <div className="flex items-center justify-between relative z-10">
                  <div>
                    <p className="text-[10px] font-mono font-bold text-cyan-400/60 uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5">
                      <span className="text-cyan-400 text-[8px] animate-pulse">◈</span> {stat.title}
                    </p>
                    <h4 className="text-3xl font-black text-white tracking-tight leading-none mb-2 font-mono text-shadow-glow drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] group-hover:scale-105 transition-transform origin-left">{stat.value}</h4>
                    <p className="text-[9px] font-mono font-bold text-cyan-600 uppercase tracking-widest">[{stat.subtitle}]</p>
                  </div>
                  <div className={`size-14 rounded-none border border-cyan-500/30 ${stat.bg} flex items-center justify-center shadow-[inset_0_0_15px_rgba(6,182,212,0.15)] relative overflow-hidden [clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)] group-hover:border-cyan-400/80 transition-colors`}>
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-transparent animate-pulse" />
                    <Icon className={`size-6 ${stat.color} relative z-10 drop-shadow-[0_0_8px_currentColor]`} />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bento Layout for main content */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2">
          <div className="relative bg-[#020617]/80 border border-cyan-500/30 overflow-hidden h-full shadow-[inset_0_0_30px_rgba(6,182,212,0.05)] [clip-path:polygon(0_0,calc(100%-25px)_0,100%_25px,100%_100%,25px_100%,0_calc(100%-25px))]">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-600/10 translate-x-1/3 -translate-y-1/3 rounded-full blur-[80px]" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
            <div className="p-6 md:p-8 flex flex-col justify-center h-full relative z-10">
              <div className="flex items-start justify-between mb-8">
                <div className="size-16 rounded-none bg-[#030712] border border-cyan-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)] relative [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)]">
                  <div className="absolute inset-0 bg-cyan-500/10 animate-pulse" />
                  <Cpu className="size-8 text-cyan-400 drop-shadow-[0_0_5px_rgba(6,182,212,0.8)] relative z-10" />
                </div>
                <div className="flex gap-2">
                   <div className="px-3 py-1 bg-[#020617] border border-cyan-500/50 rounded-none flex items-center gap-2 shadow-[inset_0_0_10px_rgba(6,182,212,0.1)] relative">
                      <div className="size-2 rounded-none bg-cyan-400 animate-pulse shadow-[0_0_5px_rgba(6,182,212,1)]" />
                      <span className="text-[10px] font-mono font-bold text-cyan-400 tracking-widest drop-shadow-[0_0_2px_rgba(6,182,212,0.8)] uppercase">Core Online</span>
                   </div>
                   <div className="hidden sm:flex px-3 py-1 bg-[#020617] border border-cyan-500/30 rounded-none items-center gap-2">
                      <Terminal className="size-3 text-cyan-600" />
                      <span className="text-[8px] font-mono text-cyan-600">STABLE_OVR</span>
                   </div>
                </div>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-black text-white mb-4 uppercase font-mono tracking-tight leading-tight">
                HỆ THỐNG DỰ ĐOÁN <br className="hidden md:block"/>
                <span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]">BACCARAT_AI SECTOR_9</span>
              </h3>
              <div className="flex items-center gap-2 mb-4 text-[10px] font-mono text-cyan-500/50 uppercase tracking-[0.2em]">
                 <span>{'>'} EXEC_UPLINK_094</span>
                 <div className="h-px bg-cyan-900/50 flex-1" />
                 <span className="text-[8px]">[ SECURE ]</span>
              </div>
              <p className="text-cyan-50/70 mb-8 max-w-lg leading-relaxed text-sm md:text-base font-mono bg-cyan-950/20 p-4 border-l-2 border-cyan-500 relative">
                <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500/30" />
                <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500/30" />
                Dữ liệu được xử lý qua mạng neuron 64-lớp. Tối ưu hóa phân tích <span className="text-cyan-400 font-bold">Sexy Baccarat, Evolution, SA Gaming</span>. Tốc độ nhận diện cầu <span className="text-cyan-400">{'< 0.5s'}</span>.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/dashboard/tool">
                  <Button variant="glow" className="h-14 w-full sm:w-auto px-8 font-black uppercase tracking-widest group [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] relative">
                    <span className="relative z-10 flex items-center">
                       <ShieldAlert className="size-5 mr-3" /> KHỞI CHẠY PHÂN TÍCH <span className="ml-2 text-cyan-950 animate-pulse">_</span>
                    </span>
                  </Button>
                </Link>
                <Link to="/dashboard/history">
                  <Button variant="outline" className="h-14 w-full sm:w-auto px-8 border-cyan-800 text-cyan-400 font-bold font-mono tracking-widest uppercase hover:bg-cyan-950/40 relative">
                    NHẬT KÝ GIAO DỊCH
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Account Info / Status */}
        <div className="flex flex-col gap-4 md:gap-6 h-full">
          <div className="relative bg-[#020617]/80 border border-cyan-500/30 backdrop-blur-sm flex-1 shadow-[inset_0_0_20px_rgba(6,182,212,0.05)] text-cyan-50 [clip-path:polygon(0_0,100%_0,100%_100%,15px_100%,0_calc(100%-15px))] overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-cyan-500/20" />
            <div className="absolute -bottom-10 -right-10 size-40 bg-cyan-500/5 blur-3xl pointer-events-none" />
            
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-6 border-b border-cyan-900/50 pb-4">
                <div className="flex items-center gap-3">
                   <ShieldCheck className="size-5 text-cyan-400" />
                   <h3 className="font-mono font-bold tracking-widest text-cyan-400 uppercase">SYS_PRTCL</h3>
                </div>
                <div className="relative size-6 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border border-cyan-500/20 rounded-full border-t-cyan-500/80"
                  />
                  <Globe className="size-3.5 text-cyan-500/40 relative z-10" />
                </div>
              </div>
              
              <div className="p-4 border border-cyan-500/30 bg-[#030712] text-center mb-6 relative overflow-hidden shadow-[inset_0_0_15px_rgba(6,182,212,0.2)] group/rank">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(6,182,212,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-[scan_3s_linear_infinite]" />
                <p className="text-[10px] font-mono font-medium text-cyan-400/50 uppercase tracking-widest mb-1 relative z-10 group-hover/rank:text-cyan-400 transition-colors">RANK_DESIGNATION</p>
                <p className="text-2xl font-black text-white uppercase tracking-widest text-shadow-glow drop-shadow-[0_0_10px_rgba(6,182,212,0.5)] font-mono relative z-10">
                  Hạng {user?.plan === 'vip' ? 'vip' : user?.plan === 'premium' ? 'premium' : 'free'}
                </p>
                <div className="absolute top-0 right-0 w-8 h-[1px] bg-cyan-400/50" />
                <div className="absolute bottom-0 left-0 w-8 h-[1px] bg-cyan-400/50" />
              </div>

              <div className="space-y-4 flex-1">
                <div className="flex items-center justify-between text-xs font-mono group">
                  <div className="flex items-center gap-2">
                    <Coins className="size-3.5 text-cyan-700" />
                    <span className="text-cyan-500/50 uppercase group-hover:text-cyan-400 transition-colors">SỐ DƯ TÀI KHOẢN</span>
                  </div>
                  <span className="font-mono font-black text-cyan-300 drop-shadow-[0_0_2px_rgba(6,182,212,0.8)]">{user?.balance.toLocaleString('vi-VN')} Credit</span>
                </div>

                {/* Balance Sparkline */}
                <div className="h-20 w-full mt-4 relative border border-cyan-500/10 bg-[#030712]/50 p-1 [clip-path:polygon(0_0,100%_0,100%_85%,95%_100%,0_100%)] overflow-hidden group">
                  <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:10px_10px] opacity-50" />
                  
                  {/* Decorative Axis Lines */}
                  <div className="absolute left-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent" />
                  <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={balanceTrendData}>
                      <defs>
                        <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <YAxis hide domain={['dataMin - 100000', 'dataMax + 100000']} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#020617', 
                          border: '1px solid rgba(6,182,212,0.3)',
                          fontSize: '8px',
                          color: '#22d3ee',
                          fontFamily: 'monospace',
                          padding: '4px'
                        }}
                        itemStyle={{ color: '#22d3ee' }}
                        labelStyle={{ display: 'none' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#06b6d4" 
                        strokeWidth={1.5}
                        fillOpacity={1} 
                        fill="url(#colorBalance)"
                        animationDuration={2500}
                        activeDot={{ r: 3, fill: '#22d3ee', stroke: '#020617', strokeWidth: 1 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                  
                  {/* Corner Accent */}
                  <div className="absolute bottom-0 right-0 size-2 bg-cyan-400 group-hover:scale-125 transition-transform" />
                </div>

                <div className="h-px bg-cyan-900/40 relative"><div className="absolute right-0 top-0 w-4 h-full bg-cyan-500/30" /></div>
                
                <div className="flex items-center justify-between text-xs font-mono group">
                  <div className="flex items-center gap-2">
                    <Activity className="size-3.5 text-cyan-700" />
                    <span className="text-cyan-500/50 uppercase group-hover:text-cyan-400 transition-colors">NODE ĐANG CHẠY</span>
                  </div>
                  <span className="text-cyan-300">1/1 [ENCRYPTED]</span>
                </div>
                <div className="h-px bg-cyan-900/40 relative"><div className="absolute right-0 top-0 w-4 h-full bg-cyan-500/30" /></div>
                
                <div className="flex items-center justify-between text-xs font-mono group">
                  <div className="flex items-center gap-2">
                    <Lock className="size-3.5 text-cyan-700" />
                    <span className="text-cyan-500/50 uppercase group-hover:text-cyan-400 transition-colors">MỨC ĐỘ RỦI RO</span>
                  </div>
                  <span className="text-cyan-300">RẤT THẤP</span>
                </div>
              </div>
              
              <div className="mt-8 pt-4 border-t border-cyan-900/50">
                 <div className="flex items-center justify-between text-[8px] font-mono text-cyan-700 uppercase tracking-widest">
                   <span>CẬP NHẬT: {new Date().toISOString().slice(0, 10)}</span>
                   <span className="animate-pulse">KẾT NỐI TRỰC TIẾP</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
