import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/src/context/AuthContext';
import { useNotifications } from '@/src/context/NotificationContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Label } from '@/src/components/ui/Label';
import { ShieldAlert, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      try {
        await login(username, password);
        addNotification(
          'ĐĂNG NHẬP THÀNH CÔNG',
          `Chào mừng ${username} đã quay trở lại hệ thống điều hành AI.`,
          'success'
        );
        navigate('/dashboard');
      } catch (error: any) {
        addNotification(
          'ĐĂNG NHẬP THẤT BẠI',
          error.message || 'Hệ thống từ chối truy cập. Vui lòng kiểm tra lại.',
          'error'
        );
      }
    }
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} transition={{ duration: 0.5, ease: "easeOut" }} className="relative">
      
      {/* Decorative Frame Elements */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-20">
         <svg className="absolute w-full h-full stroke-cyan-500/30 fill-none" preserveAspectRatio="none">
            {/* Main border frame */}
            <path d="M 15 0 L 100% 0 L 100% calc(100% - 15px) L calc(100% - 15px) 100% L 0 100% L 0 15 Z" strokeWidth="1" />
            
            {/* Highlighted sections */}
            <path d="M 0 20 L 0 40 M 100% calc(100% - 40px) L 100% calc(100% - 20px)" strokeWidth="3" className="stroke-cyan-400" />
            <path d="M 40 0 L 60 0" strokeWidth="3" className="stroke-cyan-400" />
            
            {/* Additional tech accents */}
            <path d="M 0 100 L 10 110 M 100% 100 L calc(100% - 10px) 110" strokeWidth="1" className="stroke-cyan-500/40" />
            
            {/* Inner frame accents */}
            <path d="M 25 10 L 10 25 M calc(100% - 25px) calc(100% - 10px) L calc(100% - 10px) calc(100% - 25px)" strokeWidth="1" className="stroke-cyan-500/50" />
         </svg>
         
         {/* Corner Nodes */}
         <div className="absolute -top-1 -left-1 size-2 border border-cyan-400 bg-[#020617] shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
         <div className="absolute -top-1 -right-1 size-2 border border-cyan-400 bg-[#020617] shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
         <div className="absolute -bottom-1 -left-1 size-2 border border-cyan-400 bg-[#020617] shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
         <div className="absolute -bottom-1 -right-1 size-2 border border-cyan-400 bg-[#020617] shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
         
         {/* Vertical ruler left */}
         <div className="absolute top-1/4 -left-6 h-1/2 flex flex-col justify-between items-end opacity-40">
             <div className="w-2 h-px bg-cyan-400" />
             <div className="w-1 h-px bg-cyan-400" />
             <div className="w-1.5 h-px bg-cyan-400" />
             <div className="w-4 h-[2px] bg-cyan-400 relative"><div className="absolute top-1 right-0 text-[6px] font-mono whitespace-nowrap text-cyan-400">OFFSET_Y</div></div>
             <div className="w-1.5 h-px bg-cyan-400" />
             <div className="w-1 h-px bg-cyan-400" />
             <div className="w-2 h-px bg-cyan-400" />
         </div>
      </div>

      <div className="flex flex-col mb-10 relative z-30">
        <div className="flex flex-col items-center justify-center mb-8 relative">
           {/* LOGO SECTION */}
           <motion.div 
             initial={{ y: -20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="relative"
           >
             <div className="absolute -inset-10 bg-cyan-500/10 blur-[50px] rounded-full animate-pulse" />
             
             <div className="relative flex flex-col items-center">
                <div className="flex items-center gap-3 mb-1">
                   <h1 className="text-4xl md:text-5xl font-black tracking-[-0.05em] text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                     BACCARAT <span className="text-cyan-400 text-shadow-glow">PRO</span>
                   </h1>
                   <div className="relative">
                      <div className="absolute inset-0 bg-rose-500 blur-sm opacity-50 animate-pulse" />
                      <div className="relative px-3 py-1 bg-rose-500 text-white text-[12px] font-black italic tracking-widest skew-x-[-15deg] shadow-[3px_3px_0_rgba(0,0,0,0.5)]">
                        SEXY
                      </div>
                   </div>
                </div>
                
                <div className="flex items-center gap-4 w-full px-2">
                   <div className="h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent flex-1" />
                   <span className="text-[10px] font-mono font-bold text-cyan-500/80 tracking-[0.4em] uppercase">
                     Your Premium AI Tool
                   </span>
                   <div className="h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent flex-1" />
                </div>
             </div>

             {/* Decorative Background SVG Elements */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-10">
                <svg width="300" height="120" viewBox="0 0 300 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <circle cx="150" cy="60" r="58" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400" strokeDasharray="4 4" />
                   <path d="M0 60 H300" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400" />
                   <path d="M150 0 V120" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400" />
                </svg>
             </div>
           </motion.div>
        </div>

        <div className="flex items-center gap-4 mb-2">
           <div className="flex flex-col">
              <h2 className="text-2xl font-black tracking-tight text-white uppercase font-mono">Đăng Nhập</h2>
              <div className="h-1 w-12 bg-cyan-500 mt-1" />
           </div>
           <div className="h-px bg-cyan-500/30 flex-1" />
           <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-600">
              <span className="animate-pulse">●</span>
              <span>CONNECTION: ENCRYPTED</span>
           </div>
        </div>
        <p className="text-[10px] font-mono text-cyan-400/50 uppercase tracking-widest">Hệ thống xác thực sinh trắc học đang chờ xử lý tín hiệu đầu vào.</p>
      </div>

      <div className="relative z-30 mb-8 [clip-path:polygon(15px_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%,0_15px)] bg-[#020617]/95 backdrop-blur-3xl shadow-[0_0_50px_rgba(6,182,212,0.1),inset_0_0_30px_rgba(6,182,212,0.05)] border border-transparent">
        
        {/* HUD Data Headers inside form */}
        <div className="absolute top-0 inset-x-0 h-6 bg-cyan-950/40 border-b border-cyan-500/30 flex items-center justify-between px-4 text-[8px] font-mono uppercase tracking-[0.2em] text-cyan-400">
           <span>MEM_ADDR: 0x00FF81</span>
           <span className="animate-pulse flex items-center gap-2"><span className="text-cyan-400">■</span> WAITING_INPUT</span>
        </div>

        <form onSubmit={handleSubmit} className="pt-10">
          <CardContent className="pt-8 space-y-6">
            <div className="space-y-2 group">
              <Label htmlFor="username" className="text-cyan-500 group-focus-within:text-cyan-300 transition-colors flex items-center gap-2 text-[10px]">
                <span className="text-cyan-400 animate-pulse">_</span> Tên đăng nhập
              </Label>
              <div className="relative bg-[#030712] border border-cyan-900/50 group-focus-within:border-cyan-400/80 transition-colors overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-1 bg-cyan-500/30 group-focus-within:bg-cyan-400 transition-colors" />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-700 text-[10px] pointer-events-none group-focus-within:text-cyan-400 transition-colors">
                  [USR]
                </div>
                <Input 
                  id="username" 
                  placeholder="Nhập tên đăng nhập" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="bg-transparent h-12 pl-4 pr-12 border-none shadow-none font-sans focus-visible:ring-0 focus-visible:bg-cyan-950/10 placeholder:text-cyan-800 uppercase text-cyan-100"
                />
              </div>
            </div>
            
            <div className="space-y-2 group">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-cyan-500 group-focus-within:text-cyan-300 transition-colors flex items-center gap-2 text-[10px]">
                  <span className="text-cyan-400 animate-pulse">_</span> Mật khẩu
                </Label>
                <Link to="#" className="text-[9px] text-cyan-600 hover:text-cyan-400 font-mono tracking-widest uppercase transition-colors">Quên mật khẩu?</Link>
              </div>
              <div className="relative bg-[#030712] border border-cyan-900/50 group-focus-within:border-cyan-400/80 transition-colors overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-1 bg-cyan-500/30 group-focus-within:bg-cyan-400 transition-colors" />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-700 text-[10px] pointer-events-none group-focus-within:text-cyan-400 transition-colors">
                  [PWD]
                </div>
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-transparent h-12 pl-4 pr-12 border-none shadow-none font-mono focus-visible:ring-0 focus-visible:bg-cyan-950/10 tracking-[0.3em] text-cyan-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-12 top-1/2 -translate-y-1/2 text-cyan-700 hover:text-cyan-400 focus:outline-none transition-colors"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {/* Fake progress/loading visualizer */}
            <div className="flex gap-1 h-1.5 opacity-60">
              {[...Array(20)].map((_, i) => (
                <div key={i} className={`h-full flex-1 ${i < (password.length * 2) ? 'bg-cyan-400 shadow-[0_0_5px_rgba(6,182,212,0.8)]' : 'bg-cyan-900/40'}`} />
              ))}
            </div>

          </CardContent>
          <CardFooter className="flex-col gap-6 pb-8 bg-gradient-to-t from-cyan-950/20 to-transparent pt-4">
            <Button variant="glow" type="submit" className="w-full h-14 text-base font-black shadow-[0_0_20px_rgba(6,182,212,0.3)] tracking-widest uppercase relative overflow-hidden group/btn bg-cyan-500 text-[#020617] hover:bg-cyan-400 [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)]">
              <span className="relative z-10 flex items-center justify-center gap-2">
                 [ ĐĂNG NHẬP NGAY ] <span className="opacity-0 group-hover/btn:opacity-100 transition-opacity animate-pulse text-[#020617]">_</span>
              </span>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-white/30" />
            </Button>
            
            <div className="w-full h-px bg-cyan-900/50 relative flex items-center justify-center">
              <span className="bg-[#020617] px-2 text-[10px] font-mono text-cyan-600 border border-cyan-900/50">ROUTING</span>
            </div>

            <p className="text-xs text-cyan-600 font-mono text-center">
              Chưa có tài khoản?{' '}
              <Link to="/register" className="text-cyan-400 hover:text-cyan-300 font-bold tracking-widest uppercase ml-1 relative group/link inline-block">
                ĐĂNG KÝ TẠI ĐÂY
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 transition-all group-hover/link:w-full" />
              </Link>
            </p>
          </CardFooter>
        </form>
      </div>
      
      {/* Footer Cyber text */}
      <div className="text-center flex flex-col gap-1 items-center justify-center pointer-events-none relative z-30">
        <p className="text-[9px] text-cyan-800 font-mono uppercase tracking-[0.2em]">VER: 4.0.0.12 // PORT_3000</p>
        <div className="flex gap-1 mt-1">
           <div className="w-3 h-1 bg-cyan-400/80 animate-pulse" />
           <div className="w-1.5 h-1 bg-cyan-900/50" />
           <div className="w-1.5 h-1 bg-cyan-900/50" />
           <div className="w-6 h-1 bg-cyan-900/30 ml-2" />
        </div>
      </div>
    </motion.div>
  );
}
