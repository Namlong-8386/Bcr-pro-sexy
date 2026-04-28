import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/src/context/AuthContext';
import { useNotifications } from '@/src/context/NotificationContext';
import { Card, CardContent, CardFooter } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Label } from '@/src/components/ui/Label';
import { ShieldAlert, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';

export function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register } = useAuth();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password && password === confirmPassword) {
      try {
        await register(username, password);
        addNotification(
          'ĐĂNG KÝ THÀNH CÔNG',
          `Tài khoản ${username} đã được khởi tạo và cấp quyền truy cập.`,
          'success'
        );
        navigate('/dashboard');
      } catch (error: any) {
        addNotification(
          'ĐĂNG KÝ THẤT BẠI',
          error.message || 'Lỗi hệ thống. Vui lòng thử lại sau.',
          'error'
        );
      }
    } else if (password !== confirmPassword) {
      addNotification('LỖI XÁC THỰC', 'Mật khẩu nhập lại không khớp.', 'error');
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
         
         {/* Vertical config line right */}
         <div className="absolute top-1/4 -right-6 h-1/2 flex flex-col justify-between items-start opacity-40">
             <div className="w-2 h-px bg-cyan-400" />
             <div className="w-1 h-px bg-cyan-400" />
             <div className="w-1.5 h-px bg-cyan-400" />
             <div className="w-4 h-[2px] bg-cyan-400 relative"><div className="absolute top-1 left-0 text-[6px] font-mono whitespace-nowrap text-cyan-400 text-left">INIT_CFG</div></div>
             <div className="w-1.5 h-px bg-cyan-400" />
             <div className="w-1 h-px bg-cyan-400" />
             <div className="w-2 h-px bg-cyan-400" />
         </div>
      </div>

      <div className="flex flex-col mb-8 relative z-30">
        <div className="flex items-start justify-between mb-6">
          <div className="size-16 bg-[#030712]/80 backdrop-blur-sm border border-cyan-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)] relative overflow-hidden [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)]">
             <div className="absolute inset-0 bg-yellow-400/5 animate-pulse" />
             <div className="absolute top-0 left-0 w-full h-[1px] bg-yellow-400/50" />
             <ShieldAlert className="size-8 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)] relative z-10" />
          </div>
          <div className="text-right flex flex-col justify-end">
             <div className="flex items-center justify-end gap-2 mb-1">
                <div className="size-1.5 bg-yellow-400 rounded-none animate-pulse shadow-[0_0_5px_rgba(250,204,21,1)]" />
                <span className="text-[10px] font-mono font-bold text-yellow-400 tracking-widest drop-shadow-[0_0_2px_rgba(250,204,21,0.8)] uppercase border-b border-yellow-400/30 pb-0.5">PENDING_ALLOC</span>
             </div>
             <p className="text-[10px] text-cyan-600 font-mono tracking-widest uppercase">TARGET NODE: UNKNOWN</p>
          </div>
        </div>
        <div className="flex items-center gap-4 mb-2">
           <h2 className="text-3xl font-black tracking-tight text-white uppercase font-mono text-shadow-glow">Đăng Ký</h2>
           <div className="h-px bg-cyan-500/50 flex-1" />
           <span className="text-[10px] font-mono text-cyan-500/50">v4.0</span>
        </div>
        <p className="text-xs font-mono text-cyan-400/70 uppercase tracking-widest">Tạo tài khoản mới.</p>
      </div>

      <div className="relative z-30 mb-8 [clip-path:polygon(15px_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%,0_15px)] bg-[#020617]/95 backdrop-blur-3xl shadow-[0_0_50px_rgba(6,182,212,0.1),inset_0_0_30px_rgba(6,182,212,0.05)] border border-transparent">
        
        {/* HUD Data Headers inside form */}
        <div className="absolute top-0 inset-x-0 h-6 bg-cyan-950/40 border-b border-cyan-500/30 flex items-center justify-between px-4 text-[8px] font-mono uppercase tracking-[0.2em] text-cyan-400">
           <span>DATA_INPUT_REQ</span>
           <span className="animate-pulse flex items-center gap-2"><span className="text-red-400">●</span> REC</span>
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
              <Label htmlFor="password" className="text-cyan-500 group-focus-within:text-cyan-300 transition-colors flex items-center gap-2 text-[10px]">
                <span className="text-cyan-400 animate-pulse">_</span> Mật khẩu
              </Label>
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

            <div className="space-y-2 group">
              <Label htmlFor="confirm" className="text-cyan-500 group-focus-within:text-cyan-300 transition-colors flex items-center gap-2 text-[10px]">
                <span className="text-cyan-400 animate-pulse">_</span> Nhập lại mật khẩu
              </Label>
              <div className="relative bg-[#030712] border border-cyan-900/50 group-focus-within:border-cyan-400/80 transition-colors overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-1 bg-cyan-500/30 group-focus-within:bg-cyan-400 transition-colors" />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-700 text-[10px] pointer-events-none group-focus-within:text-cyan-400 transition-colors">
                  [CHK]
                </div>
                <Input 
                  id="confirm" 
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder="••••••••••••" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-transparent h-12 pl-4 pr-12 border-none shadow-none font-mono focus-visible:ring-0 focus-visible:bg-cyan-950/10 tracking-[0.3em] text-cyan-300"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-12 top-1/2 -translate-y-1/2 text-cyan-700 hover:text-cyan-400 focus:outline-none transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
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
                 [ XÁC NHẬN ĐĂNG KÝ ] <span className="opacity-0 group-hover/btn:opacity-100 transition-opacity animate-pulse text-[#020617]">_</span>
              </span>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-white/30" />
            </Button>
            
            <div className="w-full h-px bg-cyan-900/50 relative flex items-center justify-center">
              <span className="bg-[#020617] px-2 text-[10px] font-mono text-cyan-600 border border-cyan-900/50">ROUTING</span>
            </div>

            <p className="text-xs text-cyan-600 font-mono text-center">
              Đã có tài khoản?{' '}
              <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-bold tracking-widest uppercase ml-1 relative group/link inline-block">
                ĐĂNG NHẬP TẠI ĐÂY
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 transition-all group-hover/link:w-full" />
              </Link>
            </p>
          </CardFooter>
        </form>
      </div>

      {/* Footer Cyber text */}
      <div className="text-center flex flex-col gap-1 items-center justify-center pointer-events-none relative z-30">
        <p className="text-[9px] text-cyan-800 font-mono uppercase tracking-[0.2em]">AWAITING_SYNC_HASH_GENERATION // PORT_3000</p>
        <div className="flex gap-1 mt-1">
           <div className="w-3 h-1 bg-yellow-400/80 animate-pulse" />
           <div className="w-1.5 h-1 bg-cyan-900/50" />
           <div className="w-1.5 h-1 bg-cyan-900/50" />
           <div className="w-10 h-1 bg-cyan-900/30 ml-2" />
        </div>
      </div>
    </motion.div>
  );
}
