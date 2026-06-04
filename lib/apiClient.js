export function getApiBaseUrl() {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) return '';
  return base.replace(/\/$/, '');
}

async function requestJson(url, { method = 'GET', headers, body } = {}) {
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {}),
    },
    body: body != null ? JSON.stringify(body) : undefined,
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const msg = data?.message || data?.error || `Request failed with ${res.status}`;
    throw new Error(msg);
  }

  return data;
}

function getAuthHeaders() {
  if (typeof window === 'undefined') return {};
  const token = window.localStorage.getItem('token');
  if (!token) return {};
  return {
    Authorization: `Bearer ${token}`,
  };
}

function isProbablyAdminFromToken(token) {
  if (!token) return false;
  try {
    const parts = token.split('.');
    if (parts.length < 2) return false;
    const payloadPart = parts[1];
    const json = atob(payloadPart.replace(/-/g, '+').replace(/_/g, '/'));
    const payload = JSON.parse(json);
    const role = payload?.role || payload?.roles?.[0] || payload?.userRole;
    return role === 'admin' || role === 'Admin' || role === 1;
  } catch {
    return false;
  }
}

async function requestJsonWithAuth(url, { method = 'GET', headers, body } = {}) {
  return requestJson(url, {
    method,
    headers: {
      ...getAuthHeaders(),
      ...(headers || {}),
    },
    body,
  });
}

export async function createContactInquiry(payload) {
  const base = getApiBaseUrl();
  if (!base) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is not set');
  }
  
  // backend mounts: app.use('/contact', contactRoutes_FIXED)
  try {
    return await requestJson(`${base}/contacts`, {
      method: 'POST',
      body: payload,
    });
  } catch (e) {
    // Ensure error is visible even if UI only shows generic message
    console.error('createContactInquiry failed:', e);
    throw e;
  }
}

// =============================
// Projects (frontend fetch + best-effort admin CRUD)
// =============================
export async function fetchProjects() {
  const base = getApiBaseUrl();
  if (!base) throw new Error('NEXT_PUBLIC_API_BASE_URL is not set');

  const url = `${base}/projects`;
  console.log('[apiClient] fetchProjects ->', { url });

  try {
    const res = await requestJson(url);
    console.log('[apiClient] fetchProjects <- success', {
      type: typeof res,
      hasData: !!res?.data,
      dataType: Array.isArray(res?.data) ? 'array' : typeof res?.data,
      length: Array.isArray(res?.data) ? res.data.length : undefined,
    });
    return res;
  } catch (e) {
    console.error('[apiClient] fetchProjects <- error', {
      message: e?.message,
      name: e?.name,
    });
    throw e;
  }
}

export async function fetchProjectBySlug(slug) {
  const base = getApiBaseUrl();
  if (!base) throw new Error('NEXT_PUBLIC_API_BASE_URL is not set');
   console.log('slug = ',slug);
   
  // Preferred route: GET /api/projects/slug/:slug
  // Fallbacks: some older backends might have GET /api/projects/:slug
  try {
    return await requestJson(`${process.env.NEXT_PUBLIC_API_BASE_URL}/projects/slug/${encodeURIComponent(slug)}`);
  } catch {
    return await requestJson(`${base}/projects/slug/${encodeURIComponent(slug)}`);
  }
}




export async function createProject(payload) {
  const base = getApiBaseUrl();
  return requestJsonWithAuth(`${base}/projects`, { method: 'POST', body: payload });
}

export async function updateProject(projectId, payload) {
  const base = getApiBaseUrl();
  return requestJsonWithAuth(`${base}/projects/${projectId}`, { method: 'PUT', body: payload });
}

export async function deleteProject(projectId) {
  const base = getApiBaseUrl();
  return requestJsonWithAuth(`${base}/projects/${projectId}`, { method: 'DELETE' });
}


// =============================
// Services (best-effort CRUD + fetch)
// =============================
export async function fetchServices() {
  const base = getApiBaseUrl();
  if (!base) throw new Error('NEXT_PUBLIC_API_BASE_URL is not set');
  return requestJson(`${base}/services`);
}

export async function createService(payload) {
  const base = getApiBaseUrl();
  const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
  if (!isProbablyAdminFromToken(token)) throw new Error('Not authorized');
  return requestJsonWithAuth(`${base}/services`, { method: 'POST', body: payload });
}

export async function updateService(serviceId, payload) {
  const base = getApiBaseUrl();
  const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
  if (!isProbablyAdminFromToken(token)) throw new Error('Not authorized');
  return requestJsonWithAuth(`${base}/services/${serviceId}`, { method: 'PUT', body: payload });
}

export async function deleteService(serviceId) {
  const base = getApiBaseUrl();
  const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
  if (!isProbablyAdminFromToken(token)) throw new Error('Not authorized');
  return requestJsonWithAuth(`${base}/services/${serviceId}`, { method: 'DELETE' });
}

export async function fetchServiceBySlug(slug) {
  const base = getApiBaseUrl();
  if (!base) throw new Error('NEXT_PUBLIC_API_BASE_URL is not set');
 console.log('slug calling ',slug);
 
  // Preferred: GET /api/services/slug/:slug
  // Fallback: GET /api/services/:slug
  try {
    return await requestJson(
      `${base}/services/slug/${encodeURIComponent(slug)}`
    );
  } catch {
    return await requestJson(
      `${base}/services/slug/${encodeURIComponent(slug)}`
    );
  }
}

// Admin helper exports (optional usage from UI)
export function isAdminToken() {
  if (typeof window === 'undefined') return false;
  const token = window.localStorage.getItem('token');
  return isProbablyAdminFromToken(token);
}





