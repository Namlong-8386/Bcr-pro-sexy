import { useState, useEffect } from 'react';
import { useAuth } from '@/src/context/AuthContext';
import { useNotifications } from '@/src/context/NotificationContext';
import { Button } from '@/src/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Input } from '@/src/components/ui/Input';
import { ShieldAlert, Users, Search, Lock, Unlock, Trash2, PlusCircle, CreditCard, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { Navigate } from 'react-router-dom';

interface UserData {
  id: string;
  username: string;
  balance: number;
  plan: string;
  status: 'active' | 'locked';
}

export function UserManagement() {
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Custom credit modal state
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [creditAmount, setCreditAmount] = useState<string>('');

  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<{ id: string, username: string } | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/v1/admin/users', {
        headers: {
          'Authorization': `Bearer ${user?.username}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setUsers(data.data);
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách người dùng:', error);
      addNotification('LỖI KẾT NỐI', 'Không thể lấy dữ liệu từ máy chủ', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = async (id: string, action: string, amount?: number) => {
    try {
      const response = await fetch(`/api/v1/admin/users/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, amount })
      });
      const data = await response.json();
      if (data.success) {
        addNotification('XỬ LÝ THÀNH CÔNG', `Đã thực hiện lệnh [${action.toUpperCase()}] cho người dùng`, 'success');
        fetchUsers();
        if (action === 'add_credit') {
          setIsCreditModalOpen(false);
          setCreditAmount('');
        }
      } else {
        addNotification('XỬ LÝ THẤT BẠI', data.message || 'Lệnh hệ thống bị từ chối', 'error');
      }
    } catch (error) {
      addNotification('LỖI KẾT NỐI', 'Không thể gửi lệnh đến máy chủ', 'error');
    }
  };

  const openCreditModal = (id: string) => {
    setSelectedUserId(id);
    setIsCreditModalOpen(true);
  };

  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(search.toLowerCase()) || 
    u.id.toLowerCase().includes(search.toLowerCase())
  );

  if (user?.username.toLowerCase() !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-500 relative">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <div>
           <h2 className="text-2xl font-bold font-mono text-white tracking-widest uppercase text-shadow-glow flex items-center gap-3">
             <ShieldAlert className="size-6 text-rose-500" /> QUẢN LÝ NGƯỜI DÙNG SYSTEM
           </h2>
           <p className="text-cyan-500/70 text-xs font-mono tracking-[0.2em] uppercase mt-1">Cấp quyền SysAdmin - Node V4</p>
        </div>
        
        <div className="w-full md:w-96 relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="size-4 text-cyan-600 group-focus-within:text-cyan-400 group-focus-within:drop-shadow-[0_0_5px_cyan] transition-all" />
          </div>
          <Input 
            placeholder="Tìm theo mã ID hoặc tên tài khoản..." 
            className="pl-10 h-12 w-full bg-[#020617]/50 border-cyan-800/50 shadow-[inset_0_0_15px_rgba(6,182,212,0.05)] text-cyan-400 font-mono focus-visible:border-cyan-400 focus-visible:shadow-[inset_0_0_20px_rgba(6,182,212,0.1),0_0_15px_rgba(6,182,212,0.2)] transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Card className="bg-[#020617]/80 border-cyan-500/20 shadow-[0_0_50px_rgba(6,182,212,0.05)] rounded-none relative overflow-hidden backdrop-blur-xl">
         {/* Cyber Background */}
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(6,182,212,0.05),transparent_50%)]" />
         <div className="absolute top-0 right-0 size-32 border-r-2 border-t-2 border-cyan-500/10" />
         <div className="absolute bottom-0 left-0 size-32 border-l-2 border-b-2 border-cyan-500/10" />

         <CardContent className="p-0 z-10 relative">
           <div className="overflow-x-auto w-full custom-scrollbar">
             <table className="w-full text-left font-mono">
               <thead>
                 <tr className="border-b border-cyan-900/50 bg-cyan-950/20 text-cyan-500/80 text-[10px] uppercase tracking-[0.2em]">
                   <th className="p-4 font-normal">Mã U_ID</th>
                   <th className="p-4 font-normal">Tài khoản</th>
                   <th className="p-4 font-normal">Sổ cái Credit</th>
                   <th className="p-4 font-normal text-center">Gói Class</th>
                   <th className="p-4 font-normal text-center">Trạng thái Node</th>
                   <th className="p-4 font-normal text-right">Lệnh thực thi</th>
                 </tr>
               </thead>
               <tbody className="text-sm">
                 {isLoading ? (
                   <tr>
                     <td colSpan={6} className="h-64 text-center text-cyan-500/50">
                       <div className="flex flex-col items-center justify-center space-y-4">
                         <div className="size-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_cyan]" />
                         <span className="text-[10px] font-mono tracking-widest uppercase">ĐANG KẾT NỐI TỚI DATABASE LÕI...</span>
                       </div>
                     </td>
                   </tr>
                 ) : filteredUsers.length === 0 ? (
                   <tr>
                     <td colSpan={6} className="h-40 text-center text-cyan-600 font-mono text-[10px] uppercase tracking-widest opacity-50">
                       Không tìm thấy kết quả khớp lệnh
                     </td>
                   </tr>
                 ) : (
                   filteredUsers.map((u, i) => (
                     <motion.tr 
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: i * 0.05 }}
                       key={u.id} 
                       className="border-b border-cyan-900/20 hover:bg-cyan-500/5 transition-colors group"
                     >
                       <td className="p-4">
                         <span className="text-[10px] tracking-wider text-cyan-600 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_5px_cyan] transition-all">
                           [{u.id}]
                         </span>
                       </td>
                       <td className="p-4">
                         <div className="flex items-center gap-2">
                            <Users className="size-3 text-cyan-500/50" />
                            <span className="font-bold text-cyan-50 uppercase tracking-widest">{u.username}</span>
                         </div>
                       </td>
                       <td className="p-4">
                         <span className="text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.3)] font-bold">
                           {u.balance.toLocaleString('vi-VN')}
                         </span>
                       </td>
                       <td className="p-4 text-center">
                         <span className={cn(
                           "text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-none inline-block",
                           u.plan === 'vip' ? "bg-cyan-500 text-[#020617] shadow-[0_0_10px_rgba(6,182,212,0.5)]" :
                           u.plan === 'premium' ? "bg-blue-500/20 text-blue-400 border border-blue-500/50" :
                           "bg-zinc-800 border border-zinc-700 text-zinc-400"
                         )}>
                           {u.plan}
                         </span>
                       </td>
                       <td className="p-4 text-center">
                         <div className="flex items-center justify-center gap-2">
                           <div className={cn("size-2 bg-rose-500 rounded-none shadow-[0_0_8px_rgba(244,63,94,0.8)]", u.status === 'active' && "bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.8)]")} />
                           <span className={cn("text-[9px] uppercase tracking-widest font-bold", u.status === 'active' ? "text-emerald-500" : "text-rose-500")}>
                             {u.status === 'active' ? 'ONLINE' : 'LOCKED'}
                           </span>
                         </div>
                       </td>
                       <td className="p-4">
                         <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => openCreditModal(u.id)}
                              className="h-8 w-8 p-0 rounded-none border-cyan-800 text-cyan-400 hover:bg-cyan-900/50 hover:text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0)] hover:shadow-[0_0_10px_rgba(6,182,212,0.3)] transition-all"
                              title="Cấp Credit"
                            >
                              <PlusCircle className="size-4" />
                            </Button>
                            
                            <Button 
                              variant={u.status === 'active' ? "outline" : "glow"}
                              size="sm"
                              onClick={() => handleAction(u.id, u.status === 'active' ? 'lock' : 'unlock')}
                              className={cn(
                                "h-8 w-8 p-0 rounded-none transition-all",
                                u.status === 'active' 
                                  ? "border-amber-800 text-amber-500 hover:bg-amber-900/30 hover:border-amber-500/50 hover:shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                                  : "bg-emerald-500/10 text-emerald-400 border-emerald-500/50 shadow-[inset_0_0_15px_rgba(52,211,153,0.2),0_0_10px_rgba(52,211,153,0.4)]"
                              )}
                              title={u.status === 'active' ? 'Khóa Tài Khoản' : 'Mở Khóa'}
                            >
                              {u.status === 'active' ? <Lock className="size-4" /> : <Unlock className="size-4" />}
                            </Button>
                            
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => {
                                setUserToDelete({ id: u.id, username: u.username });
                                setIsDeleteModalOpen(true);
                              }}
                              className="h-8 w-8 p-0 rounded-none border-rose-900/50 text-rose-500 hover:bg-rose-950/40 hover:text-rose-400 hover:border-rose-500/50 shadow-[0_0_10px_rgba(244,63,94,0)] hover:shadow-[0_0_15px_rgba(244,63,94,0.4)] transition-all ml-2"
                              title="Xóa Hệ Thống"
                              disabled={u.username === 'admin'}
                            >
                              <Trash2 className="size-4" />
                            </Button>
                         </div>
                       </td>
                     </motion.tr>
                   ))
                 )}
               </tbody>
             </table>
           </div>
         </CardContent>
      </Card>

      {/* Credit Injection Modal (Custom UI using AnimatePresence) */}
      {isCreditModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
           {/* Backdrop */}
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             onClick={() => setIsCreditModalOpen(false)}
             className="absolute inset-0 bg-black/60 backdrop-blur-sm"
           />

           <motion.div 
             initial={{ scale: 0.9, opacity: 0, y: 20 }}
             animate={{ scale: 1, opacity: 1, y: 0 }}
             exit={{ scale: 0.9, opacity: 0, y: 20 }}
             transition={{ type: "spring", stiffness: 200, damping: 20 }}
             className="relative z-10 w-full max-w-sm bg-[#061026] border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.2)] p-6 rounded-none overflow-hidden [clip-path:polygon(0_0,calc(100%-20px)_0,100%_20px,100%_100%,20px_100%,0_calc(100%-20px))]"
           >
              {/* Decor lines */}
              <div className="absolute top-4 left-4 size-2 border-t border-l border-cyan-400/50" />
              <div className="absolute bottom-4 right-4 size-2 border-b border-r border-cyan-400/50" />
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(6,182,212,0.03)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] pointer-events-none" />

              <div className="mb-6 relative">
                 <h3 className="text-lg font-mono font-bold text-white tracking-[0.2em] uppercase flex items-center gap-2">
                   <CreditCard className="size-5 text-cyan-400" /> BƠM CREDIT LÕI
                 </h3>
                 <p className="text-[10px] text-cyan-600 font-mono uppercase tracking-widest mt-1">Target UID: {selectedUserId}</p>
                 <div className="absolute -bottom-3 left-0 w-full h-[1px] bg-gradient-to-r from-cyan-500/50 to-transparent" />
              </div>

              <div className="space-y-4 relative z-10">
                <div className="space-y-2">
                   <label className="text-[10px] font-mono text-cyan-500 uppercase tracking-[0.1em]">Lượng Credit (Tự Động Cộng)</label>
                   <Input 
                     type="number"
                     placeholder="Ví dụ: 1000000"
                     value={creditAmount}
                     onChange={(e) => setCreditAmount(e.target.value)}
                     className="font-mono text-lg tracking-wider"
                     autoFocus
                   />
                </div>
                <div className="flex gap-2 font-mono mt-2">
                   <Button variant="outline" size="sm" onClick={() => setCreditAmount('10000')} className="flex-1 text-[9px] h-7 border-cyan-900 text-cyan-400 rounded-none">+ 10K</Button>
                   <Button variant="outline" size="sm" onClick={() => setCreditAmount('500000')} className="flex-1 text-[9px] h-7 border-cyan-900 text-cyan-400 rounded-none">+ 500K</Button>
                   <Button variant="outline" size="sm" onClick={() => setCreditAmount('1000000')} className="flex-1 text-[9px] h-7 border-cyan-900 text-cyan-400 rounded-none">+ 1M</Button>
                </div>
              </div>

              <div className="mt-8 flex gap-3 relative z-10">
                <Button 
                  variant="outline" 
                  className="flex-1 rounded-none border-cyan-800 text-cyan-500 hover:bg-cyan-950 hover:text-cyan-400 font-mono uppercase tracking-widest text-[10px]"
                  onClick={() => setIsCreditModalOpen(false)}
                >
                  HỦY BỎ
                </Button>
                <Button 
                  variant="glow"
                  onClick={() => selectedUserId && handleAction(selectedUserId, 'add_credit', Number(creditAmount))}
                  disabled={!creditAmount || isNaN(Number(creditAmount)) || Number(creditAmount) <= 0}
                  className="flex-1 rounded-none font-mono uppercase tracking-widest text-[10px]"
                >
                  XÁC NHẬN BƠM
                </Button>
              </div>
           </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && userToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
           {/* Backdrop */}
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             onClick={() => setIsDeleteModalOpen(false)}
             className="absolute inset-0 bg-black/80 backdrop-blur-md"
           />

           <motion.div 
             initial={{ scale: 0.95, opacity: 0, y: 10 }}
             animate={{ scale: 1, opacity: 1, y: 0 }}
             exit={{ scale: 0.95, opacity: 0, y: 10 }}
             transition={{ type: "spring", stiffness: 250, damping: 25 }}
             className="relative z-10 w-full max-w-md bg-[#060206] border border-rose-500/40 shadow-[0_0_50px_rgba(244,63,94,0.15)] p-6 rounded-none overflow-hidden [clip-path:polygon(0_0,calc(100%-20px)_0,100%_20px,100%_100%,20px_100%,0_calc(100%-20px))]"
           >
              {/* Decor lines */}
              <div className="absolute top-4 left-4 size-2 border-t border-l border-rose-500/50" />
              <div className="absolute bottom-4 right-4 size-2 border-b border-r border-rose-500/50" />
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(244,63,94,0.03)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] pointer-events-none" />

              <div className="mb-6 relative">
                 <h3 className="text-lg font-mono font-bold text-white tracking-[0.2em] uppercase flex items-center gap-2">
                   <ShieldAlert className="size-5 text-rose-500" /> CẢNH BÁO XÓA DỮ LIỆU
                 </h3>
                 <div className="absolute -bottom-3 left-0 w-full h-[1px] bg-gradient-to-r from-rose-500/50 to-transparent" />
              </div>

              <div className="space-y-4 relative z-10 text-rose-100/80 font-mono text-sm leading-relaxed tracking-wide">
                <p>
                  Bạn đang yêu cầu xóa vĩnh viễn tài khoản <span className="text-white font-bold px-2 py-0.5 bg-rose-950/50 border border-rose-500/30">[{userToDelete.username}]</span> (Mã UID: <span className="text-white">[{userToDelete.id}]</span>).
                </p>
                <p className="text-rose-400">
                  ⚠️ CẢNH BÁO: Hành động này sẽ xóa hoàn toàn dữ liệu định danh và toàn bộ số dư khỏi hệ thống lõi. Không thể khôi phục!
                </p>
              </div>

              <div className="mt-8 flex gap-3 relative z-10">
                <Button 
                  variant="outline" 
                  className="flex-1 rounded-none border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white font-mono uppercase tracking-widest text-[10px]"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  HỦY BỎ
                </Button>
                <Button 
                  onClick={() => {
                    handleAction(userToDelete.id, 'delete');
                    setIsDeleteModalOpen(false);
                  }}
                  className="flex-1 rounded-none bg-rose-600/20 text-rose-500 border border-rose-500/50 hover:bg-rose-600 hover:text-white shadow-[inset_0_0_15px_rgba(244,63,94,0.2),0_0_10px_rgba(244,63,94,0.4)] hover:shadow-[0_0_20px_rgba(244,63,94,0.6)] font-mono uppercase tracking-widest text-[10px] transition-all"
                >
                  XÁC NHẬN XÓA
                </Button>
              </div>
           </motion.div>
        </div>
      )}
    </div>
  );
}
