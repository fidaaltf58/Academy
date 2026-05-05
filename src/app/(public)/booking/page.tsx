'use client';

import { useState } from 'react';
import { useDictionary } from '@/components/DictionaryProvider';

export default function BookingPage() {
  const dict = useDictionary();



const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
];

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: '',
    note: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit');
      }

      setStatus('success');
      setForm({ name: '', email: '', phone: '', date: '', time: '', service: '', note: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  // Get minimum date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <>
      {/* Hero */}
      <section
        style={{
          padding: '6rem 0 3rem',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(240,113,103,0.1) 0%, transparent 60%)',
        }}
      >
        <div className="container-main">
          <div
            style={{
              display: 'inline-block',
              padding: '0.4rem 1rem',
              background: 'rgba(240,113,103,0.15)',
              border: '1px solid rgba(240,113,103,0.3)',
              borderRadius: '2rem',
              fontSize: '0.85rem',
              color: 'var(--color-primary)',
              marginBottom: '1.5rem',
              fontWeight: 500,
            }}
          >
            {dict.bookingPage.badge}
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '1rem' }}>
            {dict.bookingPage.title} <span className="gradient-text">{dict.bookingPage.highlight}</span>
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '1.1rem', maxWidth: 500 }}>
            {dict.bookingPage.subtitle}
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section style={{ padding: '3rem 0 6rem' }}>
        <div className="container-main" style={{ maxWidth: 800 }}>
          {status === 'success' ? (
            <div
              style={{
                background: 'rgba(34,197,94,0.1)',
                border: '1px solid rgba(34,197,94,0.3)',
                borderRadius: '1rem',
                padding: '3rem',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem', color: '#22c55e' }}>
                {dict.bookingPage.successStatus.title}
              </h2>
              <p style={{ color: 'var(--color-muted)', marginBottom: '1.5rem' }}>
                {dict.bookingPage.successStatus.message}
              </p>
              <button onClick={() => setStatus('idle')} className="btn-primary">
                {dict.bookingPage.successStatus.btn}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div
                className="card"
                style={{ padding: '2.5rem' }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  <div className="form-group">
                    <label htmlFor="name">{dict.bookingPage.form.name}</label>
                    <input
                      id="name"
                      type="text"
                      className="input-field"
                      placeholder={dict.bookingPage.form.namePlaceholder}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">{dict.bookingPage.form.email}</label>
                    <input
                      id="email"
                      type="email"
                      className="input-field"
                      placeholder={dict.bookingPage.form.emailPlaceholder}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">{dict.bookingPage.form.phone}</label>
                    <input
                      id="phone"
                      type="tel"
                      dir="ltr"
                      className="input-field"
                      placeholder={dict.bookingPage.form.phonePlaceholder}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      required
                      style={{ textAlign: 'left', unicodeBidi: 'isolate' }}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="service">{dict.bookingPage.form.service}</label>
                    <select
                      id="service"
                      className="input-field"
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      required
                    >
                      <option value="">{dict.bookingPage.form.servicePlaceholder}</option>
                      {dict.bookingPage.services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="date">{dict.bookingPage.form.date}</label>
                    <input
                      id="date"
                      type="date"
                      className="input-field"
                      min={minDate}
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="time">{dict.bookingPage.form.time}</label>
                    <select
                      id="time"
                      className="input-field"
                      value={form.time}
                      onChange={(e) => setForm({ ...form, time: e.target.value })}
                      required
                    >
                      <option value="">{dict.bookingPage.form.timePlaceholder}</option>
                      {timeSlots.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '1.5rem' }}>
                  <label htmlFor="note">{dict.bookingPage.form.note}</label>
                  <textarea
                    id="note"
                    className="input-field"
                    placeholder={dict.bookingPage.form.notePlaceholder}
                    rows={4}
                    value={form.note}
                    onChange={(e) => setForm({ ...form, note: e.target.value })}
                    style={{ resize: 'vertical' }}
                  />
                </div>

                {status === 'error' && (
                  <div
                    style={{
                      marginTop: '1rem',
                      padding: '0.75rem 1rem',
                      background: 'rgba(220,38,38,0.1)',
                      border: '1px solid rgba(220,38,38,0.3)',
                      borderRadius: '0.5rem',
                      color: '#ef4444',
                      fontSize: '0.9rem',
                    }}
                  >
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={status === 'loading'}
                  style={{
                    marginTop: '2rem',
                    width: '100%',
                    justifyContent: 'center',
                    padding: '1rem',
                    opacity: status === 'loading' ? 0.7 : 1,
                  }}
                >
                  {status === 'loading' ? dict.bookingPage.form.submitting : dict.bookingPage.form.submit}
                </button>
              </div>
            </form>
          )}

          {/* Info cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginTop: '2rem',
            }}
          >
            {dict.bookingPage.infoCards.map((item, i) => {
              const icon = ['⏰', '🔒', '💫'][i];
              return (
              <div
                key={item.title}
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '0.75rem',
                  padding: '1.25rem',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{icon}</div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.25rem' }}>{item.title}</div>
                <div style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>{item.text}</div>
              </div>
            )})}
          </div>
        </div>
      </section>
    </>
  );
}
