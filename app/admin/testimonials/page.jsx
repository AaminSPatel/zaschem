// app/admin/testimonials/page.js
'use client';

import { useState, useEffect, useMemo } from 'react';
import { testimonialsApi } from '@/lib/adminApi';
import { useAdmin } from '@/context/AdminContext';
import TestimonialCard, { TestimonialForm } from '@/components/admin/TestimonialCard';
import Modal from '@/components/admin/Modal';
import { Btn, ErrBox } from '@/components/admin/Modal';
import { EmptyState } from '@/components/admin/KPICard';

export default function TestimonialsPage() {
  const { toast } = useAdmin();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [modal, setModal] = useState(null); // null | { mode:'add' } | { mode:'edit', data:{} }
  const [err, setErr] = useState('');

  async function loadTestimonials() {
    setLoading(true);
    const res = await testimonialsApi.getAllAdmin();
    if (res?.success) {
      setTestimonials(res.data || []);
      setErr('');
    } else {
      setErr(res?.message || 'Failed to load testimonials');
    }
    setLoading(false);
  }

  useEffect(() => {
    loadTestimonials();
  }, []);

  const filtered = useMemo(() => {
    return testimonials.filter(t => {
      if (statusFilter === 'approved') return t.isApproved;
      if (statusFilter === 'pending') return !t.isApproved;
      return true;
    });
  }, [testimonials, statusFilter]);

  async function openEdit(id) {
    const res = await testimonialsApi.getOne(id);
    if (res?.success) setModal({ mode: 'edit', data: res.data });
    else toast('Could not load testimonial', 'error');
  }

  async function handleSubmit(payload) {
    setSaving(true);
    const res = modal.mode === 'edit'
      ? await testimonialsApi.update(modal.data._id, payload)
      : await testimonialsApi.create(payload);
    setSaving(false);
    
    if (res?.success) {
      toast(modal.mode === 'edit' ? 'Testimonial updated' : 'Testimonial created', 'success');
      setModal(null);
      loadTestimonials();
    } else {
      toast(res?.message || 'Operation failed', 'error');
    }
    return res;
  }

  async function handleApprove(id) {
    const res = await testimonialsApi.approve(id);
    if (res?.success) {
      toast('Testimonial approved', 'success');
      loadTestimonials();
    } else {
      toast(res?.message || 'Approval failed', 'error');
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this testimonial? This cannot be undone.')) return;
    const res = await testimonialsApi.delete(id);
    if (res?.success) {
      toast('Testimonial deleted', 'success');
      loadTestimonials();
    } else {
      toast(res?.message || 'Delete failed', 'error');
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[1,2,3,4,5,6].map((i) => (
          <div key={i} className="h-52 bg-white border border-gray-200 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-xl font-bold text-gray-900">Testimonials Management</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {testimonials.length} total · {testimonials.filter(t => !t.isApproved).length} pending approval
        </p>
      </div>

      {err && <ErrBox message={err} />}

      {/* Toolbar - Matching services page style */}
      <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 mb-4 flex flex-wrap items-center gap-3">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Filter by status"
        >
          <option value="">All Testimonials</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
        </select>
        <Btn 
          variant="primary" 
          size="sm" 
          onClick={() => setModal({ mode: 'add', data: {} })} 
          className="ml-auto"
        >
          + Add Testimonial
        </Btn>
      </div>

      {/* Testimonials Grid */}
      {filtered.length === 0 ? (
        <EmptyState icon="⭐" message="No testimonials found" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((t) => (
            <TestimonialCard
              key={t._id}
              testimonial={t}
              onApprove={handleApprove}
              onEdit={openEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Modal - Matching services page approach */}
      {modal && (
        <Modal
          title={modal.mode === 'edit' ? 'Edit Testimonial' : 'Add New Testimonial'}
          onClose={() => setModal(null)}
        >
          <TestimonialForm 
            initial={modal.data} 
            onSubmit={handleSubmit} 
            loading={saving} 
          />
        </Modal>
      )}
    </div>
  );
}