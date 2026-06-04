'use client';
import { useEffect, useState, useMemo } from 'react';
import { projectsApi } from '@/lib/adminApi';
import { useAdmin } from '@/context/AdminContext';
import ProjectCard, { ProjectForm } from '@/components/admin/ProjectCard';
import Modal from '@/components/admin/Modal';
import { Btn, ErrBox } from '@/components/admin/Modal';
import { EmptyState } from '@/components/admin/KPICard';

export default function ProjectsPage() {
  const { toast } = useAdmin();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [featFilter, setFeatFilter] = useState('');
  const [modal, setModal] = useState(null);
  const [err, setErr] = useState('');

  async function load() {
    setLoading(true);
    const res = await projectsApi.getAll();
    if (res?.success) setProjects(res.data || []);
    else setErr(res?.message || 'Failed to load projects');
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    return projects.filter((p) =>
      (!search ||
        p.title?.toLowerCase().includes(search.toLowerCase()) ||
        p.client?.toLowerCase().includes(search.toLowerCase()) ||
        p.location?.toLowerCase().includes(search.toLowerCase()) ||
        p.category?.toLowerCase().includes(search.toLowerCase())) &&
      (featFilter === '' ||
        (featFilter === 'true' ? p.featured : !p.featured))
    );
  }, [projects, search, featFilter]);

  async function openEdit(id) {
    const res = await projectsApi.getOne(id);
    if (res?.success) setModal({ mode: 'edit', data: res.data });
    else toast('Could not load project', 'error');
  }

  async function handleSubmit(payload) {
    setSaving(true);
    const res = modal.mode === 'edit'
      ? await projectsApi.update(modal.data._id, payload)
      : await projectsApi.create(payload);
    setSaving(false);
    if (res?.success) {
      toast(modal.mode === 'edit' ? 'Project updated' : 'Project created', 'success');
      setModal(null); load();
    }
    return res;
  }

  async function handleDelete(id) {
    if (!confirm('Delete this project?')) return;
    const res = await projectsApi.delete(id);
    if (res?.success) { toast('Project deleted', 'success'); load(); }
    else toast(res?.message || 'Delete failed', 'error');
  }

  async function handleToggleFeatured(id) {
    const res = await projectsApi.toggleFeatured(id);
    if (res?.success) {
      toast(`Project ${res.data.featured ? 'marked featured' : 'unfeatured'}`, 'success');
      setProjects((prev) => prev.map((p) => p._id === id ? { ...p, featured: res.data.featured } : p));
    } else toast(res?.message || 'Failed', 'error');
  }

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-xl font-bold text-gray-900">Projects Management</h1>
        <p className="text-sm text-gray-500 mt-0.5">{projects.length} total projects</p>
      </div>

      {err && <ErrBox message={err} />}

      {/* Toolbar */}
      <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 mb-4 flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, client, location, category…"
          className="flex-1 min-w-[180px] border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          aria-label="Search projects"
        />
        <select
          value={featFilter}
          onChange={(e) => setFeatFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Filter by featured"
        >
          <option value="">All Projects</option>
          <option value="true">Featured Only</option>
          <option value="false">Non-Featured</option>
        </select>
        <Btn variant="primary" size="sm" onClick={() => setModal({ mode: 'add', data: {} })} className="ml-auto">
          + Add Project
        </Btn>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="h-56 bg-white border border-gray-200 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState icon="📁" message="No projects found" />
      ) : (
        <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filtered.map((p) => (
            <ProjectCard
              key={p._id}
              project={p}
              onEdit={openEdit}
              onDelete={handleDelete}
              onToggleFeatured={handleToggleFeatured}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <Modal
          title={modal.mode === 'edit' ? 'Edit Project' : 'Add New Project'}
          onClose={() => setModal(null)}
        >
          <ProjectForm initial={modal.data} onSubmit={handleSubmit} loading={saving} />
        </Modal>
      )}
    </div>
  );
}