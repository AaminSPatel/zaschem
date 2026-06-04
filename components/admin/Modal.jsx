'use client';
import { useEffect } from 'react';

export default function Modal({ title, onClose, children, footer }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-16 px-4 pb-4 overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-xl w-full max-w-xl border border-gray-200 shadow-xl my-auto">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-200">
          <div className="flex-1 text-base font-semibold text-gray-900">{title}</div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors text-lg leading-none"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-5 max-h-[65vh] overflow-y-auto">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="flex justify-end gap-2 px-5 py-3 border-t border-gray-200 bg-gray-50 rounded-b-xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Reusable small components used inside modals ──────────
export function FormField({ label, error, children }) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-[11px] font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
          {label}
        </label>
      )}
      {children}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}

export function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder-gray-400 ${className}`}
      {...props}
    />
  );
}

export function Textarea({ className = '', ...props }) {
  return (
    <textarea
      className={`w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder-gray-400 resize-y min-h-[80px] ${className}`}
      {...props}
    />
  );
}

export function Select({ className = '', children, ...props }) {
  return (
    <select
      className={`w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

export function Toggle({ value, onChange, label }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <button
        type="button"
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={`relative w-9 h-5 rounded-full transition-colors ${value ? 'bg-blue-600' : 'bg-gray-300'}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${value ? 'translate-x-4' : 'translate-x-0'}`}
        />
      </button>
      {label && <span className="text-sm text-gray-600">{label}</span>}
    </label>
  );
}

export function ErrBox({ message }) {
  if (!message) return null;
  return (
    <div className="flex items-center gap-2 px-3 py-2.5 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm mb-3">
      <span>⚠</span> {message}
    </div>
  );
}

export function SuccessBox({ message }) {
  if (!message) return null;
  return (
    <div className="px-3 py-2.5 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm mb-3">
      ✓ {message}
    </div>
  );
}

export function Btn({ variant = 'primary', size = 'md', className = '', children, ...props }) {
  const base = 'inline-flex items-center gap-1.5 font-medium rounded-lg transition-all disabled:opacity-60';
  const sizes = { sm: 'px-3 py-1.5 text-xs', md: 'px-4 py-2 text-sm', lg: 'px-5 py-2.5 text-sm' };
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    orange: 'bg-orange-500 text-white hover:bg-orange-600',
    outline: 'border border-gray-200 text-gray-700 bg-white hover:border-blue-400 hover:text-blue-600',
    danger: 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100',
    ghost: 'text-gray-600 hover:bg-gray-100',
  };
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function UploadBox({ onFileSelect, accept = 'image/*', label = 'Click or drag to upload', sub = 'JPG, PNG, WebP — max 10MB' }) {
  return (
    <div
      className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all"
      onClick={() => document.getElementById('_ub_input')?.click()}
    >
      <div className="text-3xl text-gray-300 mb-2">↑</div>
      <div className="text-sm font-medium text-gray-700">{label}</div>
      <div className="text-xs text-gray-400 mt-1">{sub}</div>
      <input
        id="_ub_input"
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => onFileSelect && onFileSelect(e.target.files)}
      />
    </div>
  );
}