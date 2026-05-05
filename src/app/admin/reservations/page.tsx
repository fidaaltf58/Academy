'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  status: string;
  note: string | null;
  createdAt: string;
}

export default function AdminReservationsPage() {
  const router = useRouter();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (!token) { router.push('/admin/login'); return; }
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    const res = await fetch('/api/reservations', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setReservations(data);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/reservations/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    });
    setReservations(reservations.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const deleteReservation = async (id: string) => {
    if (!confirm('Delete this reservation?')) return;
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setReservations(reservations.filter((r) => r.id !== id));
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

  const filtered = filter === 'all' ? reservations : reservations.filter((r) => r.status === filter);

  const statusColors: Record<string, { bg: string; color: string }> = {
    PENDING: { bg: 'rgba(245,158,11,0.1)', color: '#f59e0b' },
    APPROVED: { bg: 'rgba(34,197,94,0.1)', color: '#22c55e' },
    REJECTED: { bg: 'rgba(239,68,68,0.1)', color: '#ef4444' },
  };

  if (loading) return <div style={{ color: 'var(--color-muted)', padding: '2rem' }}>Laedt...</div>;

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Reservations</h1>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.85rem' }}>{reservations.length} total reservations</p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {['all', 'PENDING', 'APPROVED', 'REJECTED'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '0.4rem 1rem',
              borderRadius: '2rem',
              fontSize: '0.8rem',
              fontWeight: 500,
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              background: filter === f ? 'linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))' : 'var(--color-border)',
              color: filter === f ? 'white' : 'var(--color-muted)',
            }}
          >
            {f === 'all' ? 'All' : f === 'PENDING' ? 'Pending' : f === 'APPROVED' ? 'Approved' : 'Rejected'}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {filtered.map((r) => (
          <div
            key={r.id}
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '0.75rem',
              padding: '1.25rem 1.5rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>{r.name}</h3>
                  <span
                    style={{
                      padding: '0.15rem 0.6rem',
                      borderRadius: '1rem',
                      fontSize: '0.7rem',
                      fontWeight: 500,
                      background: statusColors[r.status]?.bg,
                      color: statusColors[r.status]?.color,
                    }}
                  >
                    {r.status}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--color-muted)', fontSize: '0.8rem', flexWrap: 'wrap' }}>
                  <span>📧 {r.email}</span>
                  <span>📞 {r.phone}</span>
                  <span>📅 {r.date} at {r.time}</span>
                  <span>🎯 {r.service}</span>
                </div>
                {r.note && <p style={{ color: 'var(--color-muted-light)', fontSize: '0.8rem', marginTop: '0.5rem' }}>💭 {r.note}</p>}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0, alignItems: 'center' }}>
                <a
                  href={`mailto:${r.email}?subject=Reservation Regarding: ${r.service}`}
                  style={{
                    padding: '0.4rem 0.85rem',
                    borderRadius: '0.4rem',
                    fontSize: '0.8rem',
                    background: 'rgba(59,130,246,0.1)',
                    color: '#3b82f6',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  ↩️ Respond
                </a>
                {r.status !== 'APPROVED' && (
                  <button
                    onClick={() => updateStatus(r.id, 'APPROVED')}
                    style={{
                      padding: '0.4rem 0.85rem',
                      borderRadius: '0.4rem',
                      fontSize: '0.8rem',
                      background: 'rgba(34,197,94,0.1)',
                      color: '#22c55e',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    ✓ Approve
                  </button>
                )}
                {r.status !== 'REJECTED' && (
                  <button
                    onClick={() => updateStatus(r.id, 'REJECTED')}
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
                    ✕ Reject
                  </button>
                )}
                <button
                  onClick={() => deleteReservation(r.id)}
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
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-muted)' }}>
            No reservations found.
          </div>
        )}
      </div>
    </div>
  );
}
