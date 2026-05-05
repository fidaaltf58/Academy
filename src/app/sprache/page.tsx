import type { Metadata } from 'next';
import LanguageCards from '@/components/LanguageCards';

export const metadata: Metadata = {
  title: 'Sprache waehlen',
  description: 'Waehlen Sie Arabisch, Englisch oder Deutsch.',
};

export default function SprachePage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <section
        style={{
          width: '100%',
          maxWidth: 760,
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '1rem',
          padding: '2rem',
        }}
      >
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>Welcome to Ghazeli Academy</h1>
        <p style={{ color: 'var(--color-muted)', marginBottom: '1.25rem' }}>
          Please select your preferred language to continue.
        </p>
        <LanguageCards />
      </section>
    </main>
  );
}
