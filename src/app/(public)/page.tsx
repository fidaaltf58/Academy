import Link from 'next/link';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';
import ImageSlider from '@/components/ImageSlider';

export const metadata: Metadata = {
  title: 'Ghazeli Academy | Women and Kids Support',
  description: 'A safe academy space for women and children with guidance, parenting support, and personal growth.',
};

const content = {
  ar: {
    heroTitle: 'أكاديمية الغزالي',
    heroTagline: 'مساحة آمنة للمرأة والطفل',
    heroSubtitle:
      'نساعد المرأة على اكتشاف ذاتها وأنوثتها، وبناء القيم والأخلاق في الأجيال القادمة، وفهم أطفالها بعمق.',
    cta: 'احجزي موعدك الآن',
    youtube: 'قناتنا على يوتيوب',
    galleryTitle: 'من داخل الأكاديمية',
    pillars: [
      { icon: '🌸', img: '/images/femininity.png', title: 'اكتشاف الذات', desc: 'رحلة لاكتشاف الأنوثة الحقيقية والقوة الداخلية للمرأة.' },
      { icon: '👩‍👧‍👦', img: '/images/mother_child.png', title: 'فهم الأطفال', desc: 'أدوات عملية لفهم عالم الطفل والتواصل معه بحب وحكمة.' },
      { icon: '💎', img: '/images/family_values.png', title: 'القيم والأخلاق', desc: 'غرس القيم الأصيلة والأخلاق الحميدة في نفوس الأجيال القادمة.' },
      { icon: '🦋', img: '/images/femininity.png', title: 'الأنوثة والتوازن', desc: 'مساعدة المرأة على إيجاد التوازن بين دورها كأم وكإنسانة مستقلة.' },
    ],
    youtubeTitle: 'تابعينا على يوتيوب',
    youtubeText: 'شاهدي الفيديوهات التعليمية والتربوية الخاصة بالأكاديمية.',
  },
  en: {
    heroTitle: 'Ghazeli Academy',
    heroTagline: 'A Safe Space for Women & Children',
    heroSubtitle:
      'We help women rediscover themselves and their femininity, instill the right values and morals in future generations, and deeply understand their children.',
    cta: 'Book Your Session',
    youtube: 'Our YouTube Channel',
    galleryTitle: 'Inside the Academy',
    pillars: [
      { icon: '🌸', img: '/images/femininity.png', title: 'Self-Discovery', desc: 'A journey to rediscover true femininity and inner strength.' },
      { icon: '👩‍👧‍👦', img: '/images/mother_child.png', title: 'Understanding Children', desc: 'Practical tools to understand your child\'s world with love and wisdom.' },
      { icon: '💎', img: '/images/family_values.png', title: 'Values & Morals', desc: 'Planting authentic values and good morals in the hearts of future generations.' },
      { icon: '🦋', img: '/images/femininity.png', title: 'Femininity & Balance', desc: 'Helping women find balance between being a mother and an independent person.' },
    ],
    youtubeTitle: 'Follow Us on YouTube',
    youtubeText: 'Explore our educational and parenting-focused videos.',
  },
  de: {
    heroTitle: 'Ghazeli Academy',
    heroTagline: 'Ein sicherer Raum fuer Frauen und Kinder',
    heroSubtitle:
      'Wir helfen Frauen, sich selbst und ihre Weiblichkeit wiederzuentdecken, die richtigen Werte in kuenftigen Generationen zu verankern und ihre Kinder tiefgreifend zu verstehen.',
    cta: 'Termin buchen',
    youtube: 'Unser YouTube-Kanal',
    galleryTitle: 'Einblicke in die Akademie',
    pillars: [
      { icon: '🌸', img: '/images/femininity.png', title: 'Selbstfindung', desc: 'Eine Reise zur Wiederentdeckung der wahren Weiblichkeit und inneren Staerke.' },
      { icon: '👩‍👧‍👦', img: '/images/mother_child.png', title: 'Kinder verstehen', desc: 'Praktische Werkzeuge, um die Welt Ihres Kindes mit Liebe und Weisheit zu verstehen.' },
      { icon: '💎', img: '/images/family_values.png', title: 'Werte und Moral', desc: 'Authentische Werte und gute Moral in den Herzen kuenftiger Generationen verankern.' },
      { icon: '🦋', img: '/images/femininity.png', title: 'Weiblichkeit und Balance', desc: 'Frauen helfen, die Balance zwischen Muttersein und Eigenstaendigkeit zu finden.' },
    ],
    youtubeTitle: 'Folgen Sie uns auf YouTube',
    youtubeText: 'Hier finden Sie Inhalte zu Erziehung, Familie und persoenlicher Entwicklung.',
  },
} as const;

