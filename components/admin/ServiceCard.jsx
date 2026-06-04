'use client';
import { useState, useRef } from 'react';
import { Badge } from './KPICard';
import { FormField, Input, Textarea, Select, Toggle, ErrBox, Btn, UploadBox } from './Modal';

export default function ServiceCard({ service, onEdit, onDelete, onToggle }) {
  const { title, slug, shortDesc, status, featured, image } = service;
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 transition-colors">
      <div className="h-16 bg-gray-50 flex items-center justify-center text-3xl relative">
        {image?.url ? (
          <img
            src={image.url}
            alt={title}
            className="w-full h-full object-cover scale-100 hover:scale-110 transition-all duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl">📁</div>
        )}
      </div>

      <div className="p-3">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant={status === 'active' ? 'active' : status === 'draft' ? 'draft' : 'inactive'}>
            {status}
          </Badge>
        </div>
        <div className="text-sm font-semibold text-gray-900 leading-tight mb-0.5">{title}</div>
        <div className="text-[11px] text-gray-400 mb-2">/{slug}</div>
        {shortDesc && <div className="text-xs text-gray-500 mb-3 line-clamp-2">{shortDesc}</div>}
        <div className="flex items-center gap-2">
          <Btn variant="outline" size="sm" onClick={() => onEdit(service._id)} className="flex-1 justify-center">
            ✏ Edit
          </Btn>
          <Btn variant="danger" size="sm" onClick={() => onDelete(service._id)} aria-label="Delete">
            🗑
          </Btn>
          <Toggle value={status === 'active'} onChange={() => onToggle(service._id)} />
        </div>
      </div>
    </div>
  );
}

