'use client';

import { useState } from 'react';
import { useDictionary } from '@/components/DictionaryProvider';

export default function ContactPage() {
  const dict = useDictionary();
  const [form, setForm] = useState({ name: '', email: '', subject: '', body: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to send');
      }

      setStatus('success');
      setForm({ name: '', email: '', subject: '', body: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

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
            {dict.contactPage.badge}
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '1rem' }}>
            {dict.contactPage.title} <span className="gradient-text">{dict.contactPage.highlight}</span>
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '1.1rem', maxWidth: 500 }}>
            {dict.contactPage.subtitle}
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '3rem 0 6rem' }}>
        <div className="container-main">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
            {/* Form */}
            <div>
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
                    {dict.contactPage.successStatus.title}
                  </h2>
                  <p style={{ color: 'var(--color-muted)', marginBottom: '1.5rem' }}>
                    {dict.contactPage.successStatus.message}
                  </p>
                  <button onClick={() => setStatus('idle')} className="btn-primary">
                    {dict.contactPage.successStatus.btn}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="card" style={{ padding: '2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>
                      {dict.contactPage.form.title}
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      <div className="form-group">
                        <label htmlFor="contact-name">{dict.contactPage.form.name}</label>
                        <input
                          id="contact-name"
                          type="text"
                          className="input-field"
                          placeholder={dict.contactPage.form.namePlaceholder}
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="contact-email">{dict.contactPage.form.email}</label>
                        <input
                          id="contact-email"
                          type="email"
                          className="input-field"
                          placeholder={dict.contactPage.form.emailPlaceholder}
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="contact-subject">{dict.contactPage.form.subject}</label>
                        <input
                          id="contact-subject"
                          type="text"
                          className="input-field"
                          placeholder={dict.contactPage.form.subjectPlaceholder}
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="contact-body">{dict.contactPage.form.body}</label>
                        <textarea
                          id="contact-body"
                          className="input-field"
                          placeholder={dict.contactPage.form.bodyPlaceholder}
                          rows={5}
                          value={form.body}
                          onChange={(e) => setForm({ ...form, body: e.target.value })}
                          required
                          style={{ resize: 'vertical' }}
                        />
                      </div>
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
                        marginTop: '1.5rem',
                        width: '100%',
                        justifyContent: 'center',
                        padding: '1rem',
                        opacity: status === 'loading' ? 0.7 : 1,
                      }}
                    >
                      {status === 'loading' ? dict.contactPage.form.submitting : dict.contactPage.form.submit}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="card" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>
                  {dict.contactPage.infoCards.title}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {[
                    { icon: '📧', label: dict.contactPage.infoCards.emailLabel, value: dict.contactPage.infoCards.emailValue, isEmail: true },
                    { icon: '📞', label: dict.contactPage.infoCards.phoneLabel, value: dict.contactPage.infoCards.phoneValue, isPhone: true },
                    { icon: '📍', label: dict.contactPage.infoCards.locationLabel, value: dict.contactPage.infoCards.locationValue },
                    { icon: '🕐', label: dict.contactPage.infoCards.hoursLabel, value: dict.contactPage.infoCards.hoursValue },
                  ].map((item) => (
                    <div key={item.label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: '0.5rem',
                          background: 'rgba(240,113,103,0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.25rem',
                          flexShrink: 0,
                        }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '0.15rem' }}>{item.label}</div>
                        <div 
                          style={{ 
                            fontWeight: 500, 
                            fontSize: '0.95rem',
                            direction: item.isPhone ? 'ltr' : 'inherit',
                            textAlign: item.isPhone ? 'left' : 'inherit',
                            unicodeBidi: item.isPhone ? 'isolate' : 'normal'
                          }}
                        >
                          {item.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
                  {dict.contactPage.followUs}
                </h3>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {[
                    { name: 'Facebook', url: 'https://www.facebook.com/share/1B85f7n3hU/' },
                    { name: 'Instagram', url: 'https://www.instagram.com/trainerghazali?utm_source=qr&igsh=OGZpbWRvdjBrNDU1' },
                    { name: 'YouTube', url: 'https://youtube.com/@balkis518?si=qjSEIK2PNOVwY2Hb' }
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        padding: '0.5rem 1rem',
                        background: 'rgba(240,113,103,0.1)',
                        border: '1px solid rgba(240,113,103,0.2)',
                        borderRadius: '0.5rem',
                        fontSize: '0.8rem',
                        color: 'var(--color-primary)',
                        transition: 'all 0.2s',
                        fontWeight: 500,
                      }}
                    >
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