export default async function HomePage() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get('lang')?.value || 'ar') as 'en' | 'ar' | 'de';
  const dict = content[lang] || content.en;
  const isRtl = lang === 'ar';

  const imagesDir = path.join(process.cwd(), 'public', 'main-images');
  let slideImages: string[] = [];
  try {
    const files = fs.readdirSync(imagesDir);
    slideImages = files
      .filter(file => file.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i))
      .map(file => `/main-images/${file}`);
  } catch {
    // folder doesn't exist yet
  }

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        background: 'var(--color-bg)',
        paddingTop: '4rem',
      }}>
        {/* Decorative elements */}
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50%', height: '60%', background: 'var(--color-primary-light)', filter: 'blur(150px)', opacity: 0.25, borderRadius: '50%', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '40%', height: '50%', background: 'var(--color-accent)', filter: 'blur(150px)', opacity: 0.3, borderRadius: '50%', zIndex: 0 }} />

        <div className="container-main" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'flex',
            flexDirection: isRtl ? 'row-reverse' : 'row',
            alignItems: 'center',
            gap: '4rem',
            textAlign: isRtl ? 'right' : 'left',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {/* Left/Image Side */}
            <div style={{ flex: '1 1 400px', maxWidth: '500px' }}>
              <div style={{
                position: 'relative',
                padding: '2rem',
              }}>
                {/* Decorative glow behind logo */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '120%',
                  height: '120%',
                  background: 'var(--color-primary-light)',
                  filter: 'blur(100px)',
                  opacity: 0.15,
                  borderRadius: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: -1
                }} />

                <img
                  src={lang === 'ar' ? '/Arabic_version_logo.svg' : '/English_version_logo.svg'}
                  alt="Ghazeli Academy Logo"
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxWidth: '450px',
                    margin: '0 auto',
                    display: 'block',
                    filter: 'drop-shadow(0 20px 50px rgba(255, 102, 163, 0.15))',
                  }}
                />
              </div>
            </div>

            {/* Right/Text Side */}
            <div style={{ flex: '1 1 500px', maxWidth: '650px' }}>
              <div className="glass" style={{
                padding: '3.5rem',
                borderRadius: '3rem',
                border: '1px solid rgba(255,255,255,0.7)',
                boxShadow: '0 25px 70px rgba(255, 102, 163, 0.1)',
              }}>
                <p style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: 'var(--color-primary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  justifyContent: isRtl ? 'flex-end' : 'flex-start'
                }}>
                  <span style={{ fontSize: '1.4rem' }}>✨</span> {dict.heroTitle}
                </p>

                <h1 style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
                  fontWeight: 900,
                  lineHeight: 1.1,
                  marginBottom: '1.5rem',
                  color: 'var(--color-primary-dark)'
                }}>
                  {dict.heroTagline}
                </h1>

                <p style={{
                  color: 'var(--color-muted)',
                  lineHeight: 1.8,
                  fontSize: '1.2rem',
                  marginBottom: '2.5rem'
                }}>
                  {dict.heroSubtitle}
                </p>

                <div style={{
                  display: 'flex',
                  gap: '1.25rem',
                  flexWrap: 'wrap',
                  justifyContent: isRtl ? 'flex-end' : 'flex-start'
                }}>
                  <Link href="/booking" className="btn-primary" style={{ padding: '1.1rem 3rem', fontSize: '1.1rem' }}>
                    {dict.cta}
                  </Link>
                  <a
                    href="https://youtube.com/@balkis518?si=qjSEIK2PNOVwY2Hb"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary"
                    style={{ padding: '1.1rem 2.5rem', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}
                  >
                    <span style={{ fontSize: '1.4rem' }}>▶</span> {dict.youtube}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PILLARS / WHAT WE DO ===== */}
      <section style={{ padding: '6rem 0', background: 'var(--color-surface)' }}>
        <div className="container-main">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
          }}>
            {dict.pillars.map((pillar, i) => (
              <div
                key={i}
                className="card"
                style={{
                  padding: '0',
                  textAlign: isRtl ? 'right' : 'left',
                  borderRadius: '2rem',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  border: '1px solid var(--color-border)',
                  background: 'white',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                }}
              >
                <div style={{ height: '160px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={pillar.img}
                    alt={pillar.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: isRtl ? 'auto' : '1rem',
                    left: isRtl ? '1rem' : 'auto',
                    background: 'rgba(255, 255, 255, 0.95)',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.3rem',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                  }}>
                    {pillar.icon}
                  </div>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--color-primary-dark)' }}>
                    {pillar.title}
                  </h3>
                  <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PHOTO SLIDESHOW ===== */}
      {slideImages.length > 0 && (
        <section style={{ padding: '6rem 0', background: 'var(--color-bg)' }}>
          <div className="container-main">
            <div className="section-heading" style={{ marginBottom: '4rem' }}>
              <h2 style={{ color: 'var(--color-primary-dark)', fontSize: '2.8rem' }}>{dict.galleryTitle}</h2>
              <div style={{ width: '80px', height: '4px', background: 'var(--color-primary)', margin: '1.5rem auto 0', borderRadius: '2px', opacity: 0.6 }} />
            </div>
            <ImageSlider images={slideImages} />
          </div>
        </section>
      )}

      {/* ===== YOUTUBE CTA ===== */}
      <section style={{ padding: '6rem 0 8rem', background: 'var(--color-surface)' }}>
        <div className="container-main">
          <div
            className="card"
            style={{
              padding: '5rem 3rem',
              textAlign: 'center',
              maxWidth: '900px',
              margin: '0 auto',
              background: 'linear-gradient(135deg, white, var(--color-surface))',
              borderRadius: '3rem',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(0,0,0,0.05)',
              border: '1px solid rgba(255,255,255,0.8)',
            }}
          >
            <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '300px', height: '300px', background: 'var(--color-primary-light)', filter: 'blur(100px)', opacity: 0.15, borderRadius: '50%' }} />
            <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '300px', height: '300px', background: 'var(--color-accent)', filter: 'blur(100px)', opacity: 0.15, borderRadius: '50%' }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: '4.5rem', marginBottom: '2rem' }}>🎬</div>
              <h3 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--color-primary-dark)' }}>
                {dict.youtubeTitle}
              </h3>
              <p style={{ color: 'var(--color-muted)', marginBottom: '3rem', fontSize: '1.25rem', maxWidth: '650px', margin: '0 auto 3rem', lineHeight: 1.8 }}>
                {dict.youtubeText}
              </p>
              <a
                href="https://youtube.com/@balkis518?si=qjSEIK2PNOVwY2Hb"
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
                style={{ padding: '1.2rem 4rem', fontSize: '1.2rem', display: 'inline-flex', alignItems: 'center', gap: '1rem' }}
              >
                <span style={{ fontSize: '1.5rem' }}>▶</span> YouTube
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
