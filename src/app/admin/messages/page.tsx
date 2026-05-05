'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  body: string;
  read: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (!token) { router.push('/admin/login'); return; }
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const res = await fetch('/api/messages', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) setMessages(await res.json());
    setLoading(false);
  };

  const toggleRead = async (msg: Message) => {
    await fetch(`/api/messages/${msg.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ read: !msg.read }),
    });
    setMessages(messages.map((m) => (m.id === msg.id ? { ...m, read: !m.read } : m)));
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setMessages(messages.filter((m) => m.id !== id));
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

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
    // Mark as read when expanding
    const msg = messages.find(m => m.id === id);
    if (msg && !msg.read) toggleRead(msg);
  };

  if (loading) return <div style={{ color: 'var(--color-muted)', padding: '2rem' }}>Loading...</div>;

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Messages</h1>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.85rem' }}>
          {messages.length} total · {unreadCount} unread
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              background: 'var(--color-surface)',
              border: `1px solid ${msg.read ? 'var(--color-border)' : 'rgba(240,113,103,0.2)'}`,
              borderRadius: '0.75rem',
              overflow: 'hidden',
            }}
          >
            <div
              onClick={() => toggleExpand(msg.id)}
              style={{
                padding: '1.25rem 1.5rem',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  {!msg.read && (
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-primary)', flexShrink: 0 }} />
                  )}
                  <h3 style={{ fontSize: '0.95rem', fontWeight: msg.read ? 500 : 700 }}>{msg.subject}</h3>
                </div>
                <div style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>
                  {msg.name} · {msg.email} · {new Date(msg.createdAt).toLocaleDateString()}
                </div>
              </div>
              <span style={{ color: 'var(--color-muted-light)', fontSize: '1.2rem' }}>{expanded === msg.id ? '▾' : '▸'}</span>
            </div>

            {expanded === msg.id && (
              <div style={{ padding: '0 1.5rem 1.25rem', borderTop: '1px solid var(--color-border)' }}>
                <p style={{ color: 'var(--color-text)', fontSize: '0.9rem', lineHeight: 1.7, padding: '1rem 0' }}>
                  {msg.body}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleRead(msg); }}
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
                    {msg.read ? '📩 Mark as unread' : '📧 Mark as read'}
                  </button>
                  <a
                    href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                    style={{
                      padding: '0.4rem 0.85rem',
                      borderRadius: '0.4rem',
                      fontSize: '0.8rem',
                      background: 'rgba(59,130,246,0.1)',
                      color: '#3b82f6',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    ↩️ Respond
                  </a>
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteMessage(msg.id); }}
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
                    🗑️ Loeschen
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {messages.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-muted)' }}>
            No messages yet.
          </div>
        )}
      </div>
    </div>
  );
}
