'use client';
import { useEffect, useState, useMemo } from 'react';
import { contactsApi, exportCSV } from '@/lib/adminApi';
import { useAdmin } from '@/context/AdminContext';
import ContactItem, { ContactDetailModal } from '@/components/admin/ContactItem';
import Modal from '@/components/admin/Modal';
import { Btn, ErrBox } from '@/components/admin/Modal';
import { EmptyState } from '@/components/admin/KPICard';

export default function ContactsPage() {
  const { toast } = useAdmin();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);

  async function load() {
    setLoading(true);
    const res = await contactsApi.getAll();
    if (res?.success) setContacts(res.data || []);
    else setErr(res?.message || 'Failed to load contacts');
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return contacts.filter(
      (c) =>
        !q ||
        c.name?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q) ||
        c.phone?.includes(q) ||
        (c.serviceInterested || '').toLowerCase().includes(q) ||
        (c.company || '').toLowerCase().includes(q)
    );
  }, [contacts, search]);

  async function handleDelete(id) {
    if (!confirm('Delete this inquiry?')) return;
    const res = await contactsApi.delete(id);
    if (res?.success) { toast('Inquiry deleted', 'success'); load(); }
    else toast(res?.message || 'Delete failed', 'error');
  }

  function openDetail(contact) {
    setSelected(contact);
    setDetailOpen(true);
  }

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-xl font-bold text-gray-900">Contacts & Leads</h1>
        <p className="text-sm text-gray-500 mt-0.5">{contacts.length} total inquiries received</p>
      </div>

      {err && <ErrBox message={err} />}

      {/* Toolbar */}
      <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 mb-4 flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, phone, service…"
          className="flex-1 min-w-[180px] border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          aria-label="Search contacts"
        />
        <span className="text-xs text-gray-400 hidden sm:block">{filtered.length} results</span>
        <Btn variant="outline" size="sm" onClick={() => exportCSV(contacts)}>
          ↓ Export CSV
        </Btn>
      </div>

      {/* List */}
      {loading ? (
        <div className="space-y-3">
          {[1,2,3,4].map((i) => (
            <div key={i} className="h-20 bg-white border border-gray-200 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState icon="📭" message={search ? 'No contacts match your search' : 'No inquiries yet'} />
      ) : (
        <div className="space-y-3">
          {filtered.map((c) => (
            <ContactItem
              key={c._id}
              contact={c}
              onClick={() => openDetail(c)}
              onDelete={() => handleDelete(c._id)}
            />
          ))}
        </div>
      )}

      {/* Detail modal */}
      {detailOpen && selected && (
        <Modal
          title="Inquiry Detail"
          onClose={() => setDetailOpen(false)}
          footer={
            <>
              <Btn
                variant="danger"
                size="sm"
                onClick={() => { handleDelete(selected._id); setDetailOpen(false); }}
              >
                🗑 Delete
              </Btn>
              <Btn variant="outline" size="sm" onClick={() => setDetailOpen(false)}>
                Close
              </Btn>
            </>
          }
        >
          <ContactDetailModal contact={selected} />
        </Modal>
      )}
    </div>
  );
}