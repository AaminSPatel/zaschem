"use client";
import { useState, useRef } from "react";
import { Badge } from "./KPICard";
import {
  FormField,
  Input,
  Textarea,
  Select,
  Toggle,
  ErrBox,
  Btn,
  UploadBox,
} from "./Modal";
//import { uploadApi } from '@/lib/adminApi';

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
  onToggleFeatured,
}) {
  const {
    _id,
    title,
    client,
    location,
    year,
    category,
    status,
    featured,
    image,
    tags,
  } = project;

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 transition-colors">
      <div className="h-16 bg-gray-50 relative overflow-hidden">
        {image?.url ? (
          <img
            src={image.url}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl">
            📁
          </div>
        )}
        {featured && (
          <span className="absolute top-2 left-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
            ★ Featured
          </span>
        )}
        <span
          className={`absolute top-2 right-2 text-[10px] font-semibold px-2 py-0.5 rounded
          ${status === "active" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
        >
          {status}
        </span>
      </div>
      <div className="p-3">
        <div className="text-sm font-semibold text-gray-900 leading-tight mb-0.5">
          {title}
        </div>
        <div className="text-xs text-gray-400 mb-2">
          {client} · {location} · {year}
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          <Badge variant="blue">{category}</Badge>
          {(tags || []).slice(0, 2).map((t) => (
            <Badge key={t} variant="gray">
              {t}
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Btn
            variant="outline"
            size="sm"
            onClick={() => onEdit(_id)}
            className="flex-1 justify-center"
          >
            ✏ Edit
          </Btn>
          <Btn
            variant="ghost"
            size="sm"
            onClick={() => onToggleFeatured(_id)}
            className={featured ? "text-orange-500" : "text-gray-400"}
            aria-label="Toggle featured"
          >
            ★
          </Btn>
          <Btn
            variant="danger"
            size="sm"
            onClick={() => onDelete(_id)}
            aria-label="Delete"
          >
            🗑
          </Btn>
        </div>
      </div>
    </div>
  );
}

// In your ProjectCard file, replace the ProjectForm with this:


export function ProjectForm({ initial = {}, onSubmit, loading }) {
  const [form, setForm] = useState({
    title: initial.title || '',
    client: initial.client || '',
    location: initial.location || '',
    year: initial.year || String(new Date().getFullYear()),
    category: initial.category || '',
    problem: initial.problem || '',
    solution: initial.solution || '',
    outcome: initial.outcome || '',
    tags: (initial.tags || []).join(', '),
    testimonial: initial.testimonial || '',
    rating: initial.rating || '',
    status: initial.status || 'active',
    featured: initial.featured || false,
  });
  
  const [imgFile, setImgFile] = useState(null);
  const [imgPreview, setImgPreview] = useState(initial.image?.url || '');
  const [uploadingImg, setUploadingImg] = useState(false);
  const [err, setErr] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitLock = useRef(false);

  // Generate slug from title
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
    if (submitLock.current || isSubmitting || loading) {
      console.log('⛔ Submission already in progress...');
      return;
    }
    
    setErr('');

    // Validation as per schema
    if (!form.title) {
      setErr('Project title is required');
      return;
    }
    if (!form.client) {
      setErr('Client name is required');
      return;
    }
    if (!form.location) {
      setErr('Location is required');
      return;
    }
    if (!form.year) {
      setErr('Year is required');
      return;
    }
    if (!form.category) {
      setErr('Category is required');
      return;
    }
    if (!form.problem) {
      setErr('Problem description is required');
      return;
    }
    if (!form.solution) {
      setErr('Solution description is required');
      return;
    }
    if (!form.outcome) {
      setErr('Outcome description is required');
      return;
    }

    // Convert tags from comma-separated string to array
    const tagsArray = form.tags.split(',').map(s => s.trim()).filter(Boolean);
    
    // Create FormData matching schema exactly
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('slug', generateSlug(form.title));
    formData.append('client', form.client);
    formData.append('location', form.location);
    formData.append('year', form.year);
    formData.append('category', form.category);
    formData.append('problem', form.problem);
    formData.append('solution', form.solution);
    formData.append('outcome', form.outcome);
    formData.append('status', form.status);
    formData.append('featured', String(form.featured));
    formData.append('tags', JSON.stringify(tagsArray));
    
    // Optional fields
    if (form.testimonial) formData.append('testimonial', form.testimonial);
    if (form.rating) formData.append('rating', String(form.rating));
    
    // Image upload
    if (imgFile) {
      formData.append('image', imgFile);
    }

    submitLock.current = true;
    setIsSubmitting(true);
    setUploadingImg(true);

    try {
      const res = await onSubmit(formData);
      if (res && !res.success) {
        setErr(res.message || 'Failed to save project');
      }
    } catch (error) {
      setErr(error.message || 'Failed to save project');
    } finally {
      submitLock.current = false;
      setIsSubmitting(false);
      setUploadingImg(false);
    }
  }

  return (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto px-1">
      <ErrBox message={err} />
      
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Project Title *">
          <Input 
            value={form.title} 
            onChange={(e) => setF('title', e.target.value)} 
            placeholder="Project title" 
          />
          {form.title && (
            <p className="text-xs text-gray-400 mt-1">
              Slug: <span className="font-mono">{generateSlug(form.title)}</span>
            </p>
          )}
        </FormField>

        <FormField label="Client Name *">
          <Input 
            value={form.client} 
            onChange={(e) => setF('client', e.target.value)} 
            placeholder="Client name" 
          />
        </FormField>
        
        <FormField label="Location *">
          <Input 
            value={form.location} 
            onChange={(e) => setF('location', e.target.value)} 
            placeholder="City, Country" 
          />
        </FormField>
        
        <FormField label="Year *">
          <Input 
            value={form.year} 
            onChange={(e) => setF('year', e.target.value)} 
            placeholder="2024" 
          />
        </FormField>
        
        <FormField label="Category *">
          <Input 
            value={form.category} 
            onChange={(e) => setF('category', e.target.value)} 
            placeholder="e.g. Water Treatment, Infrastructure" 
          />
        </FormField>
      </div>
      
      <FormField label="Problem Statement *">
        <Textarea 
          value={form.problem} 
          onChange={(e) => setF('problem', e.target.value)} 
          rows={3}
          placeholder="Describe the problem/challenge faced by the client" 
        />
      </FormField>
      
      <FormField label="Solution Provided *">
        <Textarea 
          value={form.solution} 
          onChange={(e) => setF('solution', e.target.value)} 
          rows={3}
          placeholder="Describe the solution implemented" 
        />
      </FormField>
      
      <FormField label="Project Outcome *">
        <Textarea 
          value={form.outcome} 
          onChange={(e) => setF('outcome', e.target.value)} 
          rows={3}
          placeholder="Describe the results and benefits achieved" 
        />
      </FormField>
      
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Tags (comma separated)">
          <Input 
            value={form.tags} 
            onChange={(e) => setF('tags', e.target.value)} 
            placeholder="technology, innovation, sustainability" 
          />
          <p className="text-xs text-gray-400 mt-1">Separate tags with commas</p>
        </FormField>
        
        <FormField label="Rating (1-5)">
          <Select value={form.rating} onChange={(e) => setF('rating', e.target.value)}>
            <option value="">No rating</option>
            {[1,2,3,4,5].map((n) => (
              <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>
            ))}
          </Select>
        </FormField>
      </div>
      
      <FormField label="Client Testimonial (optional)">
        <Textarea 
          value={form.testimonial} 
          onChange={(e) => setF('testimonial', e.target.value)} 
          rows={2}
          placeholder="Client feedback or testimonial" 
        />
      </FormField>
      
      <FormField label="Status">
        <Select value={form.status} onChange={(e) => setF('status', e.target.value)}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </Select>
      </FormField>
      
      <div className="flex items-center justify-between py-2">
        <span className="text-sm text-gray-700">Featured Project</span>
        <Toggle value={form.featured} onChange={(v) => setF('featured', v)} />
      </div>
      
      <FormField label="Project Image">
        {imgPreview && (
          <div className="mb-2">
            <img 
              src={imgPreview} 
              alt="Preview" 
              className="w-24 h-16 object-cover rounded-lg border border-gray-200" 
            />
          </div>
        )}
        <UploadBox onFileSelect={handleFileSelect} label="Upload project cover image" />
        <p className="text-xs text-gray-400 mt-1">Recommended size: 800x600px</p>
      </FormField>
      
      <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
        <Btn 
          variant="primary" 
          onClick={handleSubmit} 
          disabled={loading || uploadingImg || isSubmitting}
        >
          {uploadingImg ? '📤 Uploading Image...' : loading ? '💾 Saving...' : '✓ Save Project'}
        </Btn>
      </div>
    </div>
  );
}