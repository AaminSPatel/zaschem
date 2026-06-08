'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdmin } from '@/context/AdminContext';
import AdminIcon from '@/components/admin/AdminIcon';


const NAV = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: '⊞', group: 'MAIN' },
  { href: '/admin/contacts', label: 'Contacts & Leads', icon: '✉', group: 'MAIN' },
  { href: '/admin/services', label: 'Services', icon: '⚗', group: 'CONTENT' },
  { href: '/admin/projects', label: 'Projects', icon: '📁', group: 'CONTENT' },
  { href: '/admin/testimonials', label: 'Testimonials', icon: '★', group: 'CONTENT' },
  { href: '/admin/settings', label: 'Website Settings', icon: '⚙', group: 'SYSTEM' },
  { href: '/admin/profile', label: 'Admin Profile', icon: '👤', group: 'SYSTEM' },
];

export default function Sidebar({ onClose }) {
  const pathname = usePathname();
  const { admin, logout } = useAdmin();
  let lastGroup = '';

  return (
    <aside className="flex flex-col h-full w-full bg-white border-r border-gray-200">
      {/* Brand */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-200">
        <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
          ZCI
        </div>
        <div className="min-w-0">
          <div className="text-sm font-bold text-gray-900 leading-tight">ZASCHEM INDIA</div>
          <div className="text-xs font-semibold text-orange-500 tracking-wide">Admin Panel</div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-auto text-gray-400 hover:text-gray-700 text-xl leading-none"
            aria-label="Close menu"
          >
            ×
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2">
        {NAV.map((item) => {
          const showGroup = item.group !== lastGroup;
          lastGroup = item.group;
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <div key={item.href}>
              {showGroup && (
                <div className="px-4 pt-4 pb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  {item.group}
                </div>
              )}
              <Link
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium border-l-[3px] transition-all
                  ${active
                    ? 'bg-blue-50 border-blue-600 text-blue-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
              >
                {/* react-icons via AdminIcon */}
                <span className="text-base w-5 text-center flex items-center justify-center">
                  {/* map emoji -> fa6 icon name */}
                  {item.icon === '⊞' && <AdminIcon name="FaCube" size="md" />}
                  {item.icon === '✉' && <AdminIcon name="FaEnvelope" size="md" />}
                  {item.icon === '⚗' && <AdminIcon name="FaFlask" size="md" />}
                  {item.icon === '📁' && <AdminIcon name="FaFolderOpen" size="md" />}
                  {item.icon === '★' && <AdminIcon name="FaStar" size="md" />}
                  {item.icon === '⚙' && <AdminIcon name="FaGear" size="md" />}
                  {item.icon === '👤' && <AdminIcon name="FaUser" size="md" />}
                  {!['⊞','✉','⚗','📁','★','⚙','👤'].includes(item.icon) && <AdminIcon name="FaQuestion" size="md" />}
                </span>
                {item.label}

              </Link>
            </div>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="p-3 border-t border-gray-200">
        <div className="flex items-center gap-2 px-2 py-2 bg-gray-50 rounded-lg">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {(admin?.name || 'A')[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-gray-800 truncate">{admin?.name || 'Admin'}</div>
            <div className="text-[10px] text-gray-400 truncate">{admin?.email || ''}</div>
          </div>
          <button
            onClick={logout}
            className="text-gray-400 hover:text-red-500 transition-colors text-sm"
            title="Logout"
            aria-label="Logout"
          >
            ⎋
          </button>
        </div>
      </div>
    </aside>
  );
}