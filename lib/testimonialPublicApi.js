export const createTestimonialPublic = async (formData) => {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) throw new Error('NEXT_PUBLIC_API_BASE_URL is not set');

  const res = await fetch(`${base}/testimonials`, {
    method: 'POST',
    body: formData,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    // ignore
  }

  if (!res.ok) {
    throw new Error(data?.message || `Request failed with ${res.status}`);
  }

  return data;
};

