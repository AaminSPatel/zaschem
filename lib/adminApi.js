const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('zci_token');
}

async function request(method, path, body = null, isFormData = false) {
  const token = getToken();
  const headers = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  
  // Only set Content-Type for non-FormData requests
  if (!isFormData && body) headers['Content-Type'] = 'application/json';

  const opts = { method, headers };
  if (body) opts.body = isFormData ? body : JSON.stringify(body);

  const url = `${API_BASE}${path}`;
  console.log('[adminApi] fetch ->', {
    method,
    url,
    hasBody: !!body,
    isFormData,
    hasAuth: !!token,
    tokenPreview: token ? `${token.slice(0, 10)}...` : null,
    apiBase: API_BASE,
    path,
  });

  try {
    const res = await fetch(url, opts);
    console.log('[adminApi] fetch response ->', { url, status: res.status, ok: res.ok });

    if (res.status === 401) {
      localStorage.removeItem('zci_token');
      localStorage.removeItem('zci_admin');
      window.location.href = '/admin/login';
      return null;
    }

    const text = await res.text();
    let data = null;
    try { data = text ? JSON.parse(text) : null; } catch {}
    console.log('[adminApi] fetch response ->', {
      url,
      status: res.status,
      ok: res.ok,
      json: data,
      rawTextPreview: text ? `${text.slice(0, 250)}...` : null,
    });
    return data || { success: false, message: 'Non-JSON response from server', raw: text };

  } catch (e) {
    console.error('[adminApi] fetch error ->', { url, message: e?.message });
    return { success: false, message: 'Network error — is the backend running?' };
  }
}

// ── AUTH ──────────────────────────────────────────────────
export const authApi = {
  login: (email, password) => {
    console.log('[adminApi] auth login() called');
    return request('POST', '/auth/login', { email, password });
  },
  me: () => request('GET', '/auth/me'),
  changePassword: (currentPassword, newPassword) =>
    request('PUT', '/auth/change-password', { currentPassword, newPassword }),
  updateProfile: (name) => request('PUT', '/auth/profile', { name }),
};

// ── SERVICES ──────────────────────────────────────────────
export const servicesApi = {
  getAll: () => request('GET', '/services'),
  getOne: (id) => request('GET', `/services/${id}`),
  
  // For create - check if data is FormData
  create: (data) => {
    const isFormData = data instanceof FormData;
    return request('POST', '/services', data, isFormData);
  },
  
  // For update - check if data is FormData
  update: (id, data) => {
    const isFormData = data instanceof FormData;
    return request('PUT', `/services/${id}`, data, isFormData);
  },
  
  delete: (id) => request('DELETE', `/services/${id}`),
  toggleStatus: (id) => request('PATCH', `/services/${id}/toggle-status`),
};

// ── PROJECTS ──────────────────────────────────────────────
export const projectsApi = {
  getAll: () => request('GET', '/projects'),
  getOne: (id) => request('GET', `/projects/${id}`),
  create: (data) => {
    const isFormData = data instanceof FormData;
    return request('POST', '/projects', data, isFormData);
  },
  update: (id, data) => {
    const isFormData = data instanceof FormData;
    return request('PUT', `/projects/${id}`, data, isFormData);
  },
  delete: (id) => request('DELETE', `/projects/${id}`),
  toggleFeatured: (id) => request('PATCH', `/projects/${id}/toggle-featured`),
};

// ── TESTIMONIALS ──────────────────────────────────────────
export const testimonialsApi = {
  getAllAdmin: (status = '') =>
    request('GET', `/testimonials/admin/all?limit=100${status ? `&status=${status}` : ''}`),
  getOne: (id) => request('GET', `/testimonials/${id}`),
  create: (data) => {
    const isFormData = data instanceof FormData;
    return request('POST', '/testimonials', data, isFormData);
  },
  update: (id, data) => {
    const isFormData = data instanceof FormData;
    return request('PUT', `/testimonials/${id}`, data, isFormData);
  },
  delete: (id) => request('DELETE', `/testimonials/${id}`),
  approve: (id) => request('PATCH', `/testimonials/${id}/approve`),
};

// ── CONTACTS ──────────────────────────────────────────────
export const contactsApi = {
  getAll: () => request('GET', '/contacts'),
  getOne: (id) => request('GET', `/contacts/${id}`),
  update: (id, data) => request('PUT', `/contacts/${id}`, data),
  delete: (id) => request('DELETE', `/contacts/${id}`),
};

// ── SETTINGS ──────────────────────────────────────────────
export const settingsApi = {
  get: () => request('GET', '/settings'),
  update: (data) => request('PUT', '/settings', data),
  updateHeroSlides: (heroSlides) => request('PUT', '/settings/hero-slides', { heroSlides }),
  updateSocialLinks: (socialLinks) => request('PUT', '/settings/social-links', { socialLinks }),
  updateSeo: (seoData) => request('PUT', '/settings/seo', { seoData }),
};

// ── UPLOAD ────────────────────────────────────────────────
export const uploadApi = {
  single: async (file) => {
    const fd = new FormData();
    fd.append('image', file);
    return request('POST', '/upload/single', fd, true);
  },
  multiple: async (files) => {
    const fd = new FormData();
    files.forEach((f) => fd.append('images', f));
    return request('POST', '/upload/multiple', fd, true);
  },
  delete: (publicId) => request('DELETE', `/upload/${encodeURIComponent(publicId)}`),
};


// ── ANALYTICS HELPERS ─────────────────────────────────────
export function computeMonthlyInquiries(contacts, monthsBack = 6) {
  const now = new Date();
  const map = {};
  for (let i = monthsBack - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = d.toLocaleString('default', { month: 'short', year: '2-digit' });
    map[key] = 0;
  }
  contacts.forEach((c) => {
    const d = new Date(c.createdAt);
    const key = d.toLocaleString('default', { month: 'short', year: '2-digit' });
    if (key in map) map[key]++;
  });
  return map;
}

export function computeServiceBreakdown(contacts) {
  const map = {};
  contacts.forEach((c) => {
    const s = c.serviceInterested || 'Not Specified';
    map[s] = (map[s] || 0) + 1;
  });
  return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 6);
}

export function thisMonthCount(contacts) {
  const now = new Date();
  return contacts.filter((c) => {
    const d = new Date(c.createdAt);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;
}

export function exportCSV(contacts) {
  const headers = ['Name', 'Email', 'Phone', 'Company', 'Service Interested', 'Message', 'Address', 'Date'];
  const rows = contacts.map((c) => [
    c.name,
    c.email,
    c.phone,
    c.company || '',
    c.serviceInterested || '',
    `"${(c.message || '').replace(/"/g, '""')}"`,
    c.address || '',
    new Date(c.createdAt).toLocaleDateString('en-IN'),
  ]);
  const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
  const a = document.createElement('a');
  a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
  a.download = `contacts_${Date.now()}.csv`;
  a.click();
}