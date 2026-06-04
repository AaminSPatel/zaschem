// hooks/useAdminApi.js
'use client';

import { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';

const API = 'http://localhost:5000/api';

export function useAdminApi() {
  const { token } = useAdmin();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = async (method, path, body = null) => {
    setLoading(true);
    setError(null);
    try {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
      }

      if (body) {
        options.body = JSON.stringify(body);
      }

      const res = await fetch(`${API}${path}`, options);
      const data = await res.json();

      if (res.status === 401) {
        localStorage.removeItem('zci_token');
        localStorage.removeItem('zci_admin');
        window.location.href = '/admin/login';
        return null;
      }

      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const get = (path) => callApi('GET', path);
  const post = (path, body) => callApi('POST', path, body);
  const put = (path, body) => callApi('PUT', path, body);
  const del = (path) => callApi('DELETE', path);

  return { get, post, put, del, loading, error };
}

