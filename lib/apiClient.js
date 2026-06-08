export function getApiBaseUrl() {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) return "";
  return base.replace(/\/$/, "");
}

async function requestJson(url, { method = "GET", headers, body } = {}) {
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
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
    const msg =
      data?.message || data?.error || `Request failed with ${res.status}`;
    throw new Error(msg);
  }

  return data;
}

/* 
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
} */

export async function createContactInquiry(payload) {
  const base = getApiBaseUrl();
  if (!base) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not set");
  }

  // backend mounts: app.use('/contact', contactRoutes_FIXED)
  try {
    return await requestJson(`${base}/contacts`, {
      method: "POST",
      body: payload,
    });
  } catch (e) {
    // Ensure error is visible even if UI only shows generic message
    console.error("createContactInquiry failed:", e);
    throw e;
  }
}

// =============================
// Projects (frontend fetch + best-effort admin CRUD)
// =============================
export async function fetchProjects() {
  const base = getApiBaseUrl();
  if (!base) throw new Error("NEXT_PUBLIC_API_BASE_URL is not set");

  const url = `${base}/projects`;
  console.log("[apiClient] fetchProjects ->", { url });

  try {
    const res = await requestJson(url);
    console.log("[apiClient] fetchProjects <- success", {
      type: typeof res,
      hasData: !!res?.data,
      dataType: Array.isArray(res?.data) ? "array" : typeof res?.data,
      length: Array.isArray(res?.data) ? res.data.length : undefined,
    });
    return res;
  } catch (e) {
    console.error("[apiClient] fetchProjects <- error", {
      message: e?.message,
      name: e?.name,
    });
    throw e;
  }
}

export async function fetchProjectBySlug(slug) {
  const base = getApiBaseUrl();
  if (!base) throw new Error("NEXT_PUBLIC_API_BASE_URL is not set");
  console.log("slug = ", slug);

  // Preferred route: GET /api/projects/slug/:slug
  // Fallbacks: some older backends might have GET /api/projects/:slug
  try {
    return await requestJson(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects/slug/${encodeURIComponent(slug)}`,
    );
  } catch {
    return await requestJson(
      `${base}/projects/slug/${encodeURIComponent(slug)}`,
    );
  }
}

// =============================
// Services (best-effort CRUD + fetch)
// =============================
export async function fetchServices() {
  const base = getApiBaseUrl();
  if (!base) throw new Error("NEXT_PUBLIC_API_BASE_URL is not set");
  return requestJson(`${base}/services`);
}

// =============================
// Testimonials (public)
// =============================
export async function fetchTestimonials({ page = 1, limit = 10 } = {}) {
  const base = getApiBaseUrl();
  if (!base) throw new Error("NEXT_PUBLIC_API_BASE_URL is not set");

  // backend route: GET /testimonials?page=&limit=
  // response: { success: true, data: [...], pagination: {...} }
  const url = new URL(`${base}/testimonials`);
  url.searchParams.set('page', String(page));
  url.searchParams.set('limit', String(limit));

  return requestJson(url.toString());
}


export async function fetchServiceBySlug(slug) {
  const base = getApiBaseUrl();
  if (!base) throw new Error("NEXT_PUBLIC_API_BASE_URL is not set");
  console.log("slug calling ", slug);

  // Preferred route exists on backend:
  // GET /services/slug/:slug
  try {
    return await requestJson(`${base}/services/slug/${encodeURIComponent(slug)}`);
  } catch {
    // Older backends fallback (kept for safety)
    return await requestJson(`${base}/services/${encodeURIComponent(slug)}`);
  }
}



