'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    categoryId: '',
    published: false,
    image: '',
  });

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (!token) { router.push('/admin/login'); return; }

    Promise.all([
      fetch(`/api/blog/${postId}`, { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
      fetch('/api/categories').then((r) => r.json()),
    ]).then(([post, cats]) => {
      setForm({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        categoryId: post.categoryId || '',
        published: post.published,
        image: post.image || '',
      });
      setCategories(cats);
      setFetching(false);
    });
  }, [postId]);

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();
      setForm({ ...form, image: data.url });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`/api/blog/${postId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push('/admin/blog');
    } else {
      const data = await res.json();
      alert(data.error || 'Beitrag konnte nicht aktualisiert werden');
    }
    setLoading(false);
  };

  if (fetching) return <div style={{ color: 'var(--color-muted)', padding: '2rem' }}>Loading post...</div>;

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: 'var(--color-muted)', cursor: 'pointer', fontSize: '0.9rem', fontFamily: 'inherit', marginBottom: '0.5rem' }}>
          ← Back to Posts
        </button>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Edit Post</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="form-group">
              <label>Title *</label>
              <input className="input-field" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Slug</label>
              <input className="input-field" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Excerpt *</label>
              <textarea className="input-field" rows={3} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} required style={{ resize: 'vertical' }} />
            </div>
            <div className="form-group">
              <label>Content *</label>
              <textarea className="input-field" rows={15} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required style={{ resize: 'vertical', fontFamily: 'monospace', fontSize: '0.9rem' }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '0.75rem', padding: '1.25rem' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem' }}>Settings</h3>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label>Category</label>
                <select className="input-field" value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
                  <option value="">No Category</option>
                  {categories.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
                </select>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} style={{ accentColor: 'var(--color-primary)' }} />
                Published
              </label>
            </div>

            <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '0.75rem', padding: '1.25rem' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem' }}>Beitragsbild</h3>
              {form.image ? (
                <div>
                  <img src={form.image} alt="Vorschau" style={{ width: '100%', borderRadius: '0.5rem' }} />
                  <button type="button" onClick={() => setForm({ ...form, image: '' })} style={{ marginTop: '0.5rem', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'inherit' }}>Entfernen</button>
                </div>
              ) : (
                <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', padding: '2rem', border: '2px dashed var(--color-border)', borderRadius: '0.5rem', cursor: 'pointer' }}>
                  <span style={{ fontSize: '1.5rem' }}>📷</span>
                  <span style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>Bild hochladen</span>
                  <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} style={{ display: 'none' }} />
                </label>
              )}
            </div>

            <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Saving...' : '💾 Save Changes'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
