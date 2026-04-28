import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { History, ArrowDownLeft, ArrowUpRight, Search, Filter, Calendar, RefreshCcw, ExternalLink, AlertTriangle, ShoppingCart, Coins, LogOut as WithdrawalIcon, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { cn } from '@/src/lib/utils';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'purchase';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  description: string;
}

export function HistoryPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/v1/transactions');
      const result = await response.json();
      if (result.success) {
        setTransactions(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="space-y-8 pb-10">
      {/* Header Section */}
      <section className="relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
             <div className="flex items-center gap-2 text-cyan-500/60 font-mono text-[10px] tracking-widest uppercase">
                <History className="size-3" />
                <span>Financial_Ledger_v4.2</span>
             </div>
             <h1 className="text-4xl font-black text-white tracking-tight uppercase font-mono italic">Lịch sử <span className="text-cyan-400">Giao dịch</span></h1>
             <p className="text-zinc-500 max-w-xl text-xs font-mono uppercase tracking-wider">Theo dõi và quản lý mọi dòng tiền lưu chuyển trong hệ thống AI của bạn.</p>
          </div>

          <div className="flex items-center gap-3">
             <Button 
               variant="outline" 
               onClick={fetchTransactions}
               className="border-cyan-500/20 text-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/10 h-10 px-4 text-[10px] tracking-widest uppercase font-mono"
             >
                <RefreshCcw className={cn("size-3 mr-2", loading && "animate-spin")} />
                LÀM MỚI
             </Button>
          </div>
        </div>
      </section>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         {[
           { label: 'Tổng Nạp', value: '1.500.000', color: 'cyan', icon: ArrowDownLeft },
           { label: 'Tổng Tiêu', value: '800.000', color: 'rose', icon: ArrowUpRight },
           { label: 'Số Dư Hiện Tại', value: '700.000', color: 'emerald', icon: Coins },
         ].map((stat, i) => (
           <motion.div
             key={stat.label}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             className="bg-[#030712]/60 border border-cyan-500/10 p-6 relative group overflow-hidden"
           >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                 <stat.icon className="size-12" />
              </div>
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className={cn("text-2xl font-black font-mono", 
                stat.color === 'cyan' ? "text-cyan-400" : 
                stat.color === 'rose' ? "text-rose-400" : 
                "text-emerald-400"
              )}>
                 {stat.value} <span className="text-xs">Credit</span>
              </h3>
              <div className={cn("absolute bottom-0 left-0 h-0.5 transition-all w-0 group-hover:w-full",
                stat.color === 'cyan' ? "bg-cyan-500" : 
                stat.color === 'rose' ? "bg-rose-500" : 
                "bg-emerald-500"
              )} />
           </motion.div>
         ))}
      </div>

      {/* Transactions Table Container */}
      <div className="bg-[#030712]/40 border border-cyan-500/10 backdrop-blur-md relative min-h-[400px]">
         {loading && (
           <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
              <div className="flex flex-col items-center gap-3">
                 <Loader2 className="size-8 text-cyan-400 animate-spin" />
                 <span className="text-[10px] font-mono text-cyan-400 tracking-[0.2em] uppercase">Đang đồng bộ dữ liệu...</span>
              </div>
           </div>
         )}
         
         {/* Filters Bar */}
         <div className="p-4 border-b border-cyan-500/10 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-80 group">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-600 group-focus-within:text-cyan-400 transition-colors" />
               <Input 
                 placeholder="TÌM THEO MÃ GIAO DỊCH..." 
                 className="pl-10 h-10 border-cyan-900/50 bg-black/40 text-[10px] font-mono tracking-widest focus:border-cyan-500/50 rounded-none"
               />
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
               <div className="flex items-center gap-2 bg-black/40 border border-cyan-900/50 px-3 h-10 text-[10px] font-mono text-zinc-500 flex-1 md:flex-none">
                  <Filter className="size-3" />
                  <span>TRẠNG THÁI</span>
               </div>
               <div className="flex items-center gap-2 bg-black/40 border border-cyan-900/50 px-3 h-10 text-[10px] font-mono text-zinc-500 flex-1 md:flex-none">
                  <Calendar className="size-3" />
                  <span>NGÀY THÁNG</span>
               </div>
            </div>
         </div>

         {/* Grid View for Mobile / Table for Desktop */}
         <div className="overflow-x-auto">
            <table className="w-full text-left font-mono">
               <thead className="text-[10px] text-zinc-600 uppercase tracking-widest border-b border-cyan-500/10">
                  <tr>
                     <th className="px-6 py-4 font-bold">Mã Giao Dịch</th>
                     <th className="px-6 py-4 font-bold">Loại</th>
                     <th className="px-6 py-4 font-bold">Mô Tả</th>
                     <th className="px-6 py-4 font-bold">Số Tiền</th>
                     <th className="px-6 py-4 font-bold">Ngày</th>
                     <th className="px-6 py-4 font-bold">Trạng Thái</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-cyan-500/5">
                  {transactions.length > 0 ? transactions.map((txn, idx) => (
                    <motion.tr 
                      key={txn.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group hover:bg-cyan-500/5 transition-colors"
                    >
                       <td className="px-6 py-4">
                          <span className="text-[10px] text-white font-bold tracking-tight">{txn.id}</span>
                       </td>
                       <td className="px-6 py-4">
                          <div className={cn("inline-flex items-center gap-2 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider shadow-sm",
                            txn.type === 'deposit' ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" :
                            txn.type === 'purchase' ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" :
                            "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                          )}>
                             {txn.type === 'deposit' && <Coins className="size-3" />}
                             {txn.type === 'withdrawal' && <WithdrawalIcon className="size-3" />}
                             {txn.type === 'purchase' && <ShoppingCart className="size-3" />}
                             {txn.type === 'deposit' ? 'Nạp Tiền' : txn.type === 'purchase' ? 'Thanh Toán' : 'Rút Tiền'}
                          </div>
                       </td>
                       <td className="px-6 py-4">
                          <p className="text-[10px] text-zinc-400 max-w-[200px] truncate">{txn.description}</p>
                       </td>
                       <td className="px-6 py-4">
                          <span className={cn("text-[11px] font-bold", 
                            txn.type === 'deposit' ? "text-emerald-400" : "text-white"
                          )}>
                             {txn.type === 'deposit' ? '+' : '-'}{txn.amount.toLocaleString()} Credit
                          </span>
                       </td>
                       <td className="px-6 py-4">
                          <span className="text-[10px] text-zinc-600">{txn.date}</span>
                       </td>
                       <td className="px-6 py-4">
                          <div className={cn("flex items-center gap-1.5 text-[9px] font-bold uppercase",
                            txn.status === 'completed' ? "text-emerald-500" :
                            txn.status === 'pending' ? "text-amber-500 animate-pulse" :
                            "text-rose-500"
                          )}>
                             <div className={cn("size-1 rounded-full",
                               txn.status === 'completed' ? "bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" :
                               txn.status === 'pending' ? "bg-amber-500 shadow-[0_0_5px_rgba(245,158,11,0.5)]" :
                               "bg-rose-500 shadow-[0_0_5px_rgba(244,63,94,0.5)]"
                             )} />
                             {txn.status}
                          </div>
                       </td>
                    </motion.tr>
                  )) : !loading && (
                    <tr>
                      <td colSpan={6} className="px-6 py-20 text-center">
                        <div className="flex flex-col items-center gap-4 opacity-40">
                           <History className="size-12 text-zinc-600" />
                           <p className="text-[10px] font-mono tracking-widest uppercase">Không tìm thấy dữ liệu giao dịch</p>
                        </div>
                      </td>
                    </tr>
                  )}
               </tbody>
            </table>
         </div>

         {/* Pagination Footer */}
         <div className="p-4 border-t border-cyan-500/10 flex items-center justify-between">
            <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Hiển thị {transactions.length} giao dịch gần đây</span>
            <div className="flex items-center gap-2">
               <button className="px-3 py-1 border border-cyan-900/50 text-zinc-600 hover:text-cyan-400 transition-colors text-[9px] font-bold cursor-not-allowed">TRƯỚC</button>
               <button className="px-3 py-1 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition-colors text-[9px] font-bold">SAU</button>
            </div>
         </div>
      </div>

      {/* Support Message */}
      <Card className="bg-rose-500/5 border-rose-500/20 rounded-none relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <AlertTriangle className="size-16 text-rose-500" />
         </div>
         <CardContent className="p-6">
            <div className="flex items-start gap-4">
               <div className="p-2 bg-rose-500/10 border border-rose-500/30">
                  <ExternalLink className="size-5 text-rose-500" />
               </div>
               <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-widest font-mono mb-1">Cần hỗ trợ về giao dịch?</h4>
                  <p className="text-xs text-zinc-500 font-mono">Nếu bạn phát hiện sai sót hoặc giao dịch không được cập nhật sau 30 phút, vui lòng liên hệ bộ phận hỗ trợ kỹ thuật ngay lập tức để được xử lý.</p>
                  <Button variant="link" className="p-0 h-auto text-[10px] text-rose-400 uppercase tracking-widest mt-2 hover:text-rose-300 font-bold">
                    Liên hệ Support →
                  </Button>
               </div>
            </div>
         </CardContent>
      </Card>
    </div>
  );
}
