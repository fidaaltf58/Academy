'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface DashboardStats {
  posts: { total: number; published: number };
  reservations: { total: number; pending: number };
  messages: { total: number; unread: number };
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    fetch('/api/dashboard', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) {
          router.push('/admin/login');
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setStats(data);
        setLoading(false);
      })
      .catch(() => {
        router.push('/admin/login');
      });
  }, [router]);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400, color: 'var(--color-muted)' }}>
        Loading Dashboard...
      </div>
    );
  }

  const cards = [
    {
      icon: '📝',
      title: 'Blog Posts',
      value: stats?.posts.total || 0,
      sub: `${stats?.posts.published || 0} published`,
      color: '#3b82f6',
      href: '/admin/blog',
    },
    {
      icon: '📅',
      title: 'Reservations',
      value: stats?.reservations.total || 0,
      sub: `${stats?.reservations.pending || 0} pending`,
      color: '#f59e0b',
      href: '/admin/reservations',
    },
    {
      icon: '💬',
      title: 'Messages',
      value: stats?.messages.total || 0,
      sub: `${stats?.messages.unread || 0} unread`,
      color: '#10b981',
      href: '/admin/messages',
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>Dashboard Overview</h1>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>Activity across your academy platform</p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        {cards.map((card) => (
          <a
            key={card.title}
            href={card.href}
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '1rem',
              padding: '1.75rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
              transition: 'all 0.2s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = card.color;
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '0.75rem',
                background: `${card.color}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                flexShrink: 0,
              }}
            >
              {card.icon}
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '0.25rem' }}>{card.title}</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1, marginBottom: '0.25rem' }}>{card.value}</div>
              <div style={{ fontSize: '0.8rem', color: card.color }}>{card.sub}</div>
            </div>
          </a>
        ))}
      </div>

      {/* Quick Actions */}
      <div
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '1rem',
          padding: '1.75rem',
        }}
      >
        <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <a href="/admin/blog/new" className="btn-primary" style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem' }}>
            ✏️ Add New Blog
          </a>
          <a href="/admin/images" className="btn-primary" style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem' }}>
            🖼️ Landing Images
          </a>
          <a href="/admin/blog" className="btn-secondary" style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem' }}>
            📋 Edit Posts
          </a>
          <a href="/admin/reservations" className="btn-secondary" style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem' }}>
            📅 Reservations
          </a>
          <a href="/admin/messages" className="btn-secondary" style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem' }}>
            💬 Messages
          </a>
        </div>
      </div>
    </div>
  );
}
