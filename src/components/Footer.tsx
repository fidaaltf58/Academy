'use client';

import Link from 'next/link';
import type { Dictionary } from '@/lib/dictionaries';

export default function Footer({ dict, lang }: { dict: Dictionary; lang: 'ar' | 'en' | 'de' }) {
  const logoSrc = lang === 'ar' ? '/Arabic_version_logo.svg' : '/English_version_logo.svg';
  
  return (
    <footer
      style={{
        background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
        padding: '5rem 1.5rem 3rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Subtle decorative elements */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '200px', background: 'var(--color-primary-light)', filter: 'blur(100px)', opacity: 0.1, borderRadius: '50%' }}></div>
      
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem',
          }}
        >
          {/* Brand */}
          <div style={{ maxWidth: '350px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <img src={logoSrc} alt="Ghazeli Academy Logo" style={{ height: 48, width: 'auto' }} />
            </div>
            <p style={{ color: 'var(--color-muted)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              {dict.footer.about}
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <img src="/favicon.svg" alt="Favicon" style={{ width: '30px', height: '30px', opacity: 0.6 }} />
              <span style={{ color: 'var(--color-primary-dark)', fontWeight: 700, fontSize: '0.9rem' }}>Ghazeli Academy</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--color-primary-dark)' }}>
              {dict.common.quickLinks}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {[
                { href: '/', label: dict.nav.home },
                { href: '/about', label: dict.nav.about },
                { href: '/blog', label: dict.nav.blog },
                { href: '/booking', label: dict.nav.booking },
                { href: '/contact', label: dict.nav.contact },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{ color: 'var(--color-muted)', fontSize: '1rem', transition: 'all 0.2s', width: 'fit-content' }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = 'var(--color-primary)';
                    (e.target as HTMLElement).style.transform = 'translateX(5px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = 'var(--color-muted)';
                    (e.target as HTMLElement).style.transform = 'translateX(0)';
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--color-primary-dark)' }}>
              {lang === 'ar' ? 'اتصل بنا' : lang === 'de' ? 'Kontakt' : 'Contact Us'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', color: 'var(--color-muted)', fontSize: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.2rem' }}>📧</span>
                <a href="mailto:contact@ghazeliacademy.com" style={{ color: 'inherit' }}>contact@ghazeliacademy.com</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.2rem' }}>📞</span>
                <a href="tel:+491747843719" dir="ltr" style={{ color: 'inherit', unicodeBidi: 'isolate', textAlign: 'left' }}>+49 174 7843719</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.2rem' }}>📍</span>
                <span>Regensburg, Germany</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            borderTop: '1px solid var(--color-border)',
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <p style={{ color: 'var(--color-muted-light)', fontSize: '0.9rem' }}>
            © {new Date().getFullYear()} Ghazeli Academy. {dict.common.allRightsReserved}
          </p>
          <div style={{ display: 'flex', gap: '2rem' }}>
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
                style={{ color: 'var(--color-muted-light)', fontSize: '0.9rem', transition: 'color 0.2s', fontWeight: 500 }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--color-primary)')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--color-muted-light)')}
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
