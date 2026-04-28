import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Info, AlertTriangle, CheckCircle2, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: Date;
  read: boolean;
  isToast?: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (title: string, message: string, type?: NotificationType, showToast?: boolean) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'HỆ THỐNG ĐÃ SẴN SÀNG',
      message: 'Giao thức bảo mật AI Core đã được kích hoạt thành công.',
      type: 'success',
      timestamp: new Date(),
      read: false,
    }
  ]);

  const [toasts, setToasts] = useState<Notification[]>([]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = useCallback((title: string, message: string, type: NotificationType = 'info', showToast: boolean = true) => {
    const id = Math.random().toString(36).substring(7);
    const newNotification: Notification = {
      id,
      title,
      message,
      type,
      timestamp: new Date(),
      read: false,
    };
    
    setNotifications(prev => [newNotification, ...prev]);

    if (showToast) {
      setToasts(prev => [...prev, newNotification]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 5000);
    }
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      removeNotification
    }}>
      {children}
      
      {/* Toast Overlay */}
      <div className="fixed bottom-20 md:bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none w-full max-w-sm">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className="pointer-events-auto bg-[#061026]/90 border border-cyan-500/30 backdrop-blur-xl p-4 [clip-path:polygon(0_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%)] relative overflow-hidden group shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              <div className={cn(
                "absolute top-0 left-0 w-1 h-full",
                toast.type === 'success' ? "bg-emerald-500" :
                toast.type === 'warning' ? "bg-amber-500" :
                toast.type === 'error' ? "bg-rose-500" :
                "bg-cyan-500"
              )} />
              
              <div className="flex gap-4">
                <div className={cn(
                  "size-10 border flex items-center justify-center shrink-0",
                  toast.type === 'success' ? "border-emerald-500/20 text-emerald-400 bg-emerald-500/5" :
                  toast.type === 'warning' ? "border-amber-500/20 text-amber-400 bg-amber-500/5" :
                  toast.type === 'error' ? "border-rose-500/20 text-rose-400 bg-rose-500/5" :
                  "border-cyan-500/20 text-cyan-400 bg-cyan-500/5"
                )}>
                  {toast.type === 'success' ? <CheckCircle2 className="size-5" /> :
                   toast.type === 'warning' ? <AlertTriangle className="size-5" /> :
                   toast.type === 'error' ? <AlertTriangle className="size-5" /> :
                   <Info className="size-5" />}
                </div>
                <div className="flex-1">
                  <h5 className="font-mono font-bold text-[10px] text-white uppercase tracking-wider mb-1">{toast.title}</h5>
                  <p className="text-[11px] text-zinc-400 line-clamp-2">{toast.message}</p>
                </div>
                <button 
                  onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                  className="p-1 text-zinc-600 hover:text-white transition-colors h-fit"
                >
                  <X className="size-4" />
                </button>
              </div>
              
              <div className="absolute bottom-0 left-0 h-[1px] bg-cyan-500/50 w-full animate-[progress_5s_linear_forwards]" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
