'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send, Loader2, CheckCircle2 } from 'lucide-react';

import { createTestimonialPublic } from '@/lib/testimonialPublicApi';

export default function PublicTestimonialSubmitPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    clientName: '',
    designation: '',
    company: '',
    review: '',
    problem: '',
    solution: '',
    description: '',
    rating: 5,
  });

  const [imageFile, setImageFile] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errMsg, setErrMsg] = useState('');

  function setF(k, v) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  function onChange(e) {
    setF(e.target.name, e.target.value);
  }

  function onRatingChange(e) {
    setF('rating', Number(e.target.value));
  }

  async function onSubmit(e) {
    e.preventDefault();

    setErrMsg('');

    const v = validate();
    if (v) {
      setErrMsg(v);
      setStatus('error');
      return;
    }

    try {
      setStatus('submitting');

      const payload = new FormData();
      payload.append('clientName', form.clientName.trim());
      payload.append('designation', form.designation.trim());
      payload.append('company', form.company.trim());
      payload.append('review', form.review.trim());
      payload.append('problem', form.problem.trim());
      payload.append('solution', form.solution.trim());
      payload.append('description', form.description.trim());
      payload.append('rating', Number(form.rating));

      if (imageFile) payload.append('image', imageFile);

      const res = await createTestimonialPublic(payload);

      if (!res?.success) {
        setErrMsg(res?.message || 'Failed to submit testimonial');
        setStatus('error');
        return;
      }

      setStatus('success');
    } catch (err) {
      setErrMsg(err?.message || 'Something went wrong');
      setStatus('error');
    }
  }

  function validate() {
    if (!form.clientName.trim()) return 'Client name is required';
    if (!form.designation.trim()) return 'Designation is required';
    if (!form.company.trim()) return 'Company name is required';
    if (!form.review.trim()) return 'Review is required';
    if (form.review.length > 1000) return 'Review cannot exceed 1000 characters';
    if (!form.problem.trim()) return 'Problem is required';
    if (form.problem.length > 1000) return 'Problem cannot exceed 1000 characters';
    if (!form.solution.trim()) return 'Solution is required';
    if (form.solution.length > 1000) return 'Solution cannot exceed 1000 characters';
    if (!form.description.trim()) return 'Detailed description is required';
    if (form.rating < 1 || form.rating > 5) return 'Rating must be between 1 and 5';
    return '';
  }

  return (
    <div className="bg-brand-dark min-h-screen text-white">
      <section className="relative py-20 border-b border-white/5 bg-[#001428]/40">
        <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-6 tracking-wider">
            <button
              onClick={() => router.push('/')}
              className="hover:text-[#64dfdf] transition-colors"
              type="button"
            >
              HOME
            </button>
            <span className="text-gray-600">›</span>
            <span className="text-[#f77f00]">PUBLIC TESTIMONIAL</span>
          </div>

          <h1 className="font-display font-black text-4xl md:text-5xl text-white tracking-tight mb-3">
            SUBMIT YOUR
            <br />
            <span className="text-[#f77f00]">TESTIMONIAL</span>
          </h1>
          <p className="text-gray-300 text-sm md:text-base">
            Fill the details below. Your testimonial will be sent for admin verification and will appear on the website after approval.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-[#004080]/30 border border-white/10 p-6 md:p-8 rounded-sm backdrop-blur-sm">
            {status === 'success' ? (
              <div className="flex flex-col items-center text-center py-14">
                <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-5 rounded-sm">
                  <CheckCircle2 size={34} className="text-green-400" />
                </div>
                <h2 className="font-display font-black text-2xl text-white mb-2">
                  Submission Received
                </h2>
                <p className="text-gray-300 text-sm max-w-md leading-relaxed">
                  Thank you! Your testimonial has been submitted for admin approval.
                </p>
                <button
                  onClick={() => router.push('/')}
                  type="button"
                  className="mt-7 group inline-flex items-center gap-2 justify-center bg-[#f77f00] hover:bg-[#fcbf49] text-white hover:text-[#002147] font-mono font-bold text-xs tracking-widest py-4 px-10 transition-all duration-300 rounded-sm shadow-md"
                >
                  Back to Home
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-6">
                {status === 'error' && errMsg && (
                  <div className="bg-red-500/10 border border-red-400/30 text-red-200 px-4 py-3 rounded-sm text-sm">
                    {errMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-mono text-[11px] tracking-wider text-gray-300 uppercase mb-2">
                      Client Name *
                    </label>
                    <input
                      name="clientName"
                      required
                      value={form.clientName}
                      onChange={onChange}
                      className="w-full bg-[#002147]/80 border border-white/10 text-white px-4 py-3.5 text-sm focus:outline-none focus:border-[#64dfdf] transition-colors placeholder:text-gray-500 rounded-sm"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] tracking-wider text-gray-300 uppercase mb-2">
                      Designation *
                    </label>
                    <input
                      name="designation"
                      required
                      value={form.designation}
                      onChange={onChange}
                      className="w-full bg-[#002147]/80 border border-white/10 text-white px-4 py-3.5 text-sm focus:outline-none focus:border-[#64dfdf] transition-colors placeholder:text-gray-500 rounded-sm"
                      placeholder="CEO, Director, etc."
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[11px] tracking-wider text-gray-300 uppercase mb-2">
                    Company Name *
                  </label>
                  <input
                    name="company"
                    required
                    value={form.company}
                    onChange={onChange}
                    className="w-full bg-[#002147]/80 border border-white/10 text-white px-4 py-3.5 text-sm focus:outline-none focus:border-[#64dfdf] transition-colors placeholder:text-gray-500 rounded-sm"
                    placeholder="Company / Organization Name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-mono text-[11px] tracking-wider text-gray-300 uppercase mb-2">
                      Rating *
                    </label>
                    <select
                      name="rating"
                      value={form.rating}
                      onChange={onRatingChange}
                      className="w-full bg-[#002147]/80 border border-white/10 text-white px-4 py-3.5 text-sm focus:outline-none focus:border-[#64dfdf] transition-colors rounded-sm appearance-none"
                    >
                      {[5, 4, 3, 2, 1].map((n) => (
                        <option key={n} value={n} className="bg-[#eeeeee] text-black">
                          {n} Star{n > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] tracking-wider text-gray-300 uppercase mb-2">
                      Testimonial Image
                    </label>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => {
                        const f = e.target.files?.[0] || null;
                        setImageFile(f);
                      }}
                      className="w-full text-sm text-gray-200"
                    />
                    <p className="text-xs text-gray-400 mt-2">Recommended: 300x300px</p>
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[11px] tracking-wider text-gray-300 uppercase mb-2">
                    Review / Testimonial *
                  </label>
                  <textarea
                    name="review"
                    required
                    value={form.review}
                    onChange={onChange}
                    maxLength={1000}
                    rows={3}
                    className="w-full bg-[#002147]/80 border border-white/10 text-white px-4 py-3.5 text-sm focus:outline-none focus:border-[#64dfdf] transition-colors placeholder:text-gray-500 resize-none rounded-sm"
                    placeholder="What did the client say about your services?"
                  />
                  <div className="text-xs text-gray-400 text-right mt-2">{form.review.length}/1000</div>
                </div>

                <div>
                  <label className="block font-mono text-[11px] tracking-wider text-gray-300 uppercase mb-2">
                    Problem *
                  </label>
                  <textarea
                    name="problem"
                    required
                    value={form.problem}
                    onChange={onChange}
                    maxLength={1000}
                    rows={2}
                    className="w-full bg-[#002147]/80 border border-white/10 text-white px-4 py-3.5 text-sm focus:outline-none focus:border-[#64dfdf] transition-colors placeholder:text-gray-500 resize-none rounded-sm"
                    placeholder="What challenge did they face?"
                  />
                  <div className="text-xs text-gray-400 text-right mt-2">{form.problem.length}/1000</div>
                </div>

                <div>
                  <label className="block font-mono text-[11px] tracking-wider text-gray-300 uppercase mb-2">
                    Solution *
                  </label>
                  <textarea
                    name="solution"
                    required
                    value={form.solution}
                    onChange={onChange}
                    maxLength={1000}
                    rows={2}
                    className="w-full bg-[#002147]/80 border border-white/10 text-white px-4 py-3.5 text-sm focus:outline-none focus:border-[#64dfdf] transition-colors placeholder:text-gray-500 resize-none rounded-sm"
                    placeholder="How did you help them?"
                  />
                  <div className="text-xs text-gray-400 text-right mt-2">{form.solution.length}/1000</div>
                </div>

                <div>
                  <label className="block font-mono text-[11px] tracking-wider text-gray-300 uppercase mb-2">
                    Detailed Description *
                  </label>
                  <textarea
                    name="description"
                    required
                    value={form.description}
                    onChange={onChange}
                    rows={4}
                    className="w-full bg-[#002147]/80 border border-white/10 text-white px-4 py-3.5 text-sm focus:outline-none focus:border-[#64dfdf] transition-colors placeholder:text-gray-500 resize-none rounded-sm"
                    placeholder="Detailed description of the success story..."
                  />
                </div>

                <div className="flex items-center justify-between py-2 border-t border-white/10">
                  <p className="text-xs text-gray-300">
                    * Admin verification ke baad hi website par show hoga.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="group inline-flex items-center gap-2 justify-center bg-[#f77f00] hover:bg-[#fcbf49] text-white hover:text-[#002147] font-mono font-bold text-xs tracking-widest py-4 px-10 transition-all duration-300 disabled:opacity-60 uppercase rounded-sm shadow-md"
                >
                  {status === 'submitting' ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="animate-spin" size={14} />
                      Submitting...
                    </span>
                  ) : (
                    <>
                      <Send size={14} />
                      Submit Testimonial
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

