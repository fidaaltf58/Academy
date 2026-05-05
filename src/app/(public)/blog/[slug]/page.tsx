import Link from 'next/link';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { dictionaries } from '@/lib/dictionaries';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string | null;
  createdAt: string;
  category: { id: string; name: string; slug: string } | null;
}

async function getPost(slug: string): Promise<BlogPost | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/blog/${slug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: 'Post Not Found | Ghazeli Academy' };
  return {
    title: `${post.title} | Ghazeli Academy`,
    description: post.excerpt,
  };
}

function renderContent(content: string) {
  // Simple markdown-like rendering
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];

  lines.forEach((line, i) => {
    if (line.startsWith('# ')) {
      elements.push(<h1 key={i} style={{ fontSize: '2rem', fontWeight: 700, margin: '1.5rem 0 0.75rem' }}>{line.slice(2)}</h1>);
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={i} style={{ fontSize: '1.5rem', fontWeight: 600, margin: '1.5rem 0 0.75rem', color: 'var(--color-primary)' }}>{line.slice(3)}</h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i} style={{ fontSize: '1.2rem', fontWeight: 600, margin: '1.25rem 0 0.5rem' }}>{line.slice(4)}</h3>);
    } else if (line.startsWith('> ')) {
      elements.push(
        <blockquote key={i} style={{ borderLeft: '3px solid var(--color-primary)', paddingLeft: '1rem', margin: '1rem 0', color: 'var(--color-muted)', fontStyle: 'italic' }}>
          {line.slice(2)}
        </blockquote>
      );
    } else if (line.startsWith('- **')) {
      const match = line.match(/- \*\*(.+?)\*\*\s*[—–-]?\s*(.*)/);
      if (match) {
        elements.push(
          <li key={i} style={{ marginBottom: '0.5rem', color: 'var(--color-text)', listStyle: 'none', paddingLeft: '1rem' }}>
            <span style={{ color: 'var(--color-primary)' }}>▸</span> <strong>{match[1]}</strong> {match[2] && `— ${match[2]}`}
          </li>
        );
      }
    } else if (line.startsWith('- ')) {
      elements.push(
        <li key={i} style={{ marginBottom: '0.5rem', color: 'var(--color-text)', listStyle: 'none', paddingLeft: '1rem' }}>
          <span style={{ color: 'var(--color-primary)' }}>▸</span> {line.slice(2)}
        </li>
      );
    } else if (line.match(/^\d+\.\s/)) {
      const num = line.match(/^(\d+)\.\s(.+)/);
      if (num) {
        elements.push(
          <li key={i} style={{ marginBottom: '0.5rem', color: 'var(--color-text)', listStyle: 'none', paddingLeft: '1rem' }}>
            <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{num[1]}.</span> {num[2]}
          </li>
        );
      }
    } else if (line.trim() === '') {
      elements.push(<br key={i} />);
    } else {
      elements.push(<p key={i} style={{ color: 'var(--color-text)', lineHeight: 1.8, marginBottom: '0.75rem' }}>{line}</p>);
    }
  });

  return elements;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  const cookieStore = await cookies();
  const lang = (cookieStore.get('lang')?.value || 'ar') as 'en' | 'ar' | 'de';
  const dict = (lang === 'de' ? dictionaries.en : dictionaries[lang] || dictionaries.en).blogSingle;

  if (!post) {
    return (
      <section style={{ padding: '8rem 0', textAlign: 'center' }}>
        <div className="container-main">
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{dict.notFound}</h1>
          <p style={{ color: 'var(--color-muted)', marginBottom: '2rem' }}>{dict.notFoundMsg}</p>
          <Link href="/blog" className="btn-primary">{dict.backToBlog}</Link>
        </div>
      </section>
    );
  }

  return (
    <article style={{ padding: '4rem 0 6rem' }}>
      <div className="container-main" style={{ maxWidth: 800 }}>
        {/* Back link */}
        <Link
          href="/blog"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--color-muted)',
            fontSize: '0.9rem',
            marginBottom: '2rem',
            transition: 'color 0.2s',
          }}
        >
          {dict.backToBlog}
        </Link>

        {/* Category */}
        {post.category && (
          <span
            style={{
              display: 'inline-block',
              padding: '0.3rem 1rem',
              background: 'rgba(240,113,103,0.1)',
              color: 'var(--color-primary)',
              borderRadius: '2rem',
              fontSize: '0.8rem',
              fontWeight: 500,
              marginBottom: '1rem',
            }}
          >
            {post.category.name}
          </span>
        )}

        {/* Title */}
        <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '1rem' }}>
          {post.title}
        </h1>

        {/* Meta */}
        <div style={{ color: 'var(--color-muted-light)', fontSize: '0.9rem', marginBottom: '2rem' }}>
          {new Date(post.createdAt).toLocaleDateString(lang === 'ar' ? 'ar-DZ' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>

        {/* Image */}
        {post.image && (
          <div
            style={{
              width: '100%',
              height: 400,
              borderRadius: '1rem',
              background: `url(${post.image}) center/cover`,
              marginBottom: '2rem',
            }}
          />
        )}

        {/* Content */}
        <div style={{ fontSize: '1.05rem' }}>
          {renderContent(post.content)}
        </div>

        {/* Share / Nav */}
        <div
          style={{
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <Link href="/blog" className="btn-secondary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}>
            {dict.allPosts}
          </Link>
          <Link href="/booking" className="btn-primary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}>
            {dict.bookSession}
          </Link>
        </div>
      </div>
    </article>
  );
}
