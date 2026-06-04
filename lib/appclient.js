/*
  miraj/lib/appclient.js

  ✅ Purpose:
  - Admin dashboard CRUD client functions for backend integration.
  - No super_admin client logic.
  - Server controls role via: backend/src/middleware/auth.js authorize(...roles)

  ✅ Auth token handling:
  - Backend expects JWT in Authorization header: Bearer <token>.
  - You requested: store token in cookies.
  - This file reads token from cookies (default cookie name: "token").

  ✅ Debug:
  - console.log statements added for every API call.

  ===============================
  Backend integration schema (comments)
  ===============================

  Common response shape (observed in controllers):
    { success: boolean, data: any, message?: string }

  ===============================
  AUTH (backend/src/routes/authRoutes.js)
  ===============================
  NOTE: Exact endpoint paths depend on authRoutes.js.
  This file implements best-effort based on typical patterns in your codebase.

  Expected request/response patterns:

  1) POST /api/auth/login
     Request:
       { email: string, password: string }
     Response:
       { success: true, token: string, refreshToken?: string, admin?: { ... } }

  2) GET /api/auth/me (or /api/auth/admin/me)
     Headers:
       Authorization: Bearer <token>

  3) POST /api/auth/refresh (if exists)

  ===============================
  SERVICES (backend/src/routes/serviceRoutes.js)
  ===============================
  Public:
    GET    /services                -> getServices
    GET    /services/:id           -> getService
    GET    /services/slug/:slug    -> getServiceBySlug

  Private (protected + authorize):
    POST   /services               (admin creates)
    PUT    /services/:id          (admin updates)
    DELETE /services/:id          (admin deletes)
    PATCH  /services/:id/toggle-status

  Service request schema (validated in routes):
    {
      title: string,
      shortDescription: string,
      fullDescription: string,
      images: array
    }

  ===============================
  PROJECTS (backend/src/routes/projectRoutes.js)
  ===============================
  Public:
    GET    /projects
    GET    /projects/slug/:slug   -> getProjectBySlug
    GET    /projects/:id

  Private:
    POST   /projects
    PUT    /projects/:id
    DELETE /projects/:id
    PATCH  /projects/:id/toggle-featured

  Project request schema (validated in routes):
    {
      clientName: string,
      projectTitle: string,
      location: string,
      industry: string,
      problem: string,
      solution: string,
      completionDate: string
      // plus optional fields used in controller/model (images, status, slug, etc.)
    }

  ===============================
  TESTIMONIALS (backend/src/routes/testimonialRoutes.js)
  ===============================
  Public:
    GET    /testimonials
    GET    /testimonials/:id
    POST   /testimonials              (public create testimonial)

  Private:
    GET    /testimonials/admin/all
    PUT    /testimonials/:id
    DELETE /testimonials/:id
    PATCH  /testimonials/:id/approve

  Testimonial request schema (validated in routes):
    {
      clientName: string,
      designation: string,
      company: string,
      review: string,
      rating: number (1..5)
    }

  ===============================
  PRODUCTS, CONTACT, SETTINGS
  ===============================
  This file includes implementations for settings/testimonials/services/projects/products/contact
  based on your backend routes being mounted under /api in server.js.

  IMPORTANT:
  - Since your repository has both *_FIXED and non-fixed route files, endpoint paths may differ.
  - If you see 404, we’ll align by checking the exact backend mount paths.
*/

const DEFAULT_COOKIE_TOKEN_NAME = 'token';

function getCookie(name) {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&') + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

function getApiBaseUrl() {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) return '';
  return base.replace(/\/$/, '');
}

