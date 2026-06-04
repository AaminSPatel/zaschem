'use client';

import { useState, useEffect } from 'react';
import { authApi } from '@/lib/adminApi';
import { useAdmin } from '@/context/AdminContext';
import { Btn, ErrBox, SuccessBox } from '@/components/admin/Modal';

export default function ProfilePage() {
  const { toast, refreshAdmin } = useAdmin();
  const [admin, setAdmin] = useState(null);
  const [name, setName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [changingPw, setChangingPw] = useState(false);
  const [profileMsg, setProfileMsg] = useState('');
  const [pwMsg, setPwMsg] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('zci_admin');
    if (stored) {
      const a = JSON.parse(stored);
      setAdmin(a);
      setName(a.name || '');
    }
  }, []);

  const updateProfile = async () => {
    if (!name.trim()) {
      setProfileMsg('Name is required');
      setTimeout(() => setProfileMsg(''), 3000);
      return;
    }
    
    setSaving(true);
    // Using authApi.me() to update profile (assuming your backend supports)
    // If your backend has separate /auth/profile endpoint, we need to add it
    try {
      // Since authApi doesn't have profile update, we'll use fetch directly
      const token = localStorage.getItem('zci_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name })
      });
      
      const data = await res.json();
      
      if (data?.success) {
        // Update local storage
        const updatedAdmin = { ...admin, name };
        localStorage.setItem('zci_admin', JSON.stringify(updatedAdmin));
        setAdmin(updatedAdmin);
        await refreshAdmin(); // Refresh context
        setProfileMsg('Profile updated successfully!');
        toast('Profile updated!', 'success');
        setTimeout(() => setProfileMsg(''), 3000);
      } else {
        setProfileMsg(data?.message || 'Update failed');
        toast(data?.message || 'Update failed', 'error');
        setTimeout(() => setProfileMsg(''), 3000);
      }
    } catch (error) {
      setProfileMsg('Network error. Please try again.');
      toast('Network error', 'error');
      setTimeout(() => setProfileMsg(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  const changePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPwMsg('All fields are required');
      setTimeout(() => setPwMsg(''), 3000);
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setPwMsg("New passwords don't match");
      setTimeout(() => setPwMsg(''), 3000);
      return;
    }
    
    if (newPassword.length < 6) {
      setPwMsg('Password must be at least 6 characters');
      setTimeout(() => setPwMsg(''), 3000);
      return;
    }
    
    setChangingPw(true);
    const res = await authApi.changePassword(currentPassword, newPassword);
    setChangingPw(false);
    
    if (res?.success) {
      setPwMsg('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      toast('Password changed!', 'success');
      setTimeout(() => setPwMsg(''), 3000);
    } else {
      setPwMsg(res?.message || 'Failed to change password');
      toast(res?.message || 'Failed to change password', 'error');
      setTimeout(() => setPwMsg(''), 3000);
    }
  };

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-xl font-bold text-gray-900">Admin Profile</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your account settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Info Card */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <h2 className="font-semibold text-gray-900">Personal Information</h2>
            </div>
          </div>
          <div className="p-6">
            {/* Profile Avatar */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
                {(admin?.name || 'A')[0].toUpperCase()}
              </div>
              <div>
                <div className="font-semibold text-gray-900">{admin?.name || ''}</div>
                <div className="text-sm text-gray-500 capitalize">{admin?.role || 'Admin'}</div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-500 bg-gray-50 cursor-not-allowed" 
                  value={admin?.email || ''} 
                  readOnly 
                  disabled
                />
                <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <input 
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-500 bg-gray-50 cursor-not-allowed" 
                  value={admin?.role || 'Admin'} 
                  readOnly 
                  disabled
                />
              </div>

              {profileMsg && (
                profileMsg.includes('success') 
                  ? <SuccessBox message={profileMsg} />
                  : <ErrBox message={profileMsg} />
              )}
              
              <Btn 
                variant="primary" 
                onClick={updateProfile} 
                loading={saving}
                className="w-full"
              >
                Save Changes
              </Btn>
            </div>
          </div>
        </div>

        {/* Change Password Card */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <h2 className="font-semibold text-gray-900">Change Password</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <input 
                  type="password"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  value={currentPassword} 
                  onChange={(e) => setCurrentPassword(e.target.value)} 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input 
                  type="password"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)} 
                />
                <p className="text-xs text-gray-400 mt-1">Minimum 6 characters</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <input 
                  type="password"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                />
              </div>

              {pwMsg && (
                pwMsg.includes('successfully') 
                  ? <SuccessBox message={pwMsg} />
                  : <ErrBox message={pwMsg} />
              )}
              
              <Btn 
                variant="orange" 
                onClick={changePassword} 
                loading={changingPw}
                className="w-full"
              >
                Update Password
              </Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}