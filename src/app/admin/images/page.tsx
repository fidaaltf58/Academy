'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface ImageItem {
  name: string;
  url: string;
}

export default function AdminImagesPage() {
  const router = useRouter();
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const fetchImages = async () => {
    try {
      const res = await fetch('/api/landing-images');
      if (!res.ok) throw new Error();
      const data = await res.json();
      setImages(data.images || []);
    } catch {
      setMessage({ type: 'error', text: 'Failed to load images' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchImages();
  }, [token, router]);

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/landing-images', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Upload failed');
    }

    return await res.json();
  };

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    setMessage(null);

    try {
      for (let i = 0; i < files.length; i++) {
        await uploadFile(files[i]);
      }
      setMessage({ type: 'success', text: `${files.length} image(s) uploaded successfully!` });
      await fetchImages();
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Upload failed' });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (filename: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const res = await fetch('/api/landing-images', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ filename }),
      });

      if (!res.ok) throw new Error();

      setMessage({ type: 'success', text: 'Image deleted successfully' });
      await fetchImages();
    } catch {
      setMessage({ type: 'error', text: 'Failed to delete image' });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleUpload(e.dataTransfer.files);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400, color: 'var(--color-muted)' }}>
        Loading images...
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>🖼️ Landing Page Images</h1>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
          Manage the images displayed in the slideshow on the landing page.
        </p>
      </div>

      {/* Status Message */}
      {message && (
        <div
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '0.75rem',
            marginBottom: '1.5rem',
            background: message.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
            border: `1px solid ${message.type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
            color: message.type === 'success' ? '#10b981' : '#ef4444',
            fontSize: '0.9rem',
          }}
        >
          {message.text}
        </div>
      )}

      {/* Upload Area */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: `2px dashed ${dragOver ? 'var(--color-primary)' : 'var(--color-border)'}`,
          borderRadius: '1.5rem',
          padding: '3rem 2rem',
          textAlign: 'center',
          cursor: 'pointer',
          background: dragOver ? 'rgba(255, 102, 163, 0.05)' : 'var(--color-surface)',
          transition: 'all 0.3s ease',
          marginBottom: '2rem',
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: 'none' }}
          onChange={(e) => handleUpload(e.target.files)}
        />
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          {uploading ? '⏳' : '📤'}
        </div>
        <p style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--color-text)' }}>
          {uploading ? 'Uploading...' : 'Click or drag images here to upload'}
        </p>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.85rem' }}>
          Supports JPEG, PNG, WebP, GIF, SVG — Max 10MB per image
        </p>
      </div>

      {/* Images Grid */}
      {images.length === 0 ? (
        <div
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '1rem',
            padding: '3rem',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🖼️</div>
          <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>No images yet</p>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
            Upload images above to display them in the landing page slideshow.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem' }}>
          {images.map((img) => (
            <div
              key={img.name}
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '1rem',
                overflow: 'hidden',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ position: 'relative', paddingTop: '66%', background: '#f5f5f5' }}>
                <img
                  src={img.url}
                  alt={img.name}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <div style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                <span
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--color-muted)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    flex: 1,
                  }}
                  title={img.name}
                >
                  {img.name}
                </span>
                <button
                  onClick={() => handleDelete(img.name)}
                  style={{
                    background: 'rgba(239,68,68,0.1)',
                    border: '1px solid rgba(239,68,68,0.2)',
                    color: '#ef4444',
                    borderRadius: '0.5rem',
                    padding: '0.4rem 0.75rem',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    fontFamily: 'inherit',
                    transition: 'all 0.2s',
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.1)';
                  }}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info */}
      <div
        style={{
          marginTop: '2rem',
          padding: '1.25rem',
          background: 'rgba(59, 130, 246, 0.05)',
          border: '1px solid rgba(59, 130, 246, 0.15)',
          borderRadius: '0.75rem',
          fontSize: '0.85rem',
          color: 'var(--color-muted)',
        }}
      >
        💡 These images are displayed in the slideshow on the main landing page. Upload high quality landscape images for the best results.
      </div>
    </div>
  );
}
