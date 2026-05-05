'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import type { Dictionary } from '@/lib/dictionaries';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header({ dict, lang }: { dict: Dictionary; lang: 'ar' | 'en' | 'de' }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const logoSrc = lang === 'ar' ? '/Arabic_version_logo.svg' : '/English_version_logo.svg';

  const navLinks = [
    { href: '/', label: dict.nav.home },
    { href: '/about', label: dict.nav.about },
    { href: '/blog', label: dict.nav.blog },
    { href: '/booking', label: dict.nav.booking },
    { href: '/contact', label: dict.nav.contact },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 102, 163, 0.1)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 80,
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img src={logoSrc} alt="Ghazeli Academy Logo" style={{ height: 48, width: 'auto' }} />
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontSize: '0.95rem',
                fontWeight: 600,
                color: pathname === link.href ? 'var(--color-primary)' : 'var(--color-muted)',
                transition: 'all 0.3s ease',
                position: 'relative',
                padding: '0.5rem 0'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
              onMouseLeave={(e) => {
                if (pathname !== link.href) e.currentTarget.style.color = 'var(--color-muted)';
              }}
            >
              {link.label}
              {pathname === link.href && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: 'var(--color-primary)',
                    borderRadius: 3,
                    boxShadow: '0 2px 10px rgba(255, 102, 163, 0.3)'
                  }}
                />
              )}
            </Link>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '1rem' }}>
            <a 
              href="https://youtube.com/@balkis518?si=qjSEIK2PNOVwY2Hb" 
              target="_blank" 
              rel="noreferrer"
              style={{
                background: 'var(--color-primary-light)',
                color: 'white',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 10px rgba(255, 102, 163, 0.2)'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              title="YouTube"
            >
              ▶
            </a>
            <LanguageSwitcher />
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            background: 'var(--color-surface-alt)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-primary)',
            fontSize: '1.2rem',
            padding: '0.5rem',
            borderRadius: '0.75rem',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <nav
          className="mobile-nav"
          style={{
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            background: 'rgba(255, 255, 255, 0.98)',
            borderBottom: '1px solid var(--color-border)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                color: pathname === link.href ? 'var(--color-primary)' : 'var(--color-muted)',
                padding: '0.75rem 0',
                borderBottom: '1px solid var(--color-surface-alt)'
              }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ marginTop: '1rem', padding: '1rem 0', borderTop: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <a 
              href="https://youtube.com/@balkis518?si=qjSEIK2PNOVwY2Hb" 
              target="_blank" 
              rel="noreferrer"
              style={{
                background: 'var(--color-primary-light)',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              <span>▶</span> YouTube
            </a>
            <LanguageSwitcher />
          </div>
        </nav>
      )}

      <style jsx global>{`
        @media (max-width: 850px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (min-width: 851px) {
          .mobile-nav { display: none !important; }
        }
      `}</style>
    </header>
  );
}
