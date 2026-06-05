'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { servicesApi, projectsApi, testimonialsApi, contactsApi, computeMonthlyInquiries, computeServiceBreakdown, thisMonthCount } from '@/lib/adminApi';
import KPICard, { BarChart, ServiceBreakdown, EmptyState, Badge } from '@/components/admin/KPICard';

export default function DashboardPage() {
  const [data, setData] = useState({ services: [], projects: [], testimonials: [], contacts: [] });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    async function load() {
      const [sRes, pRes, tRes, cRes] = await Promise.all([
        servicesApi.getAll(),
        projectsApi.getAll(),
        testimonialsApi.getAllAdmin(),
        contactsApi.getAll(),
      ]);
      if (!sRes || !pRes || !tRes || !cRes) {
        setErr('Could not connect to backend. Make sure the server is running.');
      } else {
        setData({
          services: sRes.data || [],
          projects: pRes.data || [],
          testimonials: tRes.data || [],
          contacts: cRes.data || [],
        });
      }
      setLoading(false);
    }
    load();
  }, []);

  const { services, projects, testimonials, contacts } = data;
  const monthlyMap = computeMonthlyInquiries(contacts, 6);
  const svcBreakdown = computeServiceBreakdown(contacts);
  const thisMonth = thisMonthCount(contacts);
  const approved = testimonials.filter((t) => t.isApproved);
  const pending = testimonials.filter((t) => !t.isApproved);
  const recent = [...contacts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

  if (err) {
    return (
      <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
        ⚠ {err}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          ZASCHEM INDIA — live data from your backend ·{' '}
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 mb-5">
        <KPICard label="Total Services" value={loading ? '—' : services.length} icon="⚗" color="blue" loading={loading} />
        <KPICard label="Total Projects" value={loading ? '—' : projects.length} icon="📁" color="orange" loading={loading} />
        <KPICard label="Total Inquiries" value={loading ? '—' : contacts.length} icon="✉" color="blue" loading={loading} />
        <KPICard label="This Month" value={loading ? '—' : thisMonth} icon="📅" color="orange" loading={loading} />
        <KPICard label="Active Reviews" value={loading ? '—' : approved.length} icon="★" color="black" loading={loading} />
        <KPICard label="Pending Approval" value={loading ? '—' : pending.length} icon="⏳" color="blue" loading={loading} />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-sm font-semibold text-gray-800 mb-0.5">Monthly Inquiries</div>
          <div className="text-xs text-gray-400 mb-3">Last 6 months</div>
          {loading ? (
            <div className="h-28 bg-gray-50 rounded-lg animate-pulse" />
          ) : contacts.length === 0 ? (
            <EmptyState icon="📊" message="No inquiry data yet" />
          ) : (
            <BarChart data={monthlyMap} color="#2563eb" />
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-sm font-semibold text-gray-800 mb-0.5">Queries by Service Interested</div>
          <div className="text-xs text-gray-400 mb-3">Top 6 services from inquiries</div>
          {loading ? (
            <div className="space-y-2">{[1,2,3,4].map((i) => <div key={i} className="h-5 bg-gray-100 rounded animate-pulse" />)}</div>
          ) : svcBreakdown.length === 0 ? (
            <EmptyState icon="⚗" message="No service breakdown data yet" />
          ) : (
            <ServiceBreakdown data={svcBreakdown} />
          )}
        </div>
      </div>

      {/* Recent inquiries */}
      <div className="bg-white border border-gray-200 rounded-xl mb-4">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
          <div className="text-sm font-semibold text-gray-800 flex-1">Recent Inquiries</div>
          <Link href="/admin/contacts" className="text-xs text-blue-600 hover:underline font-medium">View all →</Link>
        </div>
        {loading ? (
          <div className="p-4 space-y-2">{[1,2,3].map((i) => <div key={i} className="h-10 bg-gray-50 rounded-lg animate-pulse" />)}</div>
        ) : recent.length === 0 ? (
          <EmptyState icon="📭" message="No inquiries yet" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-gray-400">Name</th>
                  <th className="text-left px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-gray-400">Service Interested</th>
                  <th className="text-left px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-gray-400 hidden sm:table-cell">Phone</th>
                  <th className="text-left px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-gray-400 hidden md:table-cell">Date</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((c) => (
                  <tr key={c._id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium text-gray-900">{c.name}</div>
                      <div className="text-xs text-gray-400">{c.email}</div>
                    </td>
                    <td className="px-4 py-3">
                      {c.serviceInterested
                        ? <Badge variant="blue">{c.serviceInterested}</Badge>
                        : <span className="text-gray-400 text-xs">—</span>}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 hidden sm:table-cell">{c.phone}</td>
                    <td className="px-4 py-3 text-xs text-gray-400 hidden md:table-cell">
                      {new Date(c.createdAt).toLocaleDateString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Bottom row — services snapshot + testimonials snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Services */}
        <div className="bg-white border border-gray-200 rounded-xl">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
            <div className="text-sm font-semibold text-gray-800 flex-1">Services</div>
            <Link href="/admin/services" className="text-xs text-blue-600 hover:underline font-medium">Manage →</Link>
          </div>
          <div>
            {loading ? (
              <div className="p-4 space-y-2">{[1,2,3].map((i) => <div key={i} className="h-8 bg-gray-50 rounded animate-pulse" />)}</div>
            ) : services.length === 0 ? (
              <EmptyState icon="⚗" message="No services added yet" />
            ) : services.slice(0, 6).map((s) => (
              <div key={s._id} className="flex items-center gap-3 px-4 py-2.5 border-b border-gray-100 last:border-0">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{s.title}</div>
                  <div className="text-[11px] text-gray-400">/{s.slug}</div>
                </div>
                <Badge variant={s.status === 'active' ? 'active' : s.status === 'draft' ? 'draft' : 'inactive'}>{s.status}</Badge>
                {s.featured && <Badge variant="orange">Featured</Badge>}
              </div>
            ))}
            {services.length > 6 && (
              <div className="px-4 py-2 text-xs text-gray-400">+{services.length - 6} more services</div>
            )}
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-white border border-gray-200 rounded-xl">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
            <div className="text-sm font-semibold text-gray-800 flex-1">Recent Testimonials</div>
            <Link href="/admin/testimonials" className="text-xs text-blue-600 hover:underline font-medium">Manage →</Link>
          </div>
          <div>
            {loading ? (
              <div className="p-4 space-y-2">{[1,2,3].map((i) => <div key={i} className="h-8 bg-gray-50 rounded animate-pulse" />)}</div>
            ) : testimonials.length === 0 ? (
              <EmptyState icon="★" message="No testimonials yet" />
            ) : testimonials.slice(0, 5).map((t) => (
              <div key={t._id} className="flex items-center gap-3 px-4 py-2.5 border-b border-gray-100 last:border-0">
                <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center font-bold text-xs flex-shrink-0">
                  {(t.clientName || '?')[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{t.clientName}</div>
                  <div className="text-[11px] text-gray-400">{t.company}</div>
                </div>
                <div className="text-orange-400 text-xs">{'★'.repeat(t.rating || 0)}</div>
                <Badge variant={t.isApproved ? 'active' : 'pending'}>{t.isApproved ? 'Approved' : 'Pending'}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}