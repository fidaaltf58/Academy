'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const navItems = [
  { href: '/admin', icon: '📊', label: 'Dashboard' },
  { href: '/admin/blog', icon: '📝', label: 'Blog Posts' },
  { href: '/admin/images', icon: '🖼️', label: 'Landing Images' },
  { href: '/admin/reservations', icon: '📅', label: 'Reservations' },
  { href: '/admin/messages', icon: '💬', label: 'Messages' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Skip layout for login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    document.cookie = 'token=; path=/; max-age=0';
    router.push('/admin/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-bg)' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 260,
          background: 'var(--color-surface)',
          borderRight: '1px solid var(--color-border)',
          padding: '1.5rem 0',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          left: sidebarOpen ? 0 : -260,
          bottom: 0,
          zIndex: 50,
          transition: 'left 0.3s ease',
        }}
        className="admin-sidebar"
      >
        {/* Logo */}
        <div style={{ padding: '0 1.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.9rem',
                color: 'white',
              }}
            >
              G
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                <span style={{ color: 'var(--color-primary)' }}>Ghazeli</span> Admin
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-muted-light)' }}>Academy Management</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '0 0.75rem' }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  marginBottom: '0.25rem',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: isActive ? 'var(--color-primary)' : 'var(--color-muted)',
                  background: isActive ? 'rgba(240,113,103,0.1)' : 'transparent',
                  transition: 'all 0.2s',
                }}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div style={{ padding: '0 0.75rem', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              fontSize: '0.9rem',
              color: 'var(--color-muted)',
              transition: 'all 0.2s',
            }}
          >
            🌐 View Website
          </Link>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              fontSize: '0.9rem',
              color: '#ef4444',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              width: '100%',
              fontFamily: 'inherit',
              transition: 'all 0.2s',
            }}
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 40,
          }}
          className="sidebar-overlay"
        />
      )}

      {/* Main */}
      <div style={{ flex: 1, marginLeft: 260 }} className="admin-main">
        {/* Top bar */}
        <header
          style={{
            height: 64,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 1.5rem',
            position: 'sticky',
            top: 0,
            zIndex: 30,
          }}
        >
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mobile-menu-toggle"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: 'var(--color-text)',
              fontSize: '1.25rem',
              cursor: 'pointer',
            }}
          >
            ☰
          </button>
          <div style={{ fontSize: '0.9rem', color: 'var(--color-muted)' }}>
            Welcome, <span style={{ color: 'var(--color-primary)', fontWeight: 500 }}>Admin</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-muted-light)', display: 'none' /* hidden on very small screens if needed */ }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <LanguageSwitcher />
          </div>
        </header>

        {/* Page content */}
        <main style={{ padding: '2rem 1.5rem' }}>
          {children}
        </main>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .admin-sidebar { left: ${sidebarOpen ? '0' : '-260px'} !important; }
          .admin-main { margin-left: 0 !important; }
          .mobile-menu-toggle { display: block !important; }
        }
        @media (min-width: 769px) {
          .admin-sidebar { left: 0 !important; }
          .sidebar-overlay { display: none !important; }
        }
      `}</style>
    </div>
  );
}
