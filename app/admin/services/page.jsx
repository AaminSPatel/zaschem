'use client';
import { useEffect, useState, useMemo } from 'react';
import { servicesApi } from '@/lib/adminApi';
import { useAdmin } from '@/context/AdminContext';
import ServiceCard, { ServiceForm } from '@/components/admin/ServiceCard';
import Modal from '@/components/admin/Modal';
import { Btn, ErrBox } from '@/components/admin/Modal';
import { EmptyState } from '@/components/admin/KPICard';

export default function ServicesPage() {
  const { toast } = useAdmin();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [modal, setModal] = useState(null); // null | { mode:'add' } | { mode:'edit', data:{} }
  const [err, setErr] = useState('');

  async function load() {
    setLoading(true);
    const res = await servicesApi.getAll();
    if (res?.success) setServices(res.data || []);
    else setErr(res?.message || 'Failed to load services');
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    return services.filter((s) =>
      (!search || s.title?.toLowerCase().includes(search.toLowerCase()) || s.slug?.includes(search.toLowerCase())) &&
      (!statusFilter || s.status === statusFilter)
    );
  }, [services, search, statusFilter]);

  async function openEdit(id) {
    const res = await servicesApi.getOne(id);
    if (res?.success) setModal({ mode: 'edit', data: res.data });
    else toast('Could not load service', 'error');
  }

  async function handleSubmit(payload) {
    setSaving(true);
    console.log('ye payload he', payload);
    
    const res = modal.mode === 'edit'
      ? await servicesApi.update(modal.data._id, payload)
      : await servicesApi.create(payload);
    setSaving(false);
    if (res?.success) {
      toast(modal.mode === 'edit' ? 'Service updated' : 'Service created', 'success');
      setModal(null); load();
    }
    return res;
  }
const closeModal = () => {
  setModal(null);
  // Reset any pending states
};
  async function handleDelete(id) {
    if (!confirm('Delete this service? This cannot be undone.')) return;
    const res = await servicesApi.delete(id);
    if (res?.success) { toast('Service deleted', 'success'); load(); }
    else toast(res?.message || 'Delete failed', 'error');
  }

  async function handleToggle(id) {
    const res = await servicesApi.toggleStatus(id);
    if (res?.success) {
      toast(`Service ${res.data.status === 'active' ? 'activated' : 'deactivated'}`, 'success');
      setServices((prev) => prev.map((s) => s._id === id ? { ...s, status: res.data.status } : s));
    } else toast(res?.message || 'Failed', 'error');
  }

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-xl font-bold text-gray-900">Services Management</h1>
        <p className="text-sm text-gray-500 mt-0.5">{services.length} total services</p>
      </div>

      {err && <ErrBox message={err} />}

      {/* Toolbar */}
      <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 mb-4 flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search services…"
          className="flex-1 min-w-[160px] border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          aria-label="Search services"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Filter by status"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="draft">Draft</option>
        </select>
        <Btn variant="primary" size="sm" onClick={() => setModal({ mode: 'add', data: {} })} className="ml-auto">
          + Add Service
        </Btn>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="h-52 bg-white border border-gray-200 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState icon="⚗" message="No services found" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((s) => (
            <ServiceCard
              key={s._id}
              service={s}
              onEdit={openEdit}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <Modal
          title={modal.mode === 'edit' ? 'Edit Service' : 'Add New Service'}
          onClose={closeModal}
        >
          <ServiceForm initial={modal.data} onSubmit={handleSubmit} loading={saving} />
        </Modal>
      )}
    </div>
  );
}