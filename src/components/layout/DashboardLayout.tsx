import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/src/context/AuthContext';
import { useNotifications } from '@/src/context/NotificationContext';
import { LayoutDashboard, Coins, ShieldAlert, LogOut, User as UserIcon, Wallet, Menu, Bell, Info, AlertTriangle, CheckCircle2, X as CloseIcon, Trash2, Users } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Button } from '@/src/components/ui/Button';

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification, addNotification } = useNotifications();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

  // Simulate intro sequence
  useEffect(() => {
    const timer = setTimeout(() => setIsInitializing(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const navLinks = [
    { name: 'TỔNG QUAN HỆ THỐNG', shortName: 'TRANG CHỦ', href: '/dashboard', icon: LayoutDashboard },
    { name: 'MUA CREDIT HỆ THỐNG', shortName: 'MUA CREDIT', href: '/dashboard/buy-credit', icon: Coins },
    { name: 'LỊCH SỬ GIAO DỊCH', shortName: 'LỊCH SỬ', href: '/dashboard/history', icon: Wallet },
    { name: 'MODULE LÕI AI', shortName: 'CÔNG CỤ', href: '/dashboard/tool', icon: ShieldAlert },
    ...(user?.username?.toLowerCase() === 'admin' ? [{ name: 'QUẢN TRỊ VIÊN', shortName: 'ADMIN', href: '/admin', icon: Users }] : []),
  ];

  const systemLogs = [
    'ĐANG_KẾT_NỐI_MẠNG_EDGE...',
    'XÁC_THỰC_GIAO_THỨC_V4...',
    'ĐƯỜNG_TRUYỀN_ỔN_ĐỊNH_1024_KBPS',
    'GIẢI_MÃ_HỒ_SƠ_NGƯỜI_DÙNG...',
    'ĐỒNG_BỘ_HÓA_DỮ_LIỆU_BLOCKCHAIN...',
    'LÕI_AI_ĐÃ_SẴN_SÀNG_KHỞI_CHẠY'
  ];

  return (
    <div className="flex min-h-[100dvh] bg-[#030712] text-zinc-50 font-sans selection:bg-cyan-500/30">
      <AnimatePresence>
        {isInitializing && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(20px)' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-[#020617] flex flex-col items-center justify-center p-6 overflow-hidden"
          >
            {/* Background Tech Layer */}
            <div className="absolute inset-0 opacity-20 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(6,182,212,0.15)_1px,transparent_1px)] bg-[size:30px_30px]" />
              
              {/* Wiring / Circuit Pattern */}
              <svg className="absolute inset-0 size-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 100 L100 100 L120 120 L300 120 M400 0 L400 200 L420 220" stroke="currentColor" fill="none" strokeWidth="0.5" className="text-cyan-500" />
                <path d="M1000 500 L900 500 L880 480 L700 480" stroke="currentColor" fill="none" strokeWidth="0.5" className="text-cyan-500" />
                <circle cx="100" cy="100" r="2" fill="currentColor" className="text-cyan-400" />
                <circle cx="420" cy="220" r="2" fill="currentColor" className="text-cyan-400" />
              </svg>

              <div className="absolute inset-0 flex items-center justify-center">
                 <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                   className="size-[800px] border border-cyan-500/10 rounded-full"
                 />
                 <motion.div 
                   animate={{ rotate: -360 }}
                   transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                   className="absolute size-[600px] border border-cyan-400/5 rounded-full"
                 />
                 {/* Crosshair */}
                 <div className="absolute size-40 border border-cyan-500/20 rounded-full flex items-center justify-center">
                    <div className="w-full h-[1px] bg-cyan-500/20" />
                    <div className="h-full w-[1px] bg-cyan-500/20 absolute" />
                 </div>
              </div>
            </div>

            {/* SCANNING LINE */}
            <motion.div 
              initial={{ top: '-10%' }}
              animate={{ top: '110%' }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-[1px] bg-cyan-400/50 shadow-[0_0_15px_cyan] z-0 pointer-events-none"
            />

            {/* MAIN CONTENT */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 flex flex-col items-center max-w-lg w-full"
            >
               {/* TECH CIRCLE LOADER */}
               <div className="relative size-32 mb-12 flex items-center justify-center">
                  <svg className="absolute inset-0 size-full -rotate-90">
                    <motion.circle
                      cx="64" cy="64" r="60"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-cyan-900/20"
                    />
                    <motion.circle
                      cx="64" cy="64" r="60"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="377"
                      initial={{ strokeDashoffset: 377 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{ duration: 2.5, ease: "easeInOut" }}
                      className="text-cyan-500 shadow-[0_0_20px_cyan]"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.15, 1],
                        opacity: [0.7, 1, 0.7],
                        filter: ['hue-rotate(0deg)', 'hue-rotate(15deg)', 'hue-rotate(0deg)']
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ShieldAlert className="size-12 text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
                    </motion.div>
                  </div>
                  {/* Decorative rotating notches */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-[3px] border-dotted border-cyan-500/20 rounded-full" 
                  />
               </div>

               <div className="w-full space-y-6 text-center">
                 <div className="space-y-1">
                    <motion.h2 
                      animate={{ 
                        textShadow: ['0 0 10px cyan', '0 0 20px cyan', '0 0 10px cyan'],
                        letterSpacing: ['0.2em', '0.25em', '0.2em']
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-2xl font-black text-white tracking-[0.2em] font-mono uppercase"
                    >
                      Khởi_Chạy_Hệ_Thống
                    </motion.h2>
                    <div className="flex items-center justify-center gap-2">
                       <span className="w-12 h-[1px] bg-cyan-900" />
                       <span className="text-[10px] font-mono text-cyan-500/80 tracking-[0.5em] uppercase">LIÊN_KẾT_BẢO_MẬT: [ĐANG HOẠT ĐỘNG]</span>
                       <span className="w-12 h-[1px] bg-cyan-900" />
                    </div>
                 </div>

                 {/* PROGRESS BLOCK */}
                 <div className="bg-[#030712] border border-cyan-500/10 p-5 relative overflow-hidden backdrop-blur-md shadow-2xl">
                    <div className="absolute top-0 left-0 size-3 border-t-2 border-l-2 border-cyan-400 shadow-[0_0_10px_cyan]" />
                    <div className="absolute top-0 right-0 size-3 border-t-2 border-r-2 border-cyan-400 shadow-[0_0_10px_cyan]" />
                    <div className="absolute bottom-0 left-0 size-3 border-b-2 border-l-2 border-cyan-400 shadow-[0_0_10px_cyan]" />
                    <div className="absolute bottom-0 right-0 size-3 border-b-2 border-r-2 border-cyan-400 shadow-[0_0_10px_cyan]" />
                    
                    <div className="flex justify-between font-mono text-[10px] text-cyan-400/60 mb-3 uppercase tracking-tighter">
                       <div className="flex gap-4">
                         <span className="flex items-center gap-1"><div className="size-1.5 bg-cyan-500 mb-0.5" /> CPU: TỐI ƯU</span>
                         <span className="flex items-center gap-1"><div className="size-1.5 bg-cyan-500 mb-0.5" /> MEM: SẴN SÀNG</span>
                       </div>
                       <motion.span
                         animate={{ opacity: [1, 0, 1] }}
                         transition={{ duration: 0.8, repeat: Infinity }}
                         className="text-cyan-400 font-bold"
                       >
                         Đồng_Bộ_Hóa...
                       </motion.span>
                    </div>

                    <div className="h-2 w-full bg-cyan-950/30 overflow-hidden relative border border-cyan-900/50">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: '100%' }}
                         transition={{ duration: 2.2, ease: [0.65, 0, 0.35, 1] }}
                         className="h-full bg-cyan-500 shadow-[0_0_25px_cyan] relative z-10"
                       />
                       <motion.div 
                         animate={{ x: ['-100%', '100%'] }}
                         transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                         className="absolute inset-0 h-full w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent z-20"
                       />
                    </div>

                    <div className="mt-4 flex justify-between font-mono text-[9px] text-cyan-600 tracking-[0.3em] uppercase items-end">
                        <div className="flex flex-col items-start gap-1">
                           <span className="opacity-50">XÁC_THỰC_NODE</span>
                           <span className="text-cyan-400 font-bold">MÃ_BẢO_MẬT_OK</span>
                        </div>
                        <div className="text-right">
                           <span className="text-cyan-400 text-xs font-bold drop-shadow-[0_0_5px_cyan]">99.85%</span>
                        </div>
                    </div>
                 </div>

                 {/* LOGS STREAM */}
                 <div className="h-24 overflow-hidden relative px-4 bg-cyan-950/5 border-x border-cyan-900/20">
                    <motion.div 
                      initial={{ y: 0 }}
                      animate={{ y: -120 }}
                      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                      className="space-y-1.5 pt-4"
                    >
                      {[...systemLogs, ...systemLogs, ...systemLogs].map((log, i) => (
                        <p key={i} className="text-[9px] font-mono text-cyan-500/30 uppercase tracking-[0.4em] leading-none flex justify-between">
                          <span>{`> ${log}`}</span>
                          <span className="opacity-50 text-[7px] tracking-normal">{`[${Math.random().toString(16).slice(2, 8).toUpperCase()}]`}</span>
                        </p>
                      ))}
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] pointer-events-none" />
                 </div>
               </div>
            </motion.div>

              <div className="absolute top-12 left-12 opacity-40">
               <div className="text-cyan-500 font-mono text-[10px] tracking-widest mb-1 border-l-2 border-cyan-500 pl-2 uppercase">Module_Lõi_V.4</div>
               <div className="text-cyan-800 font-mono text-[8px] tracking-[0.3em] uppercase">Trạng_Thái: Đã Xác Thực</div>
            </div>
            
            <div className="absolute bottom-12 right-12 opacity-40 text-right">
               <div className="text-cyan-500 font-mono text-[10px] tracking-widest mb-1 border-r-2 border-cyan-500 pr-2 uppercase">Khu_Vực_Đông_Nam_Á</div>
               <div className="text-cyan-800 font-mono text-[8px] tracking-[0.3em] uppercase">Độ trễ: 24ms</div>
            </div>

            {/* Glitch Overlay */}
            <motion.div
              animate={{ opacity: [0, 0.05, 0, 0.08, 0] }}
              transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 1 }}
              className="absolute inset-0 bg-cyan-400 pointer-events-none mix-blend-overlay"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 border-r border-cyan-500/10 bg-[#061026] flex-col relative z-20">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="size-8 rounded-none bg-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.8),inset_0_0_10px_rgba(255,255,255,0.5)] border border-cyan-300">
              <ShieldAlert className="size-5 text-[#020617]" />
            </div>
            <div className="flex flex-col">
              <h1 className="font-mono font-black text-xl tracking-tighter text-white leading-none">
                AI<span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] px-1">CORE</span>
              </h1>
              <span className="text-[8px] font-mono tracking-[0.3em] text-cyan-500/80 uppercase leading-none mt-1">v4.0.0-beta</span>
            </div>
          </div>
          
          <div className="p-4 rounded-none border border-cyan-500/30 bg-[#020617]/80 backdrop-blur-xl relative [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] before:absolute before:inset-0 before:-z-10 shadow-[inset_0_0_20px_rgba(6,182,212,0.05)]">
            <div className="flex items-center gap-3 mb-3">
              <div className="size-10 rounded-none bg-[#030712] flex items-center justify-center border border-cyan-500/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-cyan-500/10 animate-pulse" />
                <UserIcon className="size-5 text-cyan-400 relative z-10" />
              </div>
              <div className="overflow-hidden flex-1">
                <p className="text-sm font-mono font-bold truncate text-cyan-50">ID: {user.username}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className={cn(
                    "text-[10px] font-bold font-mono px-1.5 py-0.5 rounded-none shadow-sm uppercase tracking-widest",
                    user.plan === 'vip' ? "bg-cyan-500 text-zinc-950 shadow-[0_0_10px_rgba(6,182,212,0.5)]" : 
                    user.plan === 'premium' ? "bg-blue-500 text-white" : 
                    "bg-[#030712] text-cyan-500/80 border border-cyan-900/50"
                  )}>
                    [{user.plan}] CLASS
                  </span>
                </div>
              </div>
            </div>
            <div className="pt-3 border-t border-cyan-500/20 relative">
              <div className="absolute top-0 right-0 w-8 h-[1px] bg-cyan-400" />
              <p className="text-[10px] text-cyan-600 mb-1 font-mono uppercase tracking-[0.2em] flex items-center gap-2">
                 <span className="text-cyan-400 animate-pulse">■</span> SỐ_DƯ_TÀI_KHOẢN
              </p>
              <div className="flex items-center gap-2">
                <Coins className="size-4 text-cyan-400" />
                <span className="font-mono text-base font-black text-cyan-50 tracking-tight">{user.balance.toLocaleString('vi-VN')} Credit</span>
              </div>
            </div>
          </div>
        </div>

        <nav className="space-y-1.5">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all group relative",
                    isActive ? "text-white" : "text-zinc-400 hover:text-white hover:bg-zinc-900/50"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 bg-cyan-500/10 border border-cyan-500/30 rounded-xl shadow-[inset_0_0_10px_rgba(6,182,212,0.2)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon className={cn("size-5 z-10 transition-colors", isActive ? "text-cyan-400 drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]" : "text-zinc-500 group-hover:text-cyan-300")} />
                  <span className="z-10">{link.name}</span>
                </Link>
              );
            })}
          </nav>
        
        <div className="mt-auto p-6">
          <button
            onClick={() => setIsLogoutConfirmOpen(true)}
            className="flex items-center gap-3 px-3 py-3 rounded-none text-sm font-mono tracking-widest uppercase text-cyan-400/50 hover:text-rose-400 hover:bg-rose-950/20 w-full transition-all group border border-transparent hover:border-rose-900/50"
          >
            <LogOut className="size-5 group-hover:text-rose-400" />
            <span>KẾT THÚC PHIÊN</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0 relative overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b border-cyan-500/20 bg-[#030712]/80 backdrop-blur-xl sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-none bg-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.8),inset_0_0_10px_rgba(255,255,255,0.5)] border border-cyan-300">
              <ShieldAlert className="size-4 text-[#020617]" />
            </div>
            <div className="flex flex-col">
              <h1 className="font-mono font-black text-lg tracking-tighter text-white leading-none">
                AI<span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] px-1">CORE</span>
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <button 
               onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
               className="relative p-1 text-zinc-400 hover:text-cyan-400 transition-colors"
             >
                <Bell className="size-6" />
                {unreadCount > 0 && (
                   <span className="absolute top-0 right-0 size-3 bg-rose-500 rounded-none border border-[#030712] flex items-center justify-center text-[8px] font-bold text-white shadow-[0_0_10px_rgba(244,63,94,0.5)]">
                     {unreadCount}
                   </span>
                )}
             </button>
             <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#020617] border border-cyan-500/30 rounded-none shadow-[inset_0_0_10px_rgba(6,182,212,0.1)]">
                <Coins className="size-3.5 text-cyan-400" />
                <span className="font-mono text-xs font-bold text-white">{user.balance.toLocaleString('vi-VN')}</span>
             </div>
             <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-1 text-zinc-400 hover:text-white">
                <Menu className="size-6" />
             </button>
          </div>
        </header>

        {/* Mobile Slide Menu */}
        {isMobileMenuOpen && (
           <div className="md:hidden fixed inset-0 z-50 flex">
             <div className="absolute inset-0 bg-[#030712]/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
             <motion.div 
               initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ bounce: 0 }}
               className="relative ml-auto w-64 max-w-[80%] bg-[#020617] border-l border-cyan-500/30 h-full flex flex-col p-6 shadow-[-10px_0_30px_rgba(6,182,212,0.1)]"
             >
                <div className="flex items-center gap-3 mb-6">
                  <div className="size-10 rounded-none bg-[#030712] border border-cyan-900/50 flex items-center justify-center shadow-[inset_0_0_10px_rgba(6,182,212,0.1)]">
                    <UserIcon className="size-5 text-cyan-500/80" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-cyan-400/80 tracking-widest uppercase mb-1">ID: {user.username}</p>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-none uppercase tracking-widest bg-cyan-500 text-zinc-950 inline-block shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                      {user.plan} CLASS
                    </span>
                  </div>
                </div>
                <div className="space-y-1 flex-1">
                  {navLinks.map(link => (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 rounded-none text-sm font-mono tracking-widest uppercase transition-all",
                        location.pathname === link.href ? "bg-cyan-950/30 text-cyan-400 border-l-2 border-cyan-400 shadow-[inset_10px_0_20px_rgba(6,182,212,0.05)]" : "text-cyan-50/50 hover:text-cyan-300 hover:bg-[#030712]"
                      )}
                    >
                      <link.icon className="size-5" />
                      {link.name}
                    </Link>
                  ))}
                </div>
                <button
                  onClick={() => { setIsMobileMenuOpen(false); setIsLogoutConfirmOpen(true); }}
                  className="flex items-center gap-3 px-3 py-3 rounded-none text-sm font-mono tracking-widest uppercase text-rose-500/80 hover:bg-rose-950/30 border-l-2 border-transparent hover:border-rose-500 transition-all font-bold"
                >
                  <LogOut className="size-5" />
                  Ngắt Kết Nối
                </button>
             </motion.div>
           </div>
        )}

        {/* Top/Bottom ambient light */}
        <div className="fixed top-0 inset-x-0 h-40 bg-gradient-to-b from-cyan-900/10 to-transparent pointer-events-none z-0" />
        <div className="fixed bottom-0 inset-x-0 h-64 bg-gradient-to-t from-cyan-900/10 to-transparent pointer-events-none z-0" />
        
        {/* Logout Confirmation Panel */}
        <AnimatePresence mode="wait">
          {isLogoutConfirmOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsLogoutConfirmOpen(false)}
                className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, y: 100, rotateX: 20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: 0, 
                  rotateX: 0,
                  transition: { 
                    type: 'spring', 
                    damping: 20, 
                    stiffness: 100,
                    delayChildren: 0.2,
                    staggerChildren: 0.1
                  }
                }}
                exit={{ opacity: 0, scale: 0.9, y: 20, rotateX: -10 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-full max-w-md bg-[#061026] border border-cyan-500/30 p-8 z-[110] shadow-[0_0_100px_rgba(6,182,212,0.2)] [clip-path:polygon(20px_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%,0_20px)] perspective-1000"
              >
                <div className="flex flex-col items-center text-center space-y-6">
                   <motion.div 
                     variants={{
                       initial: { scale: 0, rotate: -45 },
                       animate: { scale: 1, rotate: 0 }
                     }}
                     className="size-24 bg-rose-500/10 border border-rose-500/50 flex items-center justify-center relative group"
                   >
                      <motion.div 
                        animate={{ opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-rose-500 shadow-[inset_0_0_20px_rgba(244,63,94,0.3)]" 
                      />
                      <LogOut className="size-12 text-rose-500 relative z-10 group-hover:scale-110 transition-transform" />
                      
                      {/* Corner Accents */}
                      <div className="absolute -top-1 -left-1 size-3 border-t border-l border-rose-500" />
                      <div className="absolute -bottom-1 -right-1 size-3 border-b border-r border-rose-500" />
                   </motion.div>
                   
                   <motion.div 
                     variants={{
                       initial: { opacity: 0, y: 20 },
                       animate: { opacity: 1, y: 0 }
                     }}
                     className="space-y-3"
                   >
                      <h3 className="text-2xl font-black text-white tracking-[0.2em] uppercase font-mono text-shadow-glow">
                        NGẮT_KẾT_NỐI?
                      </h3>
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent mb-1" />
                      <p className="text-[11px] text-cyan-500/60 font-mono uppercase tracking-[0.15em] leading-relaxed">
                        Bạn sắp thoát khỏi hệ thống quản lý AI tập trung.<br/>
                        Mọi phiên làm việc chưa lưu sẽ bị hủy bỏ.
                      </p>
                   </motion.div>

                   <motion.div 
                     variants={{
                       initial: { opacity: 0 },
                       animate: { opacity: 1 }
                     }}
                     className="grid grid-cols-2 gap-4 w-full pt-4"
                   >
                      <Button 
                        variant="outline" 
                        onClick={() => setIsLogoutConfirmOpen(false)}
                        className="h-14 border-cyan-950 text-cyan-400 hover:bg-cyan-900/30 uppercase tracking-[0.2em] text-[10px] font-black group relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-cyan-400/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                        <span className="relative z-10">GIỮ LẠI</span>
                      </Button>
                      <Button 
                        variant="danger" 
                        onClick={() => {
                          addNotification('PHIÊN LÀM VIỆC ĐÃ KẾT THÚC', 'Bạn đã đăng xuất khỏi hệ thống thành công.', 'info');
                          logout();
                        }}
                        className="h-14 uppercase tracking-[0.2em] text-[10px] font-black group relative overflow-hidden shadow-[0_0_20px_rgba(244,63,94,0.3)]"
                      >
                         <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                         <span className="relative z-10">XÁC NHẬN</span>
                      </Button>
                   </motion.div>
                </div>

                {/* Cyber Decorative Elements */}
                <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-20">
                   <div className="absolute top-4 right-4 text-[8px] font-mono text-cyan-500 uppercase rotate-90 origin-right tracking-widest">SYSTEM_EXIT_PROTOCOL</div>
                </div>
                <div className="absolute bottom-0 left-0 w-24 h-24 pointer-events-none opacity-20">
                   <div className="absolute bottom-4 left-4 text-[8px] font-mono text-cyan-500 uppercase tracking-widest">ID_AUTH_REVOKE</div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Mobile Notifications Panel */}
        <AnimatePresence mode="wait">
          {isNotificationsOpen && (
            <div className="md:hidden">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsNotificationsOpen(false)}
                className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px]"
              />
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[#020617] border-l border-cyan-500/20 z-[70] flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
              >
                <div className="p-6 border-b border-cyan-500/10 flex items-center justify-between bg-[#030712]/50">
                  <div className="flex items-center gap-3">
                     <div className="size-10 bg-cyan-500/10 flex items-center justify-center border border-cyan-500/30">
                        <Bell className="size-5 text-cyan-400 animate-pulse" />
                     </div>
                     <div>
                        <h3 className="font-mono font-black text-white tracking-widest uppercase text-sm">HỘP THƯ</h3>
                        <p className="text-[8px] font-mono text-cyan-500/60 uppercase tracking-[0.2em]">Secure_Channel</p>
                     </div>
                  </div>
                  <button onClick={() => setIsNotificationsOpen(false)} className="p-2 hover:bg-cyan-500/10 text-cyan-400">
                    <CloseIcon className="size-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                  {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full opacity-20">
                      <Bell className="size-12 mb-4" />
                      <p className="font-mono text-xs uppercase tracking-widest">Không có thông báo</p>
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div key={n.id} className={cn("p-4 border transition-all", n.read ? "bg-transparent border-cyan-900/30" : "bg-cyan-500/5 border-cyan-500/30")}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-mono font-bold text-[10px] text-white uppercase">{n.title}</h4>
                          <button onClick={() => removeNotification(n.id)} className="text-zinc-600 hover:text-rose-400"><Trash2 className="size-3" /></button>
                        </div>
                        <p className="text-xs text-zinc-400">{n.message}</p>
                        <p className="text-[8px] text-zinc-600 mt-2">{n.timestamp.toLocaleString()}</p>
                      </div>
                    ))
                  )}
                </div>
                {notifications.length > 0 && (
                  <div className="p-4 border-t border-cyan-500/10">
                    <button onClick={markAllAsRead} className="w-full h-10 border border-cyan-500/30 text-cyan-400 font-mono text-[10px] uppercase">Đã đọc tất cả</button>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Desktop Top Header Bar */}
        <header className="hidden md:flex items-center justify-between px-8 h-12 border-b border-cyan-500/10 bg-[#030712]/40 backdrop-blur-md sticky top-0 z-40">
           <div className="flex items-center gap-4">
              <div className="px-3 py-1 bg-cyan-500/5 border border-cyan-500/20 text-[9px] font-mono text-cyan-500/60 tracking-widest uppercase flex items-center gap-2">
                 <div className="size-1 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_5px_cyan]" />
                 NODE_STATUS: ONLINE
              </div>
           </div>

           <div className="flex items-center gap-6">
              {/* Notifications Trigger */}
              <div className="relative">
                <button 
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className={cn(
                    "relative p-2 transition-all border border-transparent hover:border-cyan-500/20 group",
                    isNotificationsOpen ? "bg-cyan-500/10 text-cyan-400" : "text-zinc-500 hover:text-cyan-400"
                  )}
                >
                    <Bell className={cn("size-4", unreadCount > 0 && "animate-pulse")} />
                    {unreadCount > 0 && (
                      <span className="absolute top-0 right-0 size-3 bg-rose-500 rounded-none flex items-center justify-center text-[7px] font-bold text-white shadow-[0_0_8px_rgba(244,63,94,0.5)] border border-[#030712]">
                        {unreadCount}
                      </span>
                    )}
                </button>

                {/* Desktop Notification Dropdown */}
                <AnimatePresence>
                  {isNotificationsOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsNotificationsOpen(false)} />
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-80 bg-[#061026] border border-cyan-500/30 z-50 flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.5)] [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)]"
                      >
                        <div className="p-3 border-b border-cyan-500/10 flex items-center justify-between bg-[#030712]/50">
                          <h3 className="font-mono font-bold text-white tracking-widest uppercase text-[9px]">HỆ THỐNG THÔNG BÁO</h3>
                          {unreadCount > 0 && (
                             <button onClick={markAllAsRead} className="text-[8px] font-mono text-cyan-500/60 hover:text-cyan-400 underline uppercase tracking-tighter">Đọc tất cả</button>
                          )}
                        </div>

                        <div className="max-h-[350px] overflow-y-auto p-2 space-y-2 custom-scrollbar">
                          {notifications.length === 0 ? (
                            <div className="py-8 text-center opacity-20 group">
                              <Bell className="size-6 mx-auto mb-2 group-hover:animate-bounce transition-all" />
                              <p className="font-mono text-[8px] uppercase tracking-widest">Không có dữ liệu</p>
                            </div>
                          ) : (
                            notifications.map((n) => (
                              <div
                                key={n.id}
                                onClick={() => !n.read && markAsRead(n.id)}
                                className={cn(
                                  "p-3 border transition-all cursor-pointer relative group",
                                  n.read ? "bg-transparent border-cyan-900/10" : "bg-cyan-500/5 border-cyan-500/30"
                                )}
                              >
                                <div className="flex gap-3">
                                  <div className={cn(
                                    "size-7 shrink-0 flex items-center justify-center border",
                                    n.type === 'success' ? "border-emerald-500/20 text-emerald-400" :
                                    n.type === 'warning' ? "border-amber-500/20 text-amber-400" :
                                    n.type === 'error' ? "border-rose-500/20 text-rose-400" :
                                    "border-cyan-500/20 text-cyan-400"
                                  )}>
                                     {n.type === 'success' ? <CheckCircle2 className="size-4" /> :
                                      n.type === 'warning' ? <AlertTriangle className="size-4" /> :
                                      n.type === 'error' ? <AlertTriangle className="size-4" /> :
                                      <Info className="size-4" />}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                       <p className={cn("font-mono text-[9px] font-bold uppercase truncate", n.read ? "text-zinc-500" : "text-white")}>{n.title}</p>
                                       <button 
                                          onClick={(e) => { e.stopPropagation(); removeNotification(n.id); }}
                                          className="opacity-0 group-hover:opacity-100 p-0.5 hover:text-rose-400 transition-all text-zinc-600"
                                        >
                                          <Trash2 className="size-2.5" />
                                        </button>
                                    </div>
                                    <p className={cn("text-[10px] leading-tight mt-0.5 line-clamp-2", n.read ? "text-zinc-600" : "text-zinc-400")}>{n.message}</p>
                                  </div>
                                </div>
                                {!n.read && <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-cyan-400" />}
                              </div>
                            ))
                          )}
                        </div>
                        
                        {notifications.length > 0 && (
                          <button 
                            onClick={() => setIsNotificationsOpen(false)}
                            className="p-2 border-t border-cyan-500/10 text-center text-[8px] font-mono text-cyan-600 hover:text-cyan-400 uppercase tracking-widest bg-[#030712]/30"
                          >
                            Đóng bảng
                          </button>
                        )}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-3 pl-4 border-l border-cyan-500/10">
                 <div className="text-right hidden sm:block">
                    <p className="text-[9px] font-mono font-bold text-white leading-none uppercase tracking-tight">{user.username}</p>
                    <p className="text-[7px] font-mono text-cyan-500/40 leading-none mt-1 uppercase">CLASS_{user.plan}</p>
                 </div>
                 <div className="size-7 bg-cyan-500/5 border border-cyan-500/20 flex items-center justify-center">
                    <UserIcon className="size-3.5 text-cyan-500/60" />
                 </div>
              </div>
           </div>
        </header>

        <main className="flex-1 overflow-y-auto overflow-x-hidden relative pb-32 md:pb-8 scroll-smooth border-l border-cyan-900/30">
          {/* Background Ambient Layers */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:4px_4px] [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black_100%)] opacity-30 pointer-events-none" />

          {/* Hexagon Pattern Overall */}
          <div className="absolute inset-0 opacity-[0.015] flex items-center justify-center scale-150 mix-blend-overlay pointer-events-none">
             <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
               <defs>
                 <pattern id="hexagons-bg" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(3)">
                   <path d="M25,0 L50,14.4 L50,43.4 L25,28.8 L0,43.4 L0,14.4 L25,0 Z M25,14.4 L25,43.4 M0,28.8 L25,14.4 M50,28.8 L25,14.4" fill="none" stroke="currentColor" strokeWidth="1" className="text-cyan-500" />
                 </pattern>
               </defs>
               <rect width="100%" height="100%" fill="url(#hexagons-bg)" />
             </svg>
          </div>

          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-600/5 -translate-y-1/2 translate-x-1/3 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-600/5 translate-y-1/2 -translate-x-1/3 rounded-full blur-[120px] pointer-events-none" />
          
          {/* Tech Decorative Lines */}
          <div className="absolute top-0 left-8 w-[1px] h-full bg-[linear-gradient(180deg,transparent_0%,rgba(6,182,212,0.3)_50%,transparent_100%)] pointer-events-none hidden lg:block" />
          <div className="absolute top-0 right-8 w-[1px] h-full bg-[linear-gradient(180deg,transparent_0%,rgba(6,182,212,0.3)_50%,transparent_100%)] pointer-events-none hidden lg:block">
            <div className="w-[2px] h-32 bg-cyan-400 absolute top-1/4 left-[-0.5px] shadow-[0_0_15px_rgba(6,182,212,1)]" />
            <div className="w-[1px] h-16 bg-cyan-300 absolute top-2/3 left-0 shadow-[0_0_10px_rgba(6,182,212,0.8)] animate-pulse" />
          </div>
          <div className="absolute top-12 left-0 w-full h-[1px] bg-[linear-gradient(90deg,transparent_0%,rgba(6,182,212,0.3)_50%,transparent_100%)] pointer-events-none hidden lg:block" />
          
          {/* Hexagon Detail Overlays */}
          <div className="absolute top-24 right-10 flex flex-col items-end opacity-[0.05] pointer-events-none scale-150 transform-gpu hidden lg:flex text-cyan-400">
             <svg width="100" height="100" viewBox="0 0 100 100">
               <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="none" stroke="currentColor" strokeWidth="2" />
               <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" fill="none" stroke="currentColor" strokeWidth="1" />
               <circle cx="50" cy="50" r="5" fill="currentColor" />
             </svg>
             <span className="text-[10px] font-mono tracking-[0.5em] mt-8">KHU_VỰC_B4</span>
          </div>
          <div className="absolute bottom-40 left-10 flex flex-col opacity-[0.03] pointer-events-none scale-[2] transform-gpu hidden lg:flex text-blue-400">
             <span className="text-[8px] font-mono tracking-[0.5em] mb-4">DRV_ACTIVE</span>
             <svg width="100" height="100" viewBox="0 0 100 100">
               <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
               <polygon points="50,35 65,42.5 65,57.5 50,65 35,57.5 35,42.5" fill="none" stroke="currentColor" strokeWidth="2" />
             </svg>
          </div>
          
          <div className="p-4 md:p-8 max-w-6xl mx-auto relative z-10 flex flex-col">
            <Outlet />
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#030712]/80 backdrop-blur-xl border-t border-cyan-500/20 z-40 pb-safe">
          <div className="flex items-center justify-around px-2 py-3">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.shortName}
                  to={link.href}
                  className="flex flex-col items-center gap-1 min-w-16 relative"
                >
                  {isActive && (
                    <motion.div
                      layoutId="bottom-nav-active"
                      className="absolute -top-3 w-12 h-1 bg-cyan-400 rounded-b-full shadow-[0_0_15px_rgba(6,182,212,0.8)]"
                    />
                  )}
                  <Icon className={cn(
                    "size-5 transition-colors duration-200",
                    isActive ? "text-cyan-400 drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]" : "text-zinc-500"
                  )} />
                  <span className={cn(
                    "text-[10px] font-medium transition-colors duration-200",
                    isActive ? "text-cyan-50" : "text-zinc-500"
                  )}>{link.shortName}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
