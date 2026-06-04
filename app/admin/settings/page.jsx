'use client';

import { useState, useEffect } from 'react';
import { settingsApi } from '@/lib/adminApi';
import { useAdmin } from '@/context/AdminContext';
import Modal from '@/components/admin/Modal';
import { Btn, ErrBox } from '@/components/admin/Modal';

export default function SettingsPage() {
  const { toast } = useAdmin();
  const [settings, setSettings] = useState({});
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSlideModal, setShowSlideModal] = useState(false);
  const [editingSlideIndex, setEditingSlideIndex] = useState(null);
  const [newSlide, setNewSlide] = useState({ 
    title: '', 
    subtitle: '', 
    description: '', 
    buttonText: '', 
    buttonLink: '', 
    order: 0, 
    isActive: true,
    imageUrl: ''
  });
  const [err, setErr] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const res = await settingsApi.get();
    if (res?.success) {
      setSettings(res.data || {});
      setErr('');
    } else {
      setErr(res?.message || 'Failed to load settings');
    }
    setLoading(false);
  };

  const saveBrand = async () => {
    setSaving(true);
    const payload = {
      brandName: document.getElementById('brandName')?.value,
      tagline: document.getElementById('tagline')?.value,
      companyDescription: document.getElementById('companyDesc')?.value,
      contactFormEmail: document.getElementById('contactEmail')?.value,
    };
    const res = await settingsApi.update(payload);
    setSaving(false);
    if (res?.success) {
      setSettings(res.data);
      toast('Brand settings saved!', 'success');
    } else {
      toast(res?.message || 'Save failed', 'error');
    }
  };

  const saveContact = async () => {
    setSaving(true);
    const payload = {
      emails: document.getElementById('emails')?.value.split('\n').map(s => s.trim()).filter(Boolean),
      phones: document.getElementById('phones')?.value.split('\n').map(s => s.trim()).filter(Boolean),
      address: {
        street: document.getElementById('street')?.value,
        city: document.getElementById('city')?.value,
        state: document.getElementById('state')?.value,
        zipCode: document.getElementById('zip')?.value,
        fullAddress: document.getElementById('fullAddr')?.value,
      }
    };
    const res = await settingsApi.update(payload);
    setSaving(false);
    if (res?.success) {
      setSettings(res.data);
      toast('Contact settings saved!', 'success');
    } else {
      toast(res?.message || 'Save failed', 'error');
    }
  };

  const saveSocial = async () => {
    setSaving(true);
    const platforms = ['facebook', 'twitter', 'linkedin', 'instagram', 'youtube', 'whatsapp'];
    const socialLinks = platforms.map(p => ({ 
      platform: p, 
      url: document.getElementById(`social_${p}`)?.value 
    })).filter(l => l.url);
    const res = await settingsApi.updateSocialLinks(socialLinks);
    setSaving(false);
    if (res?.success) {
      setSettings(res.data);
      toast('Social links saved!', 'success');
    } else {
      toast(res?.message || 'Save failed', 'error');
    }
  };

  const addSlide = async () => {
    if (!newSlide.title.trim()) {
      toast('Slide title is required', 'error');
      return;
    }
    setSaving(true);
    let slides = [...(settings.heroSlides || [])];
    
    if (editingSlideIndex !== null) {
      slides[editingSlideIndex] = newSlide;
    } else {
      slides.push({ ...newSlide, order: slides.length });
    }
    
    const res = await settingsApi.updateHeroSlides(slides);
    setSaving(false);
    if (res?.success) {
      setSettings(res.data);
      setShowSlideModal(false);
      setEditingSlideIndex(null);
      setNewSlide({ title: '', subtitle: '', description: '', buttonText: '', buttonLink: '', order: 0, isActive: true, imageUrl: '' });
      toast(editingSlideIndex !== null ? 'Slide updated!' : 'Slide added!', 'success');
    } else {
      toast(res?.message || 'Operation failed', 'error');
    }
  };

  const deleteSlide = async (index) => {
    if (!confirm('Delete this slide?')) return;
    setSaving(true);
    const slides = [...(settings.heroSlides || [])];
    slides.splice(index, 1);
    const res = await settingsApi.updateHeroSlides(slides);
    setSaving(false);
    if (res?.success) {
      setSettings(res.data);
      toast('Slide deleted!', 'success');
    } else {
      toast(res?.message || 'Delete failed', 'error');
    }
  };

  const toggleSlideStatus = async (index) => {
    const slides = [...(settings.heroSlides || [])];
    slides[index].isActive = !slides[index].isActive;
    const res = await settingsApi.updateHeroSlides(slides);
    if (res?.success) {
      setSettings(res.data);
      toast(`Slide ${slides[index].isActive ? 'activated' : 'deactivated'}`, 'success');
    }
  };

  const editSlide = (slide, index) => {
    setNewSlide(slide);
    setEditingSlideIndex(index);
    setShowSlideModal(true);
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
        <div className="space-y-4">
          {[1,2,3].map(i => <div key={i} className="h-32 bg-gray-200 rounded"></div>)}
        </div>
      </div>
    );
  }

  // ✅ Only 4 tabs now - SEO removed
  const tabs = ['Brand', 'Contact', 'Social Links', 'Hero Slides'];

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-xl font-bold text-gray-900">Website Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage brand, contact info, social links and hero slides</p>
      </div>

      {err && <ErrBox message={err} />}

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex gap-1">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition ${
                activeTab === i
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Brand Tab */}
      {activeTab === 0 && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="font-semibold text-gray-900">Brand Identity</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand Name *</label>
                <input className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" id="brandName" defaultValue={settings.brandName || ''} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
                <input className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" id="tagline" defaultValue={settings.tagline || ''} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Description *</label>
              <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" rows={3} id="companyDesc" defaultValue={settings.companyDescription || ''}></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Form Email</label>
                <input className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" id="contactEmail" defaultValue={settings.contactFormEmail || ''} />
              </div>
             
            </div>
            <Btn variant="primary" onClick={saveBrand} loading={saving}>
              Save Brand Settings
            </Btn>
          </div>
        </div>
      )}

      {/* Contact Tab */}
      {activeTab === 1 && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="font-semibold text-gray-900">Contact Information</h2>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Emails (one per line)</label>
              <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" rows={3} id="emails" defaultValue={(settings.emails || []).join('\n')}></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phones (one per line)</label>
              <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" rows={2} id="phones" defaultValue={(settings.phones || []).join('\n')}></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Street</label>
                <input className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" id="street" defaultValue={settings.address?.street || ''} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" id="city" defaultValue={settings.address?.city || ''} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" id="state" defaultValue={settings.address?.state || ''} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                <input className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" id="zip" defaultValue={settings.address?.zipCode || ''} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
              <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" rows={2} id="fullAddr" defaultValue={settings.address?.fullAddress || ''}></textarea>
            </div>
            <Btn variant="primary" onClick={saveContact} loading={saving}>
              Save Contact Settings
            </Btn>
          </div>
        </div>
      )}

      {/* Social Links Tab */}
      {activeTab === 2 && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="font-semibold text-gray-900">Social Media Links</h2>
          </div>
          <div className="p-6 space-y-4">
            {['facebook', 'twitter', 'linkedin', 'instagram', 'youtube', 'whatsapp'].map(p => {
              const link = (settings.socialLinks || []).find(l => l.platform === p);
              return (
                <div key={p}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{p}</label>
                  <input className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" id={`social_${p}`} defaultValue={link?.url || ''} placeholder="https://..." />
                </div>
              );
            })}
            <Btn variant="primary" onClick={saveSocial} loading={saving}>
              Save Social Links
            </Btn>
          </div>
        </div>
      )}

      {/* Hero Slides Tab */}
      {activeTab === 3 && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h2 className="font-semibold text-gray-900">Hero Slides ({settings.heroSlides?.length || 0})</h2>
            <Btn variant="primary" size="sm" onClick={() => {
              setEditingSlideIndex(null);
              setNewSlide({ title: '', subtitle: '', description: '', buttonText: '', buttonLink: '', order: 0, isActive: true, imageUrl: '' });
              setShowSlideModal(true);
            }}>
              + Add Slide
            </Btn>
          </div>
          <div className="p-6">
            {(!settings.heroSlides || settings.heroSlides.length === 0) ? (
              <div className="text-center py-12 text-gray-500">
                <div className="text-4xl mb-2">🎨</div>
                <p>No slides yet. Click "Add Slide" to create one.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {settings.heroSlides.map((slide, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{slide.title || 'Untitled'}</div>
                        <div className="text-sm text-gray-500 mt-1">{slide.subtitle || ''}</div>
                        {slide.description && <div className="text-xs text-gray-400 mt-1 line-clamp-2">{slide.description}</div>}
                        <div className="flex gap-2 mt-2">
                          {slide.buttonText && (
                            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">🔗 {slide.buttonText}</span>
                          )}
                          <span className={`text-xs px-2 py-0.5 rounded ${slide.isActive ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                            {slide.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => toggleSlideStatus(idx)} className="px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
                          {slide.isActive ? '🔘 Deactivate' : '⚪ Activate'}
                        </button>
                        <button onClick={() => editSlide(slide, idx)} className="px-2 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
                          ✎ Edit
                        </button>
                        <button onClick={() => deleteSlide(idx)} className="px-2 py-1 text-sm text-red-600 hover:bg-red-50 rounded">
                          🗑 Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hero Slide Modal */}
      {showSlideModal && (
        <Modal 
          onClose={() => {
            setShowSlideModal(false);
            setEditingSlideIndex(null);
          }} 
          title={editingSlideIndex !== null ? 'Edit Hero Slide' : 'Add Hero Slide'}
          footer={
            <>
              <Btn variant="outline" size="sm" onClick={() => setShowSlideModal(false)}>Cancel</Btn>
              <Btn variant="primary" size="sm" onClick={addSlide} loading={saving}>Save</Btn>
            </>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={newSlide.title} onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })} placeholder="Main heading" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={newSlide.subtitle} onChange={(e) => setNewSlide({ ...newSlide, subtitle: e.target.value })} placeholder="Secondary text" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" rows={2} value={newSlide.description} onChange={(e) => setNewSlide({ ...newSlide, description: e.target.value })} placeholder="Detailed description"></textarea>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                <input className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={newSlide.buttonText} onChange={(e) => setNewSlide({ ...newSlide, buttonText: e.target.value })} placeholder="Learn More" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
                <input className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={newSlide.buttonLink} onChange={(e) => setNewSlide({ ...newSlide, buttonLink: e.target.value })} placeholder="/contact" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={newSlide.imageUrl} onChange={(e) => setNewSlide({ ...newSlide, imageUrl: e.target.value })} placeholder="https://..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order (0 = first)</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" type="number" value={newSlide.order} onChange={(e) => setNewSlide({ ...newSlide, order: parseInt(e.target.value) || 0 })} />
            </div>
            <div className="flex items-center gap-3 py-2">
              <button
                type="button"
                onClick={() => setNewSlide({ ...newSlide, isActive: !newSlide.isActive })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${newSlide.isActive ? 'bg-green-600' : 'bg-gray-300'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${newSlide.isActive ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
              <label className="text-sm text-gray-700 cursor-pointer">Active / Visible on website</label>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}