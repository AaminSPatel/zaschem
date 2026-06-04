'use client';
import { useState } from 'react';
import { FormField, Input, Textarea, Select, Toggle, ErrBox, SuccessBox, Btn, UploadBox } from './Modal';
import { settingsApi, uploadApi } from '@/lib/adminApi';

// ✅ Only 4 tabs - SEO removed
const TABS = ['Brand', 'Contact', 'Social Links', 'Hero Slides'];
const PLATFORMS = ['facebook', 'twitter', 'linkedin', 'instagram', 'youtube', 'whatsapp'];

export default function SettingsTabs({ initialData }) {
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState(initialData || {});

  return (
    <div>
      {/* Tab bar */}
      <div className="flex border-b border-gray-200 mb-5 overflow-x-auto">
        {TABS.map((t, i) => (
          <button
            key={t}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors
              ${activeTab === i ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {activeTab === 0 && <BrandTab data={data} setData={setData} />}
      {activeTab === 1 && <ContactTab data={data} setData={setData} />}
      {activeTab === 2 && <SocialTab data={data} setData={setData} />}
      {activeTab === 3 && <HeroTab data={data} setData={setData} />}
    </div>
  );
}

function BrandTab({ data, setData }) {
  const [form, setForm] = useState({
    brandName: data.brandName || '',
    tagline: data.tagline || '',
    companyDescription: data.companyDescription || '',
    contactFormEmail: data.contactFormEmail || ''
  });
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true); setErr(''); setMsg('');
    const res = await settingsApi.update(form);
    setSaving(false);
    if (res?.success) { setMsg('Brand settings saved!'); setData((d) => ({ ...d, ...form })); }
    else setErr(res?.message || 'Failed');
  }

  return (
    <div className="max-w-xl">
      <ErrBox message={err} /><SuccessBox message={msg} />
      <FormField label="Brand Name *">
        <Input value={form.brandName} onChange={(e) => setForm((p) => ({ ...p, brandName: e.target.value }))} />
      </FormField>
      <FormField label="Tagline">
        <Input value={form.tagline} onChange={(e) => setForm((p) => ({ ...p, tagline: e.target.value }))} />
      </FormField>
      <FormField label="Company Description *">
        <Textarea value={form.companyDescription} onChange={(e) => setForm((p) => ({ ...p, companyDescription: e.target.value }))} className="min-h-[90px]" />
      </FormField>
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Contact Form Email">
          <Input type="email" value={form.contactFormEmail} onChange={(e) => setForm((p) => ({ ...p, contactFormEmail: e.target.value }))} />
        </FormField>
    
      </div>
      <Btn variant="primary" onClick={save} disabled={saving}>{saving ? 'Saving…' : '✓ Save Brand'}</Btn>
    </div>
  );
}

function ContactTab({ data, setData }) {
  const addr = data.address || {};
  const [form, setForm] = useState({
    emails: (data.emails || []).join('\n'),
    phones: (data.phones || []).join('\n'),
    street: addr.street || '',
    city: addr.city || '',
    state: addr.state || '',
    zipCode: addr.zipCode || '',
    fullAddress: addr.fullAddress || '',
  });
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true); setErr(''); setMsg('');
    const payload = {
      emails: form.emails.split('\n').map((s) => s.trim()).filter(Boolean),
      phones: form.phones.split('\n').map((s) => s.trim()).filter(Boolean),
      address: { street: form.street, city: form.city, state: form.state, zipCode: form.zipCode, fullAddress: form.fullAddress },
    };
    const res = await settingsApi.update(payload);
    setSaving(false);
    if (res?.success) { setMsg('Contact info saved!'); setData((d) => ({ ...d, ...payload })); }
    else setErr(res?.message || 'Failed');
  }

  const f = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));
  return (
    <div className="max-w-xl">
      <ErrBox message={err} /><SuccessBox message={msg} />
      <FormField label="Emails (one per line)">
        <Textarea value={form.emails} onChange={f('emails')} placeholder="info@zaschemindia.com" />
      </FormField>
      <FormField label="Phones (one per line)">
        <Textarea value={form.phones} onChange={f('phones')} placeholder="+91-1234567890" />
      </FormField>
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Street"><Input value={form.street} onChange={f('street')} /></FormField>
        <FormField label="City"><Input value={form.city} onChange={f('city')} /></FormField>
        <FormField label="State"><Input value={form.state} onChange={f('state')} /></FormField>
        <FormField label="ZIP Code"><Input value={form.zipCode} onChange={f('zipCode')} /></FormField>
      </div>
      <FormField label="Full Address">
        <Textarea value={form.fullAddress} onChange={f('fullAddress')} />
      </FormField>
      <Btn variant="primary" onClick={save} disabled={saving}>{saving ? 'Saving…' : '✓ Save Contact'}</Btn>
    </div>
  );
}

