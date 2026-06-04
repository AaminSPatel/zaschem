'use client';
import { useState , useRef} from 'react';
import { FaStar, FaRegStar, FaCheckCircle, FaRegCircle, FaEdit, FaTrash, FaUser, FaBuilding, FaBriefcase } from 'react-icons/fa';
import { Badge } from './KPICard';
import { FormField, Input, Textarea, Select, Toggle, ErrBox, Btn } from './Modal';

function Stars({ rating, size = 'sm' }) {
  const sizeClass = size === 'sm' ? 'text-xs' : 'text-base';
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        n <= rating ? 
          <FaStar key={n} className={`${sizeClass} text-orange-400`} /> : 
          <FaRegStar key={n} className={`${sizeClass} text-gray-300`} />
      ))}
    </div>
  );
}

export default function TestimonialCard({ testimonial, onApprove, onEdit, onDelete }) {
  const { _id, clientName, designation, company, review, problem, solution, description, rating, isApproved, order, createdAt } = testimonial;
  
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm">
          {(clientName || '?')[0].toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            {clientName}
            {order > 0 && (
              <span className="text-[10px] font-normal bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                Order: {order}
              </span>
            )}
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-1 flex-wrap">
            <FaBriefcase className="text-[10px]" />
            <span>{designation}</span>
            <span className="text-gray-300">•</span>
            <FaBuilding className="text-[10px]" />
            <span>{company}</span>
          </div>
          <Stars rating={rating || 0} size="sm" />
        </div>
        <Badge variant={isApproved ? 'active' : 'pending'}>
          {isApproved ? (
            <span className="flex items-center gap-1">
              <FaCheckCircle className="text-[10px]" /> Approved
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <FaRegCircle className="text-[10px]" /> Pending
            </span>
          )}
        </Badge>
      </div>

      {/* Review */}
      <div className="space-y-2 mb-3">
        <blockquote className="text-xs text-gray-600 leading-relaxed bg-gray-50 rounded-lg p-3 border-l-2 border-orange-400">
          <span className="text-orange-400 text-sm mr-1">"</span>
          {review.length > 150 ? `${review.substring(0, 150)}...` : review}
          <span className="text-orange-400 text-sm ml-1">"</span>
        </blockquote>
        
        {problem && (
          <div className="text-[11px] text-gray-500">
            <span className="font-medium text-gray-600">Problem:</span> {problem.length > 80 ? `${problem.substring(0, 80)}...` : problem}
          </div>
        )}
        
        {solution && (
          <div className="text-[11px] text-gray-500">
            <span className="font-medium text-gray-600">Solution:</span> {solution.length > 80 ? `${solution.substring(0, 80)}...` : solution}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {!isApproved && (
          <Btn variant="primary" size="sm" onClick={() => onApprove(_id)} className="flex items-center gap-1">
            <FaCheckCircle className="text-[10px]" /> Approve
          </Btn>
        )}
        <Btn variant="outline" size="sm" onClick={() => onEdit(_id)} className="flex items-center gap-1">
          <FaEdit className="text-[10px]" /> Edit
        </Btn>
        <Btn variant="danger" size="sm" onClick={() => onDelete(_id)} className="flex items-center gap-1">
          <FaTrash className="text-[10px]" /> Delete
        </Btn>
        <span className="ml-auto text-[10px] text-gray-400">
          {new Date(createdAt).toLocaleDateString('en-IN')}
        </span>
      </div>
    </div>
  );
}
export function TestimonialForm({ initial = {}, onSubmit, loading }) {
  const [form, setForm] = useState({
    clientName: initial.clientName || '',
    designation: initial.designation || '',
    company: initial.company || '',
    review: initial.review || '',
    problem: initial.problem || '',
    solution: initial.solution || '',
    description: initial.description || '',
    rating: initial.rating || 5,
    order: initial.order || 0,
    isApproved: initial.isApproved !== undefined ? initial.isApproved : true,
    image: initial.image || null,
  });
  
  const [imgFile, setImgFile] = useState(null);
  const [imgPreview, setImgPreview] = useState(initial.image?.url || '');
  const [uploadingImg, setUploadingImg] = useState(false);
  const [err, setErr] = useState('');
  
  // 🔴 Prevent double submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitLock = useRef(false);

  function setF(k, v) { setForm((p) => ({ ...p, [k]: v })); }

  function handleFileSelect(e) {
    const file = e.target.files?.[0] || null;
    if (file) {
      setImgFile(file);
      setImgPreview(URL.createObjectURL(file));
      setF('image', file);
    }
  }

  async function handleSubmit() {
    // 🔴 Prevent double submission
    if (submitLock.current || isSubmitting || loading) {
      console.log('⛔ Submission already in progress, ignoring...');
      return;
    }
    
    setErr('');
    
    // Validation
    if (!form.clientName.trim()) {
      setErr('Client name is required');
      return;
    }
    if (!form.designation.trim()) {
      setErr('Designation is required');
      return;
    }
    if (!form.company.trim()) {
      setErr('Company name is required');
      return;
    }
    if (!form.review.trim()) {
      setErr('Review is required');
      return;
    }
    if (form.review.length > 1000) {
      setErr('Review cannot exceed 1000 characters');
      return;
    }
    if (form.problem && form.problem.length > 1000) {
      setErr('Problem cannot exceed 1000 characters');
      return;
    }
    if (form.solution && form.solution.length > 1000) {
      setErr('Solution cannot exceed 1000 characters');
      return;
    }
    if (!form.description.trim()) {
      setErr('Description is required');
      return;
    }
    if (form.rating < 1 || form.rating > 5) {
      setErr('Rating must be between 1 and 5');
      return;
    }
    
    // Create FormData
    const formData = new FormData();
    formData.append('clientName', form.clientName.trim());
    formData.append('designation', form.designation.trim());
    formData.append('company', form.company.trim());
    formData.append('review', form.review.trim());
    formData.append('problem', form.problem.trim());
    formData.append('solution', form.solution.trim());
    formData.append('description', form.description.trim());
    formData.append('rating', Number(form.rating));
    formData.append('order', Number(form.order));
    formData.append('isApproved', String(form.isApproved));
    
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
        setErr(res.message || 'Failed to save testimonial');
      }
    } catch (error) {
      setErr(error.message || 'Failed to save testimonial');
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
        <FormField label="Client Name *">
          <Input 
            value={form.clientName} 
            onChange={(e) => setF('clientName', e.target.value)} 
            placeholder="John Doe"
          />
        </FormField>
        <FormField label="Designation *">
          <Input 
            value={form.designation} 
            onChange={(e) => setF('designation', e.target.value)} 
            placeholder="CEO, Director, etc."
          />
        </FormField>
      </div>
      
      <FormField label="Company Name *">
        <Input 
          value={form.company} 
          onChange={(e) => setF('company', e.target.value)} 
          placeholder="Company name"
        />
      </FormField>
      
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Rating * (1-5)">
          <Select value={form.rating} onChange={(e) => setF('rating', Number(e.target.value))}>
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} Star{n > 1 ? 's' : ''} {'⭐'.repeat(n)}
              </option>
            ))}
          </Select>
        </FormField>
        <FormField label="Display Order">
          <Input 
            type="number" 
            value={form.order} 
            onChange={(e) => setF('order', e.target.value)} 
            placeholder="0 (highest priority)"
          />
        </FormField>
      </div>
      
      <FormField label="Review / Testimonial *">
        <Textarea 
          value={form.review} 
          onChange={(e) => setF('review', e.target.value)} 
          maxLength={1000}
          rows={3}
          placeholder="What did the client say about your services?"
        />
        <p className="text-xs text-gray-400 text-right">{form.review.length}/1000</p>
      </FormField>
      
      <FormField label="Problem (What challenge did they face?)">
        <Textarea 
          value={form.problem} 
          onChange={(e) => setF('problem', e.target.value)} 
          maxLength={1000}
          rows={2}
          placeholder="Describe the problem or challenge the client was facing..."
        />
        <p className="text-xs text-gray-400 text-right">{form.problem.length}/1000</p>
      </FormField>
      
      <FormField label="Solution (How did you help them?)">
        <Textarea 
          value={form.solution} 
          onChange={(e) => setF('solution', e.target.value)} 
          maxLength={1000}
          rows={2}
          placeholder="Describe the solution you provided..."
        />
        <p className="text-xs text-gray-400 text-right">{form.solution.length}/1000</p>
      </FormField>
      
      <FormField label="Detailed Description *">
        <Textarea 
          value={form.description} 
          onChange={(e) => setF('description', e.target.value)} 
          rows={3}
          placeholder="Detailed description of the success story..."
        />
      </FormField>

      <FormField label="Testimonial Image">
        {imgPreview && (
          <div className="mb-2">
            <img
              src={imgPreview}
              alt="Preview"
              className="w-24 h-16 object-cover rounded-lg border border-gray-200"
            />
          </div>
        )}
        <Input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileSelect}
        />
        <p className="text-xs text-gray-400 mt-1">Recommended size: 300x300px</p>
      </FormField>
      
      <div className="flex items-center justify-between py-2 border-t border-gray-100">
        <div>
          <span className="text-sm text-gray-700">Visible on website</span>
          <p className="text-xs text-gray-400">If disabled, testimonial won't appear publicly</p>
        </div>
        <Toggle 
          value={form.isApproved} 
          onChange={(v) => setF('isApproved', v)} 
        />
      </div>
      
      {/* Submit Button */}
      <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 mt-2">
        <Btn 
          variant="primary" 
          onClick={handleSubmit} 
          disabled={loading || uploadingImg || isSubmitting}
          className="min-w-[120px]"
        >
          {uploadingImg ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Uploading...
            </span>
          ) : loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Saving...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <FaCheckCircle className="text-sm" /> Save Testimonial
            </span>
          )}
        </Btn>
      </div>
    </div>
  );
}