import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { About, Projects, Experiences } from './pages/Portfolio';
import { AuthStatus } from './types';

// Protected Route Component
// FIX: Make children optional in type definition to satisfy strict TS checks
const ProtectedRoute = ({ children, requireAdmin = false }: { children?: React.ReactNode, requireAdmin?: boolean }) => {
  const { user, status } = useAuth();

  if (status === AuthStatus.LOADING || status === AuthStatus.IDLE) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (status === AuthStatus.UNAUTHENTICATED) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !user?.is_administrator) {
    return <div className="p-8 text-center text-red-600">Access Denied: Admin privileges required.</div>;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        
        {/* Portfolio Routes */}
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="experiences" element={<Experiences />} />

        {/* Protected Routes */}
        <Route 
          path="dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Admin Routes */}
        <Route 
          path="admin" 
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Route>
    </Routes>
  );
}

const App: React.FC = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </HashRouter>
  );
};

export default App;