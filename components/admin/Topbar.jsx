'use client';
import Link from 'next/link';
import { useAdmin } from '@/context/AdminContext';

export default function Topbar({ title, onMenuClick }) {
  const { admin, logout } = useAdmin();
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4 gap-3 flex-shrink-0">
      <button
        onClick={onMenuClick}
        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 lg:hidden"
        aria-label="Toggle menu"
      >
        ☰
      </button>
      <div className="text-base font-semibold text-gray-900 flex-1">{title}</div>

      <Link
        href="/admin/profile"
        className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-bold hover:bg-blue-700 transition-colors"
        title="Profile"
        aria-label="Admin profile"
      >
        {(admin?.name || 'A')[0].toUpperCase()}
      </Link>
    </header>
  );
}