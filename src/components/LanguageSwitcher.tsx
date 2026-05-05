'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const [lang, setLang] = useState('ar');

  useEffect(() => {
    // Check initial language from cookies using document
    const match = document.cookie.match(/(^| )lang=([^;]+)/);
    if (match) {
      setLang(match[2]);
    } else {
      // Default fallback
      const htmlLang = document.documentElement.lang;
      setLang(['ar', 'en', 'de'].includes(htmlLang) ? htmlLang : 'ar');
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    // Set cookie that the server layout will read. 
    // Added 'Secure' for HTTPS (Ngrok) support.
    const isHttps = window.location.protocol === 'https:';
    document.cookie = `lang=${newLang}; path=/; max-age=31536000; SameSite=Lax${isHttps ? '; Secure' : ''}`;
    setLang(newLang);
    // Refresh strictly using browser to bypass Next.js cache layer on external domains
    window.location.reload();
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <span style={{ fontSize: '1.2rem' }} title="Change Language">🌐</span>
      <select
        value={lang}
        onChange={handleChange}
        style={{
          padding: '0.4rem 0.8rem',
          borderRadius: '2rem',
          border: '1px solid var(--color-border)',
          background: 'var(--color-surface)',
          color: 'var(--color-text)',
          cursor: 'pointer',
          fontSize: '0.9rem',
          fontWeight: 600,
          fontFamily: 'inherit',
          outline: 'none',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        }}
      >
        <option value="ar">العربية</option>
        <option value="en">English</option>
        <option value="de">Deutsch</option>
      </select>
    </div>
  );
}