function SocialTab({ data, setData }) {
  const linksMap = {};
  (data.socialLinks || []).forEach((l) => { linksMap[l.platform] = l.url; });
  const [links, setLinks] = useState(linksMap);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true); setErr(''); setMsg('');
    const socialLinks = PLATFORMS.map((p) => ({ platform: p, url: links[p] || '' })).filter((l) => l.url);
    const res = await settingsApi.updateSocialLinks(socialLinks);
    setSaving(false);
    if (res?.success) { setMsg('Social links saved!'); setData((d) => ({ ...d, socialLinks })); }
    else setErr(res?.message || 'Failed');
  }

  return (
    <div className="max-w-xl">
      <ErrBox message={err} /><SuccessBox message={msg} />
      {PLATFORMS.map((p) => (
        <FormField key={p} label={p.charAt(0).toUpperCase() + p.slice(1)}>
          <Input
            type="url"
            value={links[p] || ''}
            onChange={(e) => setLinks((l) => ({ ...l, [p]: e.target.value }))}
            placeholder={`https://${p}.com/zaschemindia`}
          />
        </FormField>
      ))}
      <Btn variant="primary" onClick={save} disabled={saving}>{saving ? 'Saving…' : '✓ Save Social Links'}</Btn>
    </div>
  );
}

function HeroTab({ data, setData }) {
  const [slides, setSlides] = useState(data.heroSlides || []);
  const [adding, setAdding] = useState(false);
  const [newSlide, setNewSlide] = useState({ title: '', subtitle: '', description: '', buttonText: '', buttonLink: '', order: 0, isActive: true, image: '' });
  const [imgFile, setImgFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  async function addSlide() {
    setErr(''); setUploading(true);
    let imageUrl = newSlide.image;
    if (imgFile) {
      const res = await uploadApi.single(imgFile);
      if (res?.success) imageUrl = res.data.url;
      else { setErr('Image upload failed'); setUploading(false); return; }
    }
    setUploading(false);
    const updated = [...slides, { ...newSlide, image: imageUrl }];
    const res = await settingsApi.updateHeroSlides(updated);
    if (res?.success) {
      setSlides(updated); setData((d) => ({ ...d, heroSlides: updated }));
      setAdding(false); setMsg('Slide added!'); setNewSlide({ title: '', subtitle: '', description: '', buttonText: '', buttonLink: '', order: 0, isActive: true, image: '' });
    } else setErr(res?.message || 'Failed');
  }

  async function removeSlide(idx) {
    if (!confirm('Remove this slide?')) return;
    const updated = slides.filter((_, i) => i !== idx);
    const res = await settingsApi.updateHeroSlides(updated);
    if (res?.success) { setSlides(updated); setData((d) => ({ ...d, heroSlides: updated })); }
    else setErr(res?.message || 'Failed');
  }

  const ns = (k) => (e) => setNewSlide((p) => ({ ...p, [k]: e.target.value }));

  return (
    <div>
      <ErrBox message={err} /><SuccessBox message={msg} />

      {/* Existing slides */}
      {slides.length === 0 && !adding && (
        <div className="text-center py-10 text-gray-400 text-sm">No hero slides yet</div>
      )}
      {slides.map((slide, i) => (
        <div key={i} className="flex gap-3 items-center p-3 border border-gray-200 rounded-xl mb-3">
          {slide.image
            ? <img src={slide.image} alt={slide.title} className="w-16 h-10 object-cover rounded-lg flex-shrink-0" />
            : <div className="w-16 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-300 flex-shrink-0">🖼</div>}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900 truncate">{slide.title || 'Untitled'}</div>
            <div className="text-xs text-gray-400 truncate">{slide.subtitle}</div>
          </div>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${slide.isActive ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
            {slide.isActive ? 'Active' : 'Inactive'}
          </span>
          <Btn variant="danger" size="sm" onClick={() => removeSlide(i)}>🗑</Btn>
        </div>
      ))}

      {/* Add new slide form */}
      {adding ? (
        <div className="border border-blue-200 rounded-xl p-4 bg-blue-50/30">
          <div className="text-sm font-semibold text-gray-800 mb-3">New Slide</div>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Title"><Input value={newSlide.title} onChange={ns('title')} /></FormField>
            <FormField label="Subtitle"><Input value={newSlide.subtitle} onChange={ns('subtitle')} /></FormField>
            <FormField label="Button Text"><Input value={newSlide.buttonText} onChange={ns('buttonText')} /></FormField>
            <FormField label="Button Link"><Input value={newSlide.buttonLink} onChange={ns('buttonLink')} /></FormField>
            <FormField label="Order"><Input type="number" value={newSlide.order} onChange={ns('order')} /></FormField>
          </div>
          <FormField label="Description">
            <Textarea value={newSlide.description} onChange={ns('description')} />
          </FormField>
          <div className="mb-3">
            <Toggle value={newSlide.isActive} onChange={(v) => setNewSlide((p) => ({ ...p, isActive: v }))} label="Active" />
          </div>
          <FormField label="Slide Image">
            <UploadBox onFileSelect={(files) => setImgFile(files?.[0])} label="Upload slide image" />
            {imgFile && <div className="text-xs text-gray-500 mt-1">{imgFile.name}</div>}
          </FormField>
          <div className="flex gap-2">
            <Btn variant="primary" onClick={addSlide} disabled={uploading}>{uploading ? 'Uploading…' : '+ Add Slide'}</Btn>
            <Btn variant="outline" onClick={() => setAdding(false)}>Cancel</Btn>
          </div>
        </div>
      ) : (
        <Btn variant="outline" onClick={() => { setAdding(true); setMsg(''); }}>+ Add Hero Slide</Btn>
      )}
    </div>
  );
}