'use client';

export default function SEOPreview({ title = '', description = '', url = '', keywords = [] }) {
  const score = [
    title.length > 0 && title.length <= 60,
    description.length > 0 && description.length <= 160,
    keywords.length >= 3,
    url.length > 0,
  ].filter(Boolean).length;

  const pct = Math.round((score / 4) * 100);
  const color = pct >= 75 ? 'text-green-600' : pct >= 50 ? 'text-orange-500' : 'text-red-500';
  const barColor = pct >= 75 ? 'bg-green-500' : pct >= 50 ? 'bg-orange-400' : 'bg-red-500';

  const checks = [
    { label: 'Title length', ok: title.length > 0 && title.length <= 60 },
    { label: 'Description length', ok: description.length > 0 && description.length <= 160 },
    { label: 'Min 3 keywords', ok: keywords.length >= 3 },
    { label: 'Canonical URL set', ok: url.length > 0 },
  ];

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      {/* Google preview */}
      <div className="bg-gray-50 p-4 border-b border-gray-200">
        <div className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-2">Google Preview</div>
        <div className="text-xs text-green-700 mb-0.5 truncate">{url || 'zaschemindia.com'}</div>
        <div className="text-sm text-blue-700 font-medium mb-1 leading-tight">
          {title || 'Page Title — appears here'}
        </div>
        <div className="text-xs text-gray-600 leading-relaxed line-clamp-2">
          {description || 'Meta description will appear in search results here. Make it compelling and under 160 characters.'}
        </div>
      </div>

      {/* Score */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-gray-600">SEO Score</span>
          <span className={`text-sm font-bold ${color}`}>{pct}/100</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-3">
          <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${pct}%` }} />
        </div>
        <div className="space-y-1.5">
          {checks.map((c) => (
            <div key={c.label} className="flex items-center gap-2 text-xs">
              <span className={c.ok ? 'text-green-500' : 'text-gray-300'}>
                {c.ok ? '✓' : '○'}
              </span>
              <span className={c.ok ? 'text-gray-700' : 'text-gray-400'}>{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}