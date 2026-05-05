'use client';

import { useState, useEffect, useCallback } from 'react';

interface ImageSliderProps {
  images: string[];
  intervalMs?: number;
}

export default function ImageSlider({ images, intervalMs = 4000 }: ImageSliderProps) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + images.length) % images.length);
  }, [images.length]);

  // Auto-advance
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(next, intervalMs);
    return () => clearInterval(timer);
  }, [next, intervalMs, images.length]);

  if (images.length === 0) return null;

  return (
    <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
      {/* Main image */}
      <div
        style={{
          width: '100%',
          height: 'clamp(280px, 50vw, 500px)',
          borderRadius: '2rem',
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(255, 102, 163, 0.18)',
          position: 'relative',
        }}
      >
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`Academy slide ${i + 1}`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: i === current ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
            }}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous slide"
            style={{
              position: 'absolute',
              top: '50%',
              left: '2.5rem',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.85)',
              border: 'none',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              fontSize: '1.3rem',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-primary-dark)',
              fontWeight: 700,
              transition: 'all 0.2s ease',
            }}
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            style={{
              position: 'absolute',
              top: '50%',
              right: '2.5rem',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.85)',
              border: 'none',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              fontSize: '1.3rem',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-primary-dark)',
              fontWeight: 700,
              transition: 'all 0.2s ease',
            }}
          >
            ›
          </button>
        </>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === current ? '28px' : '10px',
                height: '10px',
                borderRadius: '5px',
                background: i === current ? 'var(--color-primary)' : 'var(--color-border)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
