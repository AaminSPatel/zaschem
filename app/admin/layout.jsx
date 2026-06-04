'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AdminProvider, useAdmin } from '@/context/AdminContext';

import Sidebar from '@/components/admin/Sidebar';
import Topbar from '@/components/admin/Topbar';

const PAGE_TITLES = {
  '/admin/dashboard': 'Dashboard',
  '/admin/contacts': 'Contacts & Leads',
  '/admin/services': 'Services',
  '/admin/projects': 'Projects',
  '/admin/testimonials': 'Testimonials',
  '/admin/settings': 'Website Settings',
  '/admin/upload': 'Media Upload',
  '/admin/profile': 'Admin Profile',
};

function AdminShell({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isLogin = pathname === '/admin/login';

  const { ensureAuth, admin, checkedAuth } = useAdmin();

  useEffect(() => {
    if (isLogin) return;
    // ensureAuth() token check + refreshAdmin karega, aur redirect karega if invalid
    // checkedAuth jaldi ensure karne ke liye: initial paint me flicker avoid
    if (!checkedAuth) return;
    ensureAuth();
  }, [ensureAuth, isLogin, checkedAuth]);

  if (isLogin) return <>{children}</>;
  if (!checkedAuth) return null;
  if (!admin) return null;

  const title = PAGE_TITLES[pathname] || 'Admin';

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex w-56 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed top-0 left-0 bottom-0 w-56 z-50 lg:hidden">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar title={title} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }) {
  return (
    <AdminProvider>
      <AdminShell>{children}</AdminShell>
    </AdminProvider>
  );
}