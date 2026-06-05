'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/adminApi';

const AdminContext = createContext(null);

function hasValidToken() {
  if (typeof window === 'undefined') return false;
  const tokenFromLS = localStorage.getItem('zci_token');
  return Boolean(tokenFromLS);
}


export function AdminProvider({ children }) {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState([]);
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    // UI guard ke liye: admin object + token presence check
    const stored = localStorage.getItem('zci_admin');
    if (stored) {
      try { setAdmin(JSON.parse(stored)); } catch {}
    }
    setLoading(false);
    setCheckedAuth(true);
  }, []);


  const toast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await authApi.login(email, password);
    if (res?.success) {
      const { token, refreshToken, admin: adminData } = res.data;
      localStorage.setItem('zci_token', token);
      localStorage.setItem('zci_refresh', refreshToken);
      localStorage.setItem('zci_admin', JSON.stringify(adminData));
      // also set cookie for middleware
      setAdmin(adminData);
      return { success: true };
    }
    return { success: false, message: res?.message || 'Login failed' };
  }, []);


  const logout = useCallback(() => {
    localStorage.removeItem('zci_token');
    localStorage.removeItem('zci_refresh');
    localStorage.removeItem('zci_admin');
    setAdmin(null);
    router.push('/admin/login');
  }, [router]);


  const refreshAdmin = useCallback(async () => {
    const res = await authApi.me();
    if (res?.success) {
      setAdmin(res.data);
      localStorage.setItem('zci_admin', JSON.stringify(res.data));
      return true;
    }
    setAdmin(null);
    return false;
  }, []);


  // Admin pages ke liye guard-ready helpers
  const ensureAuth = useCallback(async () => {
    // login page ko bypass karke call kiya jana chahiye, but safe guard
    const tokenExists = hasValidToken();
    if (!tokenExists) {
      setAdmin(null);
      router.push('/admin/login');
      return false;
    }

    // Agar localStorage me admin object hai, but token valid nahi ho sakta.
    // Quick refresh attempt to avoid session hijack.
    try {
      const ok = await refreshAdmin();
      if (!ok) {
        setAdmin(null);
        localStorage.removeItem('zci_token');
        localStorage.removeItem('zci_refresh');
        localStorage.removeItem('zci_admin');
        router.push('/admin/login');
        return false;
      }

      return true;
    } catch {
      // silent failure -> redirect to login
      setAdmin(null);
      router.push('/admin/login');
      return false;
    }
  }, [refreshAdmin, router]);

  return (
    <AdminContext.Provider value={{ admin, loading, checkedAuth, login, logout, toast, refreshAdmin, ensureAuth }}>
      {children}

      {/* Toast container */}
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">

        {toasts.map((t) => (
          <div
            key={t.id}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium shadow-lg pointer-events-auto max-w-xs
              ${t.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : ''}
              ${t.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : ''}
              ${t.type === 'info' ? 'bg-blue-50 text-blue-700 border border-blue-200' : ''}
            `}
          >
            {t.message}
          </div>
        ))}
      </div>
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used inside AdminProvider');
  return ctx;
}


