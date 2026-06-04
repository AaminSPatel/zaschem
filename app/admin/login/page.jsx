'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/context/AdminContext';

export default function LoginPage() {
  const { login } = useAdmin();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!email || !password) {
      setErr('Email and password are required');
      return;
    }

    setLoading(true);
    setErr('');

    try {
      const res = await login(email, password);
      setLoading(false);

      if (res?.success) {
        console.log('[login page] success, pushing dashboard');
        router.push('/admin/dashboard');
      } else {
        console.log('[login page] failed', res);
        setErr(res?.message || 'Login failed');
      }
    } catch (err) {
      setLoading(false);
      console.error('[login page] submit error', err);
      setErr(err?.message || 'Login failed');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-200 border-t-4 border-t-blue-600 p-8 shadow-sm">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
              ZCI
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">ZAS CHEM INDIA</div>
              <div className="text-xs font-semibold text-orange-500 tracking-wide">Admin Panel</div>
            </div>
          </div>

          <div className="mb-6">
            <h1 className="text-xl font-bold text-gray-900">Sign In</h1>
            <p className="text-sm text-gray-500 mt-0.5">Enter your admin credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="admin@zaschemindia.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="mb-5">
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </div>

            {err && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-3 py-2.5 text-sm mb-4">
                ⚠ {err}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
            >
              {loading ? 'Signing in…' : 'Sign In to Dashboard'}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-5">
            Secure admin access · ZAS CHEM INDIA PVT. LTD.
          </p>
        </div>
      </div>
    </div>
  );
}