function buildHeaders(extra = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...extra,
  };

  // Cookie-based JWT
  const token = getCookie(DEFAULT_COOKIE_TOKEN_NAME);
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function requestJson(url, { method = 'GET', body, headers = {} } = {}) {
  console.log('[appclient] request', { method, url, hasBody: body != null });
  const res = await fetch(url, {
    method,
    headers: buildHeaders(headers),
    body: body != null ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    // ignore non-json
  }

  console.log('[appclient] response', {
    url,
    status: res.status,
    ok: res.ok,
    success: data?.success,
  });

  if (!res.ok) {
    const msg = data?.message || data?.error || data?.errors?.[0]?.msg || `Request failed with ${res.status}`;
    throw new Error(msg);
  }

  return data;
}

/* =========================
   AUTH (best-effort skeleton)
   ========================= */

export async function loginAdmin({ email, password }) {
  const base = getApiBaseUrl();
  if (!base) throw new Error('NEXT_PUBLIC_API_BASE_URL is not set');

  // You must confirm exact auth route paths in your backend.
  // Common path guesses:
  // - POST /api/auth/login
  // - POST /api/auth/login-admin
  const candidates = [`${base}/auth/login`, `${base}/auth/login-admin`, `${base}/api/auth/login`];

  let lastErr;
  for (const url of candidates) {
    try {
      console.log('[appclient][auth] login attempt ->', url);
      const data = await requestJson(url, { method: 'POST', body: { email, password } });
      return data;
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr || new Error('Login failed');
}

// If backend exposes GET /auth/me or /auth/admin/me
export async function getCurrentAdmin() {
  const base = getApiBaseUrl();
  const candidates = [`${base}/auth/me`, `${base}/auth/admin/me`, `${base}/auth/current`];

  let lastErr;
  for (const url of candidates) {
    try {
      console.log('[appclient][auth] getCurrentAdmin ->', url);
      return await requestJson(url, { method: 'GET' });
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr || new Error('Failed to fetch admin');
}

export async function changeAdminPassword({ oldPassword, newPassword }) {
  const base = getApiBaseUrl();
  const payload = { oldPassword, newPassword };
  const candidates = [`${base}/auth/change-password`, `${base}/auth/change-pass`, `${base}/auth/password`];

  let lastErr;
  for (const url of candidates) {
    try {
      console.log('[appclient][auth] changePassword ->', url);
      return await requestJson(url, { method: 'POST', body: payload });
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr || new Error('Password update failed');
}

/* =========================
   SETTINGS
   ========================= */

export async function getSettings() {
  const base = getApiBaseUrl();
  // backend: GET /api/settings
  return await requestJson(`${base}/settings`, { method: 'GET' });
}

export async function updateSettings(payload) {
  const base = getApiBaseUrl();
  // backend: PUT /api/settings
  return await requestJson(`${base}/settings`, { method: 'PUT', body: payload });
}

export async function updateHeroSlides({ heroSlides }) {
  const base = getApiBaseUrl();
  return await requestJson(`${base}/settings/hero-slides`, { method: 'PUT', body: { heroSlides } });
}

export async function updateSocialLinks({ socialLinks }) {
  const base = getApiBaseUrl();
  return await requestJson(`${base}/settings/social-links`, { method: 'PUT', body: { socialLinks } });
}

export async function updateSeoData({ seoData }) {
  const base = getApiBaseUrl();
  return await requestJson(`${base}/settings/seo`, { method: 'PUT', body: { seoData } });
}

/* =========================
   SERVICES
   ========================= */

export async function getAllServices() {
  const base = getApiBaseUrl();
  return await requestJson(`${base}/services`, { method: 'GET' });
}

export async function getServiceById(serviceId) {
  const base = getApiBaseUrl();
  return await requestJson(`${base}/services/${serviceId}`, { method: 'GET' });
}

export async function getServiceBySlug(slug) {
  const base = getApiBaseUrl();
  return await requestJson(`${base}/services/slug/${encodeURIComponent(slug)}`, { method: 'GET' });
}

export async function createService(payload) {
  const base = getApiBaseUrl();
  return await requestJson(`${base}/services`, { method: 'POST', body: payload });
}

export async function updateService(serviceId, payload) {
  const base = getApiBaseUrl();
  return await requestJson(`${base}/services/${serviceId}`, { method: 'PUT', body: payload });
}

export async function deleteService(serviceId) {
  const base = getApiBaseUrl();
  return await requestJson(`${base}/services/${serviceId}`, { method: 'DELETE' });
}

export async function toggleServiceStatus(serviceId) {
  const base = getApiBaseUrl();
  return await requestJson(`${base}/services/${serviceId}/toggle-status`, { method: 'PATCH' });
}

/* =========================
   PROJECTS
   ========================= */

export async function getAllProjects() {
  const base = getApiBaseUrl();
  return await requestJson(`${base}/projects`, { method: 'GET' });
}

export async function getProjectById(projectId) {
  const base = getApiBaseUrl();
  return await requestJson(`${base}/projects/${projectId}`, { method: 'GET' });
}

export async function getProjectBySlug(slug) {
  const base = getApiBaseUrl();
  return await requestJson(`${base}/projects/slug/${encodeURIComponent(slug)}`, { method: 'GET' });
}

export async function createProject(payload) {
  const base = getApiBaseUrl();
  return await requestJson(`${base}/projects`, { method: 'POST', body: payload });
}

export async function updateProject(projectId, payload) {
  const base = getApiBaseUrl();
  return await requestJson(`${base}/projects/${projectId}`, { method: 'PUT', body: payload });
}

export async function deleteProject(projectId) {
  const base = getApiBaseUrl();
  return await requestJson(`${base}/projects/${projectId}`, { method: 'DELETE' });
}

export async function toggleProjectFeatured(projectId) {
  const base = getApiBaseUrl();
  return await requestJson(`${base}/projects/${projectId}/toggle-featured`, { method: 'PATCH' });
}

/* =========================
   TESTIMONIALS
   ========================= */

export async function getAllTestimonials() {
  const base = getApiBaseUrl();
  return await requestJson(`${base}/testimonials`, { method: 'GET' });
}

export async function getTestimonialById(testimonialId) {
  const base = getApiBaseUrl();
  return await requestJson(`${base}/testimonials/${testimonialId}`, { method: 'GET' });
}

export async function createTestimonial(payload) {
  const base = getApiBaseUrl();
  // public create in backend routes/testimonialRoutes.js
  return await requestJson(`${base}/testimonials`, { method: 'POST', body: payload });
}

// admin view
export async function getAllTestimonialsAdmin() {
  const base = getApiBaseUrl();
  return await requestJson(`${base}/testimonials/admin/all`, { method: 'GET' });
}

export async function updateTestimonial(testimonialId, payload) {
  const base = getApiBaseUrl();
  return await requestJson(`${base}/testimonials/${testimonialId}`, { method: 'PUT', body: payload });
}

export async function deleteTestimonial(testimonialId) {
  const base = getApiBaseUrl();
  return await requestJson(`${base}/testimonials/${testimonialId}`, { method: 'DELETE' });
}

export async function approveTestimonial(testimonialId) {
  const base = getApiBaseUrl();
  return await requestJson(`${base}/testimonials/${testimonialId}/approve`, { method: 'PATCH' });
}

/* =========================
   PRODUCTS (best-effort)
   ========================= */

export async function getAllProducts() {
  const base = getApiBaseUrl();
  return await requestJson(`${base}/products`, { method: 'GET' });
}

export async function getProductById(productId) {
  const base = getApiBaseUrl();
  return await requestJson(`${base}/products/${productId}`, { method: 'GET' });
}

export async function createProduct(payload) {
  const base = getApiBaseUrl();
  return await requestJson(`${base}/products`, { method: 'POST', body: payload });
}

export async function updateProduct(productId, payload) {
  const base = getApiBaseUrl();
  return await requestJson(`${base}/products/${productId}`, { method: 'PUT', body: payload });
}

export async function deleteProduct(productId) {
  const base = getApiBaseUrl();
  return await requestJson(`${base}/products/${productId}`, { method: 'DELETE' });
}

/* =========================
   CONTACT INQUIRIES (backend has dedicated contact controller)
   ========================= */

export async function getAllContactInquiries() {
  const base = getApiBaseUrl();
  // Backend route likely: GET /contact/admin (or /contact/inquiries)
  // We call common candidates.
  const candidates = [`${base}/contact/admin`, `${base}/contact/inquiries`, `${base}/contact/all`];
  let lastErr;
  for (const url of candidates) {
    try {
      console.log('[appclient][contact] getAllContactInquiries ->', url);
      return await requestJson(url, { method: 'GET' });
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr || new Error('Failed to fetch contact inquiries');
}

export async function getContactInquiryById(inquiryId) {
  const base = getApiBaseUrl();
  const candidates = [`${base}/contact/${inquiryId}`, `${base}/contact/inquiries/${inquiryId}`, `${base}/contact/${inquiryId}/get`];
  let lastErr;
  for (const url of candidates) {
    try {
      console.log('[appclient][contact] getById ->', url);
      return await requestJson(url, { method: 'GET' });
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr || new Error('Failed to fetch contact inquiry by id');
}

export async function deleteContactInquiry(inquiryId) {
  const base = getApiBaseUrl();
  const candidates = [`${base}/contact/${inquiryId}`, `${base}/contact/inquiries/${inquiryId}`];
  let lastErr;
  for (const url of candidates) {
    try {
      console.log('[appclient][contact] delete ->', url);
      return await requestJson(url, { method: 'DELETE' });
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr || new Error('Failed to delete contact inquiry');
}

export async function createContactInquiry(payload) {
  const base = getApiBaseUrl();
  // Public create
  return await requestJson(`${base}/contact`, { method: 'POST', body: payload });
}

/* =========================
   UPLOAD (best-effort)
   ========================= */

export async function uploadImage({ file }) {
  // If backend supports multipart/form-data at /upload
  // We keep as best-effort.
  const base = getApiBaseUrl();
  const urlCandidates = [`${base}/upload`, `${base}/uploads`];

  let lastErr;
  for (const url of urlCandidates) {
    try {
      console.log('[appclient][upload] upload ->', url);

      const token = getCookie(DEFAULT_COOKIE_TOKEN_NAME);
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const form = new FormData();
      form.append('file', file);

      const res = await fetch(url, {
        method: 'POST',
        headers,
        body: form,
      });

      const data = await res.json().catch(() => null);
      console.log('[appclient][upload] response', { url, status: res.status, success: data?.success });

      if (!res.ok) {
        throw new Error(data?.message || data?.error || `Upload failed with ${res.status}`);
      }

      return data;
    } catch (e) {
      lastErr = e;
    }
  }

  throw lastErr || new Error('Upload failed');
}