export function ServiceForm({ initial = {}, onSubmit, loading }) {
  const [form, setForm] = useState({
    title: initial.title || '',
    shortDesc: initial.shortDesc || '',
    description: initial.description || '',
    status: initial.status || 'active',
    metaTitle: initial.metaTitle || '',
    metaDesc: initial.metaDesc || '',
    features: (initial.features || []).join('\n'),
    applications: (initial.applications || []).join('\n'),
    keywords: (initial.keywords || []).join(', '),
    featured: initial.featured || false,
    order: initial.order || 0,
  });

  const [imgFile, setImgFile] = useState(null);
  const [imgPreview, setImgPreview] = useState(initial.image?.url || '');
  const [uploadingImg, setUploadingImg] = useState(false);
  const [err, setErr] = useState('');
  
  // 🔴 IMPORTANT: Add this to prevent double submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitLock = useRef(false);

  // Auto-generate slug from title
  function generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  function setF(k, v) {
    setForm((prev) => ({ ...prev, [k]: v }));
  }

  function handleFileSelect(files) {
    if (!files?.[0]) return;
    setImgFile(files[0]);
    setImgPreview(URL.createObjectURL(files[0]));
  }

  async function handleSubmit() {
    // 🔴 CRITICAL FIX: Prevent double submission
    if (submitLock.current) {
      console.log('⛔ Submission already in progress, ignoring...');
      return;
    }
    
    if (isSubmitting || loading) {
      console.log('⛔ Already submitting, ignoring...');
      return;
    }
    
    setErr('');

    // Validate required fields
    if (!form.title) {
      setErr('Title is required');
      return;
    }
    if (!form.shortDesc) {
      setErr('Short description is required');
      return;
    }
    if (!form.description) {
      setErr('Detailed description is required');
      return;
    }
    
    const featuresArray = form.features.split('\n').filter(s => s.trim());
    if (featuresArray.length < 3) {
      setErr('At least 3 features are required');
      return;
    }
    
    const applicationsArray = form.applications.split('\n').filter(s => s.trim());
    if (applicationsArray.length < 3) {
      setErr('At least 3 applications are required');
      return;
    }
    
    const keywordsArray = form.keywords.split(',').map(k => k.trim()).filter(k => k);
    if (keywordsArray.length < 3) {
      setErr('At least 3 keywords are required');
      return;
    }
console.log('📤 Features array:', featuresArray);
  console.log('📤 Applications array:', applicationsArray);
  console.log('📤 Keywords array:', keywordsArray)
    // Create FormData
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('shortDesc', form.shortDesc);
    formData.append('description', form.description);
    formData.append('status', form.status);
    formData.append('order', String(form.order));
    formData.append('featured', String(form.featured));
    formData.append('metaTitle', form.metaTitle || '');
    formData.append('metaDesc', form.metaDesc || '');
    
    // Send arrays as JSON strings
    formData.append('features', JSON.stringify(featuresArray));
    formData.append('applications', JSON.stringify(applicationsArray));
    formData.append('keywords', JSON.stringify(keywordsArray));
    
    // Add image if selected
    if (imgFile) {
      formData.append('image', imgFile);
    }

    // 🔴 Set lock before async operation
    submitLock.current = true;
    setIsSubmitting(true);
    setUploadingImg(true);

    try {
      const res = await onSubmit(formData);
      if (res && !res.success) {
        setErr(res.message || 'Failed to save service');
      }
    } catch (error) {
      setErr(error.message || 'Failed to save service');
    } finally {
      // 🔴 Release lock after completion
      submitLock.current = false;
      setIsSubmitting(false);
      setUploadingImg(false);
    }
  }

  return (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto px-1">
      <ErrBox message={err} />

      <FormField label="Title *">
        <Input 
          value={form.title} 
          onChange={(e) => setF('title', e.target.value)} 
          placeholder="Service title" 
        />
        {form.title && (
          <p className="text-xs text-gray-400 mt-1">
            Slug: <span className="font-mono">{generateSlug(form.title)}</span>
          </p>
        )}
      </FormField>

      <FormField label="Short Description *">
        <Textarea
          value={form.shortDesc}
          onChange={(e) => setF('shortDesc', e.target.value)}
          rows={2}
          maxLength={300}
          placeholder="Brief description (max 300 chars)"
        />
        <p className="text-xs text-gray-400 text-right">{form.shortDesc.length}/300</p>
      </FormField>

      <FormField label="Detailed Description *">
        <Textarea
          value={form.description}
          onChange={(e) => setF('description', e.target.value)}
          rows={4}
          placeholder="Complete service description"
        />
      </FormField>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Status">
          <Select value={form.status} onChange={(e) => setF('status', e.target.value)}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="draft">Draft</option>
          </Select>
        </FormField>
        <FormField label="Display Order">
          <Input 
            type="number" 
            value={form.order} 
            onChange={(e) => setF('order', e.target.value)} 
            placeholder="0"
          />
        </FormField>
      </div>

      <div className="border-t border-gray-100 pt-3">
        <h4 className="text-sm font-medium text-gray-700 mb-2">SEO Settings</h4>
        <div className="space-y-3">
          <FormField label="Meta Title (max 60 chars)">
            <Input 
              value={form.metaTitle} 
              onChange={(e) => setF('metaTitle', e.target.value)} 
              maxLength={60}
              placeholder="SEO title for search engines"
            />
            <p className="text-xs text-gray-400 text-right">{form.metaTitle.length}/60</p>
          </FormField>

          <FormField label="Meta Description (max 160 chars)">
            <Textarea 
              value={form.metaDesc} 
              onChange={(e) => setF('metaDesc', e.target.value)} 
              rows={2}
              maxLength={160}
              placeholder="SEO description"
            />
            <p className="text-xs text-gray-400 text-right">{form.metaDesc.length}/160</p>
          </FormField>

          <FormField label="Keywords (comma separated, min 3)">
            <Input
              value={form.keywords}
              onChange={(e) => setF('keywords', e.target.value)}
              placeholder="service, solution, technology"
            />
          </FormField>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Features (one per line, min 3)">
          <Textarea
            value={form.features}
            onChange={(e) => setF('features', e.target.value)}
            rows={4}
            placeholder={'Feature 1\nFeature 2\nFeature 3'}
          />
        </FormField>

        <FormField label="Applications (one per line, min 3)">
          <Textarea
            value={form.applications}
            onChange={(e) => setF('applications', e.target.value)}
            rows={4}
            placeholder={'Application 1\nApplication 2\nApplication 3'}
          />
        </FormField>
      </div>

      <div className="flex items-center justify-between py-2">
        <span className="text-sm text-gray-700">Featured Service</span>
        <Toggle 
          value={form.featured} 
          onChange={(v) => setF('featured', v)} 
        />
      </div>

      <FormField label="Service Image">
        {imgPreview && (
          <div className="mb-2">
            <img
              src={imgPreview}
              alt="Preview"
              className="w-24 h-16 object-cover rounded-lg border border-gray-200"
            />
          </div>
        )}
        <UploadBox onFileSelect={handleFileSelect} />
        <p className="text-xs text-gray-400 mt-1">Recommended size: 400x300px</p>
      </FormField>

      <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
        <Btn 
          variant="primary" 
          onClick={handleSubmit} 
          disabled={loading || uploadingImg || isSubmitting}
        >
          {uploadingImg ? '📤 Uploading Image...' : loading ? '💾 Saving...' : '✓ Save Service'}
        </Btn>
      </div>
    </div>
  );
}