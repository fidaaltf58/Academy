import Link from 'next/link';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { dictionaries } from '@/lib/dictionaries';

export const metadata: Metadata = {
  title: 'About | Ghazeli Academy',
  description: 'Learn about Ghazeli Academy and our mission to support women, children, and healthy family growth.',
};

const valueIcons = ['💡', '🤲', '🏆', '❤️'];

export default async function AboutPage() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get('lang')?.value || 'ar') as 'en' | 'ar' | 'de';
  const dict = (dictionaries[lang] || dictionaries.en).aboutPage;

  return (
    <>
      {/* Hero */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '30%', height: '40%', background: 'var(--color-primary-light)', filter: 'blur(100px)', opacity: 0.3, borderRadius: '50%', zIndex: -1 }}></div>
        <div style={{ position: 'absolute', bottom: '0%', right: '-5%', width: '25%', height: '35%', background: 'var(--color-accent)', filter: 'blur(100px)', opacity: 0.4, borderRadius: '50%', zIndex: -1 }}></div>

        <section style={{ padding: '6rem 0 4rem' }}>
          <div className="container-main">
            <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
              <div
                style={{
                  display: 'inline-block',
                  padding: '0.5rem 1.25rem',
                  background: 'var(--color-surface-alt)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '2rem',
                  fontSize: '0.9rem',
                  color: 'var(--color-primary)',
                  marginBottom: '2rem',
                  fontWeight: 600,
                  boxShadow: '0 4px 15px rgba(255, 102, 163, 0.1)',
                }}
              >
                {dict.badge}
              </div>
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '2rem', lineHeight: 1.2, color: 'var(--color-primary-dark)' }}>
                {dict.title}{' '}
                <span className="gradient-text">{dict.highlight}</span>
              </h1>
              <p style={{ fontSize: '1.25rem', color: 'var(--color-muted)', lineHeight: 1.9 }}>
                {dict.subtitle}
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Story */}
      <section style={{ padding: '5rem 0', background: 'var(--color-surface)' }}>
        <div className="container-main">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'stretch' }}>
            <div
              className="glass"
              style={{
                borderRadius: '2.5rem',
                padding: '3.5rem',
                border: '1px solid rgba(255,255,255,0.8)',
                boxShadow: '0 20px 50px rgba(255, 102, 163, 0.12)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--color-primary-dark)' }}>
                {dict.storyTitle} <span className="gradient-text">{dict.storyHighlight}</span>
              </h2>
              <p style={{ color: 'var(--color-muted)', lineHeight: 1.9, marginBottom: '1.5rem', fontSize: '1.05rem' }}>
                {dict.storyP1}
              </p>
              <p style={{ color: 'var(--color-muted)', lineHeight: 1.9, marginBottom: '2.5rem', fontSize: '1.05rem' }}>
                {dict.storyP2}
              </p>
              <div>
                <Link href="/booking" className="btn-primary" style={{ padding: '1rem 2.5rem' }}>
                  {dict.storyBtn}
                </Link>
              </div>
            </div>

            <div
              className="card"
              style={{
                background: 'linear-gradient(135deg, var(--color-surface-alt), var(--color-surface))',
                padding: '3.5rem',
                textAlign: 'center',
                borderRadius: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>🎓</div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--color-text)' }}>{dict.philosophyTitle}</h3>
              <p style={{ color: 'var(--color-muted)', lineHeight: 1.9, fontSize: '1.1rem' }}>
                {dict.philosophyText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '6rem 0', background: 'var(--color-bg)' }}>
        <div className="container-main">
          <div className="section-heading">
            <h2 style={{ fontSize: '3rem', color: 'var(--color-primary-dark)' }}>{dict.valuesTitle} <span className="gradient-text">{dict.valuesHighlight}</span></h2>
            <p style={{ fontSize: '1.1rem' }}>{dict.valuesSubtitle}</p>
            <div style={{ width: '80px', height: '4px', background: 'var(--color-primary)', margin: '1.5rem auto 0', borderRadius: '2px' }}></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
            {dict.values.map((v, i) => (
              <div key={i} className="card" style={{ padding: '3rem 2rem', textAlign: 'center', borderRadius: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{valueIcons[i]}</div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--color-text)' }}>{v.title}</h3>
                <p style={{ color: 'var(--color-muted)', fontSize: '1rem', lineHeight: 1.8 }}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: '6rem 0 8rem', background: 'var(--color-surface)' }}>
        <div className="container-main">
          <div className="section-heading">
            <h2 style={{ fontSize: '3rem', color: 'var(--color-primary-dark)' }}>{dict.journeyTitle} <span className="gradient-text">{dict.journeyHighlight}</span></h2>
            <div style={{ width: '80px', height: '4px', background: 'var(--color-primary)', margin: '1.5rem auto 0', borderRadius: '2px' }}></div>
          </div>

          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            {dict.milestones.map((m, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '2.5rem',
                  marginBottom: '0',
                  paddingBottom: '3rem',
                  paddingTop: i === 0 ? '0' : '3rem',
                  borderBottom: i < dict.milestones.length - 1 ? '1px solid var(--color-border)' : 'none',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    minWidth: 80,
                    height: 80,
                    borderRadius: '2rem',
                    background: 'var(--color-surface-alt)',
                    border: '2px solid var(--color-primary-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    color: 'var(--color-primary)',
                    fontSize: '1.1rem',
                    boxShadow: '0 10px 20px rgba(255, 102, 163, 0.1)',
                  }}
                >
                  {m.year}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--color-text)' }}>{m.title}</h3>
                  <p style={{ color: 'var(--color-muted)', fontSize: '1.1rem', lineHeight: 1.8 }}>{m.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
