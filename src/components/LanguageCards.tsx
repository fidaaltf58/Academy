'use client';

const options = [
  { code: 'ar', title: 'العربية', subtitle: 'الواجهة العربية' },
  { code: 'en', title: 'English', subtitle: 'English Interface' },
  { code: 'de', title: 'Deutsch', subtitle: 'Deutsche Oberflaeche' },
];

export default function LanguageCards() {
  const chooseLanguage = (code: string) => {
    const isHttps = window.location.protocol === 'https:';
    document.cookie = `lang=${code}; path=/; max-age=31536000; SameSite=Lax${isHttps ? '; Secure' : ''}`;
    window.location.href = '/';
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '0.9rem',
      }}
    >
      {options.map((option) => (
        <button
          key={option.code}
          onClick={() => chooseLanguage(option.code)}
          style={{
            padding: '1rem',
            borderRadius: '0.9rem',
            border: '1px solid var(--color-border)',
            background: 'var(--color-surface)',
            cursor: 'pointer',
            textAlign: 'left',
            fontFamily: 'inherit',
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: '0.2rem' }}>{option.title}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>{option.subtitle}</div>
        </button>
      ))}
    </div>
  );
}
