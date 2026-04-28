import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/src/context/AuthContext';
import { useNotifications } from '@/src/context/NotificationContext';
import { LayoutDashboard, Coins, ShieldAlert, LogOut, User as UserIcon, Wallet, Menu, Bell, Info, AlertTriangle, CheckCircle2, X as CloseIcon, Trash2, Users } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Button } from '@/src/components/ui/Button';

export function AdminLayout() {
  const { user, logout } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification, addNotification } = useNotifications();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

  // Simulate intro sequence
  useEffect(() => {
    const timer = setTimeout(() => setIsInitializing(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!user || user.username.toLowerCase() !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  const navLinks = [
    { name: 'QUẢN TRỊ VIÊN', shortName: 'ADMIN DASHBOARD', href: '/admin', icon: ShieldAlert },
    { name: 'TRỞ LẠI HỆ THỐNG', shortName: 'TRỞ LẠI', href: '/dashboard', icon: LayoutDashboard },
  ];

  const systemLogs = [
    'KHỞI_CHẠY_MODULE_ADMIN...',
    'ĐỌC_QUYỀN_TRUY_CẬP_CAO_NHẤT...',
    'ĐỒNG_BỘ_MASTER_NODE_4...'
  ];

  return (
    <div className="flex min-h-[100dvh] bg-[#050202] text-zinc-50 font-sans selection:bg-rose-500/30">
      <AnimatePresence>
        {isInitializing && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(20px)' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-[#0f0505] flex flex-col items-center justify-center p-6 overflow-hidden"
          >
            {/* Background Tech Layer with Rose theme */}
            <div className="absolute inset-0 opacity-20 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(244,63,94,0.15)_1px,transparent_1px)] bg-[size:30px_30px]" />
            </div>

            {/* SCANNING LINE */}
            <motion.div 
              initial={{ top: '-10%' }}
              animate={{ top: '110%' }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-[1px] bg-rose-400/50 shadow-[0_0_15px_rose] z-0 pointer-events-none"
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
                      className="text-rose-900/20"
                    />
                    <motion.circle
                      cx="64" cy="64" r="60"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="377"
                      initial={{ strokeDashoffset: 377 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{ duration: 2.0, ease: "easeInOut" }}
                      className="text-rose-500 shadow-[0_0_20px_rose]"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.15, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ShieldAlert className="size-12 text-rose-400 drop-shadow-[0_0_15px_rgba(244,63,94,0.8)]" />
                    </motion.div>
                  </div>
               </div>

               <div className="w-full space-y-6 text-center">
                 <div className="space-y-1">
                    <motion.h2 
                      animate={{ 
                        textShadow: ['0 0 10px rose', '0 0 20px rose', '0 0 10px rose'],
                        letterSpacing: ['0.2em', '0.25em', '0.2em']
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-2xl font-black text-rose-500 tracking-[0.2em] font-mono uppercase"
                    >
                      Kiểm_Duyệt_Bảo_Mật
                    </motion.h2>
                    <div className="flex items-center justify-center gap-2">
                       <span className="w-12 h-[1px] bg-rose-900" />
                       <span className="text-[10px] font-mono text-rose-500/80 tracking-[0.5em] uppercase">QUYỀN QUẢN TRỊ VIÊN: [XÁC NHẬN]</span>
                       <span className="w-12 h-[1px] bg-rose-900" />
                    </div>
                 </div>

                 {/* PROGRESS BLOCK */}
                 <div className="bg-[#0f0505] border border-rose-500/10 p-5 relative overflow-hidden backdrop-blur-md shadow-2xl">
                    <div className="absolute top-0 left-0 size-3 border-t-2 border-l-2 border-rose-400 shadow-[0_0_10px_rose]" />
                    <div className="absolute top-0 right-0 size-3 border-t-2 border-r-2 border-rose-400 shadow-[0_0_10px_rose]" />
                    <div className="absolute bottom-0 left-0 size-3 border-b-2 border-l-2 border-rose-400 shadow-[0_0_10px_rose]" />
                    <div className="absolute bottom-0 right-0 size-3 border-b-2 border-r-2 border-rose-400 shadow-[0_0_10px_rose]" />
                    
                    <div className="h-2 w-full bg-rose-950/30 overflow-hidden relative border border-rose-900/50 mt-4">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: '100%' }}
                         transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
                         className="h-full bg-rose-500 shadow-[0_0_25px_rose] relative z-10"
                       />
                       <motion.div 
                         animate={{ x: ['-100%', '100%'] }}
                         transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                         className="absolute inset-0 h-full w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent z-20"
                       />
                    </div>
                 </div>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar, tinted rose */}
      <aside className="hidden md:flex w-64 border-r border-rose-500/20 bg-[#0a0202] flex-col relative z-20">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="size-8 rounded-none bg-rose-600 flex items-center justify-center shadow-[0_0_15px_rgba(244,63,94,0.8),inset_0_0_10px_rgba(255,255,255,0.5)] border border-rose-400">
              <ShieldAlert className="size-5 text-[#0f0505]" />
            </div>
            <div className="flex flex-col">
              <h1 className="font-mono font-black text-xl tracking-tighter text-rose-100 leading-none">
                SYS<span className="text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.8)] px-1">ADMIN</span>
              </h1>
              <span className="text-[8px] font-mono tracking-[0.3em] text-rose-500/80 uppercase leading-none mt-1">v4.0.0-beta</span>
            </div>
          </div>
          
          <div className="p-4 rounded-none border border-rose-500/30 bg-[#0f0505]/80 backdrop-blur-xl relative shadow-[inset_0_0_20px_rgba(244,63,94,0.05)]">
            <div className="flex items-center gap-3 mb-3">
              <div className="size-10 rounded-none bg-[#0a0202] flex items-center justify-center border border-rose-500/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-rose-500/10 animate-pulse" />
                <UserIcon className="size-5 text-rose-400 relative z-10" />
              </div>
              <div className="overflow-hidden flex-1">
                <p className="text-sm font-mono font-bold truncate text-rose-100">ID: {user?.username}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="bg-rose-600 text-white text-[10px] font-bold font-mono px-1.5 py-0.5 rounded-none shadow-[0_0_10px_rgba(244,63,94,0.5)] uppercase tracking-widest">
                    QUẢN TRỊ VIÊN
                  </span>
                </div>
              </div>
            </div>
            <div className="pt-3 border-t border-rose-500/20 relative">
              <p className="text-[10px] text-rose-600 mb-1 font-mono uppercase tracking-[0.2em] flex items-center gap-2">
                 QUYỀN ĐIỀU CHỈNH HỆ THỐNG
              </p>
            </div>
          </div>
        </div>

        <nav className="space-y-1.5 flex-1 px-4">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href || (link.href !== '/dashboard' && location.pathname.startsWith(link.href));
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all group relative",
                    isActive ? "text-white" : "text-zinc-500 hover:text-white hover:bg-zinc-900/50"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="admin-sidebar-active"
                      className="absolute inset-0 bg-rose-500/10 border border-rose-500/30 rounded-xl shadow-[inset_0_0_10px_rgba(244,63,94,0.2)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon className={cn("size-5 z-10 transition-colors", isActive ? "text-rose-400 drop-shadow-[0_0_5px_rgba(244,63,94,0.8)]" : "text-zinc-500 group-hover:text-rose-300")} />
                  <span className="z-10">{link.name}</span>
                </Link>
              );
            })}
          </nav>
        
        <div className="mt-auto p-6">
          <button
            onClick={() => setIsLogoutConfirmOpen(true)}
            className="flex items-center gap-3 px-3 py-3 rounded-none text-sm font-mono tracking-widest uppercase text-rose-400/50 hover:text-white hover:bg-rose-950/40 w-full transition-all group border border-transparent hover:border-rose-900/50"
          >
            <LogOut className="size-5 group-hover:text-rose-400" />
            <span>KẾT THÚC PHIÊN</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0 relative overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b border-rose-500/20 bg-[#0a0202]/80 backdrop-blur-xl sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-none bg-rose-600 flex items-center justify-center shadow-[0_0_15px_rgba(244,63,94,0.8)] border border-rose-400">
              <ShieldAlert className="size-4 text-[#0f0505]" />
            </div>
            <div className="flex flex-col">
              <h1 className="font-mono font-black text-lg tracking-tighter text-rose-100 leading-none">
                SYS<span className="text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.8)] px-1">ADMIN</span>
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-1 text-zinc-400 hover:text-white">
                <Menu className="size-6" />
             </button>
          </div>
        </header>

        {/* Mobile Slide Menu */}
        {isMobileMenuOpen && (
           <div className="md:hidden fixed inset-0 z-50 flex">
             <div className="absolute inset-0 bg-[#0f0505]/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
             <motion.div 
               initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ bounce: 0 }}
               className="relative ml-auto w-64 max-w-[80%] bg-[#0a0202] border-l border-rose-500/30 h-full flex flex-col p-6 shadow-[-10px_0_30px_rgba(244,63,94,0.1)]"
             >
                <div className="flex items-center gap-3 mb-6">
                  <div className="size-10 rounded-none bg-[#0f0505] border border-rose-900/50 flex items-center justify-center shadow-[inset_0_0_10px_rgba(244,63,94,0.1)]">
                    <UserIcon className="size-5 text-rose-500/80" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-rose-400/80 tracking-widest uppercase mb-1">ID: {user?.username}</p>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-none uppercase tracking-widest bg-rose-600 text-white inline-block shadow-[0_0_10px_rgba(244,63,94,0.5)]">
                      ADMIN
                    </span>
                  </div>
                </div>
                <div className="space-y-1 flex-1">
                  {navLinks.map(link => {
                    const isActive = location.pathname === link.href || (link.href !== '/dashboard' && location.pathname.startsWith(link.href));
                    return (
                      <Link
                        key={link.name}
                        to={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-3 rounded-none text-sm font-mono tracking-widest uppercase transition-all",
                          isActive ? "bg-rose-950/30 text-rose-400 border-l-2 border-rose-400 shadow-[inset_10px_0_20px_rgba(244,63,94,0.05)]" : "text-rose-50/50 hover:text-rose-300 hover:bg-[#0a0202]"
                        )}
                      >
                        <link.icon className="size-5" />
                        {link.name}
                      </Link>
                    )
                  })}
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

        {/* Ambient Light */}
        <div className="fixed top-0 inset-x-0 h-40 bg-gradient-to-b from-rose-900/10 to-transparent pointer-events-none z-0" />
        <div className="fixed bottom-0 inset-x-0 h-64 bg-gradient-to-t from-rose-900/10 to-transparent pointer-events-none z-0" />
        
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
                  }
                }}
                exit={{ opacity: 0, scale: 0.9, y: 20, rotateX: -10 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-full max-w-md bg-[#0a0202] border border-rose-500/40 p-8 z-[110] shadow-[0_0_100px_rgba(244,63,94,0.3)] [clip-path:polygon(20px_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%,0_20px)] perspective-1000"
              >
                <div className="flex flex-col items-center text-center space-y-6">
                   <motion.div 
                     variants={{
                       initial: { scale: 0, rotate: -45 },
                       animate: { scale: 1, rotate: 0 }
                     }}
                     className="size-24 bg-rose-500/10 border border-rose-500/50 flex items-center justify-center relative group"
                   >
                      <LogOut className="size-12 text-rose-500 relative z-10 group-hover:scale-110 transition-transform" />
                   </motion.div>
                   
                   <motion.div 
                     variants={{
                       initial: { opacity: 0, y: 20 },
                       animate: { opacity: 1, y: 0 }
                     }}
                     className="space-y-3"
                   >
                      <h3 className="text-2xl font-black text-rose-500 tracking-[0.2em] uppercase font-mono text-shadow-glow">
                        NGẮT_KẾT_NỐI?
                      </h3>
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-rose-500/30 to-transparent mb-1" />
                      <p className="text-[11px] text-rose-500/60 font-mono uppercase tracking-[0.15em] leading-relaxed">
                        Bạn sắp thoát khỏi hệ thống Admin.
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
                        className="h-14 border-rose-950 text-rose-400 hover:bg-rose-900/30 uppercase tracking-[0.2em] text-[10px] font-black group relative overflow-hidden"
                      >
                       <span className="relative z-10">HỦY BỎ</span>
                      </Button>
                      <Button 
                        variant="danger" 
                        onClick={() => {
                          addNotification('PHIÊN LÀM VIỆC ĐÃ KẾT THÚC', 'Đã đăng xuất khỏi ADMIN.', 'info');
                          logout();
                        }}
                        className="h-14 uppercase tracking-[0.2em] text-[10px] font-black group relative overflow-hidden shadow-[0_0_20px_rgba(244,63,94,0.3)] bg-rose-600/80 text-white"
                      >
                         <span className="relative z-10">XÁC NHẬN</span>
                      </Button>
                   </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Desktop Top Header Bar */}
        <header className="hidden md:flex items-center justify-between px-8 h-12 border-b border-rose-500/20 bg-[#0a0202]/40 backdrop-blur-md sticky top-0 z-40">
           <div className="flex items-center gap-4">
              <div className="px-3 py-1 bg-rose-500/10 border border-rose-500/30 text-[9px] font-mono text-rose-400 tracking-widest uppercase flex items-center gap-2">
                 <div className="size-1 bg-rose-500 rounded-full animate-pulse shadow-[0_0_5px_rose]" />
                 ADMIN_NODE: ONLINE
              </div>
           </div>
        </header>

        <main className="flex-1 overflow-y-auto overflow-x-hidden relative pb-32 md:pb-8 scroll-smooth border-l border-rose-900/40">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(244,63,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(244,63,94,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          <div className="p-4 md:p-8 max-w-6xl mx-auto relative z-10 flex flex-col">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
