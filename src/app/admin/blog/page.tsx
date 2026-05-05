'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  published: boolean;
  createdAt: string;
  category: { id: string; name: string } | null;
}

export default function AdminBlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (!token) { router.push('/admin/login'); return; }
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await fetch('/api/blog?limit=50&published=all', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setPosts(data.posts);
    }
    setLoading(false);
  };

  const deletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setPosts(posts.filter((p) => p.id !== id));
      } else {
        const error = await res.json();
        console.error('API delete error:', error);
        alert(`Error: ${error.error || 'Failed to delete'}`);
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Network error. Please try again.');
    }
  };

  const togglePublish = async (post: BlogPost) => {
    await fetch(`/api/blog/${post.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...post, published: !post.published }),
    });
    setPosts(posts.map((p) => (p.id === post.id ? { ...p, published: !p.published } : p)));
  };

  if (loading) return <div style={{ color: 'var(--color-muted)', padding: '2rem' }}>Loading...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Blog Posts</h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.85rem' }}>{posts.length} total posts</p>
        </div>
        <Link href="/admin/blog/new" className="btn-primary" style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem' }}>
          ✏️ Add New Blog
        </Link>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '0.75rem',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>{post.title}</h3>
                <span
                  style={{
                    padding: '0.15rem 0.6rem',
                    borderRadius: '1rem',
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    background: post.published ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                    color: post.published ? '#22c55e' : '#ef4444',
                  }}
                >
                  {post.published ? 'Published' : 'Draft'}
                </span>
              </div>
              <p style={{ color: 'var(--color-muted-light)', fontSize: '0.8rem' }}>
                {post.category?.name || 'Uncategorized'} · {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => togglePublish(post)}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: '0.4rem',
                  fontSize: '0.8rem',
                  background: 'var(--color-border)',
                  color: 'var(--color-muted)',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                {post.published ? '📤 Unpublish' : '📥 Publish'}
              </button>
              <Link
                href={`/admin/blog/${post.id}/edit`}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: '0.4rem',
                  fontSize: '0.8rem',
                  background: 'rgba(59,130,246,0.1)',
                  color: '#3b82f6',
                }}
              >
                ✏️ Edit
              </Link>
              <button
                onClick={() => deletePost(post.id)}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: '0.4rem',
                  fontSize: '0.8rem',
                  background: 'rgba(239,68,68,0.1)',
                  color: '#ef4444',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
