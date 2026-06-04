'use client';
import { Badge } from './KPICard';

export default function ContactItem({ contact, onClick, onDelete }) {
  const { name, email, phone, company, serviceInterested, message, createdAt } = contact;
  return (
    <div
      className="bg-white border border-gray-200 rounded-xl p-4 flex gap-3 cursor-pointer hover:border-blue-300 transition-colors"
      onClick={onClick}
    >
      {/* Avatar */}
      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
        {(name || '?')[0].toUpperCase()}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-gray-900">{name}</span>
          {company && <Badge variant="gray">{company}</Badge>}
          {serviceInterested && <Badge variant="blue">{serviceInterested}</Badge>}
        </div>
        <div className="text-xs text-gray-400 mt-0.5">
          {email} · {phone}
        </div>
        {message && (
          <div className="text-xs text-gray-500 mt-1.5 truncate max-w-sm">{message}</div>
        )}
      </div>

      {/* Right */}
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <div className="text-[10px] text-gray-400">
          {new Date(createdAt).toLocaleDateString('en-IN')}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete && onDelete(); }}
          className="text-xs text-red-500 hover:text-red-700 transition-colors px-1"
          aria-label="Delete contact"
        >
          🗑
        </button>
      </div>
    </div>
  );
}

export function ContactDetailModal({ contact }) {
  if (!contact) return null;
  const rows = [
    ['Name', contact.name],
    ['Email', contact.email],
    ['Phone', contact.phone],
    ['Company', contact.company || '—'],
    ['Service Interested', contact.serviceInterested || '—'],
    ['Address', contact.address || '—'],
    ['Date', new Date(contact.createdAt).toLocaleString('en-IN')],
  ];
  return (
    <div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-4">
        {rows.map(([k, v]) => (
          <div key={k}>
            <div className="text-[10px] uppercase font-semibold text-gray-400 tracking-wide">{k}</div>
            <div className="text-sm text-gray-800 mt-0.5 break-words">{v}</div>
          </div>
        ))}
      </div>
      <div className="text-[10px] uppercase font-semibold text-gray-400 tracking-wide mb-1">Message</div>
      <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 leading-relaxed">{contact.message}</div>
    </div>
  );
}