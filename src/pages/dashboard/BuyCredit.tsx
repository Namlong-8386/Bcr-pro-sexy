import { useState } from 'react';
import { useAuth } from '@/src/context/AuthContext';
import { useNotifications } from '@/src/context/NotificationContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Coins, QrCode, Copy, CheckCircle2, WalletCards } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

export function BuyCredit() {
  const { updateBalance } = useAuth();
  const { addNotification } = useNotifications();
  const [amount, setAmount] = useState<number>(0);
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);

  const amounts = [50000, 100000, 200000, 500000, 1000000, 2000000];

  const handleCopy = () => {
    navigator.clipboard.writeText('0123456789');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleComplete = () => {
    updateBalance(amount);
    addNotification(
      'NẠP CREDIT THÀNH CÔNG',
      `Tài khoản của bạn đã được cộng ${amount.toLocaleString('vi-VN')} Credit từ hệ thống xử lý tự động.`,
      'success'
    );
    setAmount(0);
    setStep(1);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-mono font-bold text-white mb-2 tracking-widest text-shadow-glow">CREDIT ACQUISITION</h2>
        <p className="text-cyan-400/60 font-mono text-sm tracking-wide uppercase">Cổng nạp Credit tự động hóa - Hệ thống xử lý thời gian thực.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-[#020617]/80 border border-cyan-500/30 overflow-hidden shadow-[inset_0_0_30px_rgba(6,182,212,0.05),0_0_20px_rgba(6,182,212,0.1)] [clip-path:polygon(0_0,calc(100%-20px)_0,100%_20px,100%_100%,20px_100%,0_calc(100%-20px))] relative group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 saturate-0 mix-blend-overlay pointer-events-none" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[100px] pointer-events-none transition-opacity opacity-50 group-hover:opacity-100" />
            
            {/* Tech Corner details */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-cyan-400/50" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-cyan-400/50" />

            <div className="p-6 border-b border-cyan-500/20 bg-cyan-950/20 relative z-10 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-none bg-cyan-500 text-[#020617] shadow-[0_0_15px_rgba(6,182,212,0.6)] font-mono text-lg font-black relative">
                  <span className="relative z-10">1</span>
                  <div className="absolute inset-0 border border-cyan-300 m-[-4px]" />
                </div>
                <div className="flex-1 h-1 bg-[#010308] rounded-none overflow-hidden border border-cyan-900/50 relative">
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_50%,rgba(255,255,255,0.1)_50%)] bg-[length:4px_100%] pointer-events-none" />
                  <div 
                    className="h-full bg-cyan-500 transition-all duration-500 shadow-[0_0_10px_rgba(6,182,212,0.8)] relative"
                    style={{ width: step === 1 ? '50%' : '100%' }}
                  >
                     <div className="absolute right-0 top-0 w-2 h-full bg-white/50 animate-[scan_1s_ease-in-out_infinite]" />
                  </div>
                </div>
                <div className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-none transition-colors border font-mono text-lg font-black relative",
                  step === 2 ? "bg-cyan-500/20 border-cyan-400 text-cyan-400 shadow-[inset_0_0_15px_rgba(6,182,212,0.5),0_0_15px_rgba(6,182,212,0.3)]" : "bg-[#030712] border-cyan-900/50 text-cyan-900"
                )}>
                  <span className="relative z-10">2</span>
                  {step === 2 && <div className="absolute inset-0 border border-cyan-500/50 m-[-4px]" />}
                </div>
              </div>
            </div>

            <div className="p-8 relative z-10">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Chọn gói Credit</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {amounts.map((v) => (
                          <button
                            key={v}
                            type="button"
                            onClick={() => setAmount(v)}
                            className={cn(
                              "py-4 rounded-none border text-center transition-all duration-300 relative group overflow-hidden",
                              amount === v 
                                ? "border-cyan-400 bg-cyan-950/30 shadow-[inset_0_0_15px_rgba(6,182,212,0.2),0_0_10px_rgba(6,182,212,0.2)]" 
                                : "border-cyan-900/50 bg-[#030712]/50 hover:bg-cyan-950/20 hover:border-cyan-500/50"
                            )}
                          >
                            <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className={cn(
                              "text-lg font-mono font-bold mb-1 tracking-wider",
                              amount === v ? "text-cyan-400 text-shadow-glow" : "text-cyan-50"
                            )}>
                              {v.toLocaleString('vi-VN')}
                            </div>
                            <div className="text-xs text-cyan-600 font-mono">CREDIT</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <Button 
                        variant="glow"
                        disabled={amount === 0} 
                        onClick={() => setStep(2)}
                        className="px-8 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                      >
                        TIẾP TỤC THANH TOÁN
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-8"
                  >
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-white mb-2">Thanh toán chuyển khoản</h3>
                      <p className="text-sm text-zinc-400">Vui lòng chuyển khoản với nội dung chính xác để hệ thống tự động cộng Credit.</p>
                    </div>

                    <div className="bg-[#030712]/80 rounded-none p-6 border border-cyan-500/20 flex flex-col md:flex-row gap-8 items-center justify-center shadow-[inset_0_0_20px_rgba(6,182,212,0.05)]">
                      <div className="w-48 h-48 bg-[#020617] p-2 rounded-none flex-shrink-0 relative overflow-hidden isolate border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                         <div className="w-full h-full border border-dashed border-cyan-500/30 flex items-center justify-center bg-cyan-950/20 text-cyan-500/50 relative overflow-hidden">
                           <div className="absolute top-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)] animate-[scan_2s_ease-in-out_infinite]" />
                           <QrCode className="size-16 opacity-30 drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]" />
                           <span className="absolute text-[10px] font-mono tracking-widest uppercase bottom-4 text-cyan-400">QR MAPPING</span>
                         </div>
                      </div>

                      <div className="flex-1 space-y-4 w-full">
                        <div className="space-y-1">
                          <p className="text-[10px] text-cyan-600 font-mono tracking-widest uppercase">Ngân hàng</p>
                          <p className="text-lg font-bold text-white tracking-widest">MB BANK (SYSTEM)</p>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-[10px] text-cyan-600 font-mono tracking-widest uppercase">Người thụ hưởng</p>
                          <p className="text-lg font-bold text-white tracking-widest">NGUYEN VAN A</p>
                        </div>

                        <div className="space-y-1">
                          <p className="text-[10px] text-cyan-600 font-mono tracking-widest uppercase">Số tài khoản</p>
                          <div className="flex items-center gap-3">
                            <p className="text-xl font-mono text-cyan-400 font-bold tracking-wider drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]">0123456789</p>
                            <button 
                              onClick={handleCopy}
                              className="p-1.5 rounded-none border border-cyan-500/30 bg-cyan-950/50 hover:bg-cyan-500/20 text-cyan-400 transition-colors"
                            >
                              {copied ? <CheckCircle2 className="size-4 text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.8)]" /> : <Copy className="size-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <p className="text-[10px] text-cyan-600 font-mono tracking-widest uppercase">Số tiền thanh toán</p>
                          <p className="text-2xl font-mono font-bold text-white">{amount.toLocaleString('vi-VN')} <span className="text-sm font-normal text-cyan-500/50">Credit</span></p>
                        </div>
                        
                        <div className="p-4 bg-cyan-950/30 border border-cyan-500/30 rounded-none shadow-[inset_0_0_10px_rgba(6,182,212,0.1)]">
                          <p className="text-[10px] text-cyan-400 font-mono mb-1 tracking-widest uppercase">Nội dung chuyển khoản</p>
                          <p className="text-lg font-mono font-bold text-cyan-50 tracking-widest text-shadow-glow">BUY CREDIT</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4">
                      <Button variant="outline" className="border-cyan-800 text-cyan-500 rounded-none font-mono tracking-widest uppercase hover:bg-cyan-950/30" onClick={() => setStep(1)}>
                        HỦY BỎ
                      </Button>
                      <Button onClick={handleComplete} className="bg-emerald-600 hover:bg-emerald-500 border border-emerald-400/50 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] rounded-none font-bold uppercase tracking-widest font-mono">
                        XÁC NHẬN NẠP CREDIT
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-[#020617]/80 border border-cyan-500/20 relative overflow-hidden sticky top-8 shadow-[inset_0_0_20px_rgba(6,182,212,0.05)] [clip-path:polygon(0_0,100%_0,100%_100%,20px_100%,0_calc(100%-20px))]">
            <div className="absolute top-0 right-0 p-16 bg-blue-500/10 translate-x-1/2 -translate-y-1/3 rounded-full blur-[50px] pointer-events-none" />
            <div className="relative z-10 border-b border-cyan-900/50 pb-4 pt-6 px-6 bg-cyan-950/10">
              <h3 className="text-sm font-mono tracking-widest text-cyan-400 flex items-center gap-2 uppercase">
                <Coins className="size-5 text-cyan-400" /> THÔNG TIN NẠP
              </h3>
            </div>
            <div className="relative z-10 space-y-4 pt-6 p-6">
              <ul className="space-y-4 text-sm text-cyan-50/70 font-mono">
                <li className="flex gap-3">
                  <div className="mt-1.5 size-1.5 rounded-none bg-cyan-500 shrink-0 shadow-[0_0_5px_rgba(6,182,212,0.8)]" />
                  Hệ thống xử lý Credit tự động 24/7.
                </li>
                <li className="flex gap-3">
                  <div className="mt-1.5 size-1.5 rounded-none bg-cyan-500 shrink-0 shadow-[0_0_5px_rgba(6,182,212,0.8)]" />
                  Ghi đúng nội dung "BUY CREDIT" để được duyệt ngay lập tức.
                </li>
                <li className="flex gap-3">
                  <div className="mt-1.5 size-1.5 rounded-none bg-rose-500 shrink-0 shadow-[0_0_5px_rgba(244,63,94,0.8)]" />
                  Lưu ý: Credit sau khi mua không quy đổi lại tiền mặt.
                </li>
              </ul>

              <div className="mt-8 p-4 rounded-none bg-[#030712]/50 border border-cyan-900/50 shadow-[inset_0_0_10px_rgba(6,182,212,0.05)]">
                <p className="text-[10px] text-cyan-600 mb-2 font-mono uppercase tracking-widest">Connect Support Node</p>
                <Button variant="outline" className="w-full font-mono text-cyan-400 border-cyan-800 hover:bg-cyan-950/50">
                  @Hotro_System
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
