import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { AuthLayout } from './components/layout/AuthLayout';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { AnimatePresence, motion } from 'motion/react';

import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { Profile } from './pages/dashboard/Profile';
import { BuyCredit } from './pages/dashboard/BuyCredit';
import { HistoryPage } from './pages/dashboard/History';
import { Tool } from './pages/dashboard/Tool';
import { UserManagement } from './pages/admin/UserManagement';

import { TechTransition } from './components/TechTransition';

import { SupportWidget } from './components/SupportWidget';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        {/* Default redirect to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 0.3 }}
            >
              <Login />
            </motion.div>
          } />
          <Route path="/register" element={
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 0.3 }}
            >
              <Register />
            </motion.div>
          } />
        </Route>

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={
            <TechTransition>
              <Profile />
            </TechTransition>
          } />
          <Route path="buy-credit" element={
            <TechTransition>
              <BuyCredit />
            </TechTransition>
          } />
          <Route path="history" element={
            <TechTransition>
              <HistoryPage />
            </TechTransition>
          } />
          <Route path="tool" element={
            <TechTransition>
              <Tool />
            </TechTransition>
          } />
        </Route>
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={
            <TechTransition>
              <UserManagement />
            </TechTransition>
          } />
        </Route>
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <AnimatedRoutes />
          <SupportWidget />
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
