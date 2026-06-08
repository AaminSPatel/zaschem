'use client';

export default function KPICard({ label, value, icon, color = 'blue', loading = false }) {
  const colors = {
    blue: 'border-t-blue-600',
    orange: 'border-t-orange-500',
    black: 'border-t-gray-900',
    green: 'border-t-green-600',
  };
  const iconBg = {
    blue: 'bg-blue-50 text-blue-600',
    orange: 'bg-orange-50 text-orange-500',
    black: 'bg-gray-100 text-gray-700',
    green: 'bg-green-50 text-green-600',
  };
  return (
    <div className={`bg-white border border-gray-200 border-t-4 ${colors[color]} rounded-xl p-4`}>
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg mb-3 ${iconBg[color]}`}>
        {icon}
      </div>
      {loading ? (
        <div className="h-7 w-16 bg-gray-100 rounded animate-pulse mb-1" />
      ) : (
        <div className="text-2xl font-bold text-gray-900 leading-none">{value}</div>
      )}
      <div className="text-xs text-gray-400 mt-1.5">{label}</div>
    </div>
  );
}

export function BarChart({ data = {}, color = '#2563eb' }) {
  const entries = Object.entries(data);
  const max = Math.max(...entries.map(([, v]) => v), 1);
  return (
    <div className="flex items-end gap-1.5 h-28 px-1">
      {entries.map(([label, val]) => (
        <div key={label} className="flex flex-col items-center gap-1 flex-1">
          <span className="text-[9px] font-semibold" style={{ color }}>{val}</span>
          <div
            className="w-full rounded-t"
            style={{
              height: `${Math.round((val / max) * 80) + 4}px`,
              background: color,
              opacity: 0.5 + 0.5 * (val / max),
            }}
          />
          <span className="text-[9px] text-gray-400 text-center leading-tight">{label}</span>
        </div>
      ))}
    </div>
  );
}

export function ServiceBreakdown({ data = [] }) {
  const max = Math.max(...data.map(([, v]) => v), 1);
  return (
    <div className="space-y-2.5">
      {data.map(([name, val]) => (
        <div key={name} className="flex items-center gap-3">
          <div className="text-xs text-gray-500 w-28 flex-shrink-0 truncate">{name}</div>
          <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-orange-500"
              style={{ width: `${Math.round((val / max) * 100)}%` }}
            />
          </div>
          <div className="text-xs font-semibold text-gray-800 w-5 text-right">{val}</div>
        </div>
      ))}
    </div>
  );
}
/* 
export function LoadingRows({ cols = 4, rows = 4 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i}>
          {Array.from({ length: cols }).map((_, j) => (
            <td key={j} className="px-4 py-3">
              <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
 */
export function EmptyState({ icon = '📭', message = 'No data found' }) {
  return (
    <div className="py-14 text-center text-gray-400">
      <div className="text-4xl mb-3">{icon}</div>
      <div className="text-sm">{message}</div>
    </div>
  );
}

export function Badge({ variant = 'gray', children }) {
  const v = {
    active: 'bg-green-50 text-green-700 border-green-200',
    inactive: 'bg-red-50 text-red-700 border-red-200',
    draft: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    orange: 'bg-orange-50 text-orange-700 border-orange-200',
    gray: 'bg-gray-100 text-gray-600 border-gray-200',
    black: 'bg-gray-900 text-white border-gray-900',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${v[variant] || v.gray}`}>
      {children}
    </span>
  );
}