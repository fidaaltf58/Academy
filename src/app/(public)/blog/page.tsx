import Link from 'next/link';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { dictionaries } from '@/lib/dictionaries';

export const metadata: Metadata = {
  title: 'Blog | Ghazeli Academy',
  description: 'Insights and practical guidance for women, parenting, and children growth from Ghazeli Academy.',
};

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string | null;
  published: boolean;
  createdAt: string;
  category: { id: string; name: string; slug: string } | null;
}

interface BlogResponse {
  posts: BlogPost[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

async function getPosts(page: number = 1, categoryId: string = ''): Promise<BlogResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/blog?page=${page}&limit=6&category=${categoryId}`, {
    cache: 'no-store',
  });
  if (!res.ok) return { posts: [], pagination: { page: 1, limit: 6, total: 0, totalPages: 0 } };
  return res.json();
}

async function getCategories() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/categories`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const sp = await searchParams;
  const page = Number(sp.page) || 1;
  const categoryId = sp.category || '';
  const { posts, pagination } = await getPosts(page, categoryId);
  const categories = await getCategories();

  const cookieStore = await cookies();
  const lang = (cookieStore.get('lang')?.value || 'ar') as 'en' | 'ar' | 'de';
  const dict = (lang === 'de' ? dictionaries.en : dictionaries[lang] || dictionaries.en).blogPage;

  return (
    <>
      {/* Hero */}
      <section
        style={{
          padding: '6rem 0 3rem',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(240,113,103,0.1) 0%, transparent 60%)',
        }}
      >
        <div className="container-main">
          <div
            style={{
              display: 'inline-block',
              padding: '0.4rem 1rem',
              background: 'rgba(240,113,103,0.15)',
              border: '1px solid rgba(240,113,103,0.3)',
              borderRadius: '2rem',
              fontSize: '0.85rem',
              color: 'var(--color-primary)',
              marginBottom: '1.5rem',
              fontWeight: 500,
            }}
          >
            {dict.badge}
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '1rem' }}>
            {dict.title} <span className="gradient-text">{dict.highlight}</span>
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '1.1rem', maxWidth: 500 }}>
            {dict.subtitle}
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section style={{ padding: '3rem 0 6rem' }}>
        <div className="container-main">
          {posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-muted)' }}>
              <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{dict.noPosts}</p>
              <p>{dict.checkBack}</p>
            </div>
          ) : (
            <>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                  gap: '1.5rem',
                }}
              >
                {posts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} style={{ display: 'block' }}>
                    <article className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      {/* Image placeholder */}
                      <div
                        style={{
                          height: 200,
                          background: post.image
                            ? `url(${post.image}) center/cover`
                            : 'linear-gradient(135deg, rgba(240,113,103,0.2), rgba(244,151,142,0.1))',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '3rem',
                        }}
                      >
                        {!post.image && '📝'}
                      </div>

                      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        {post.category && (
                          <span
                            style={{
                              display: 'inline-block',
                              padding: '0.2rem 0.75rem',
                              background: 'rgba(240,113,103,0.1)',
                              color: 'var(--color-primary)',
                              borderRadius: '1rem',
                              fontSize: '0.75rem',
                              fontWeight: 500,
                              marginBottom: '0.75rem',
                              alignSelf: 'flex-start',
                            }}
                          >
                            {post.category.name}
                          </span>
                        )}
                        <h2 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.75rem', lineHeight: 1.4 }}>
                          {post.title}
                        </h2>
                        <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', lineHeight: 1.7, flex: 1 }}>
                          {post.excerpt}
                        </p>
                        <div
                          style={{
                            marginTop: '1rem',
                            paddingTop: '1rem',
                            borderTop: '1px solid var(--color-border)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <span style={{ color: 'var(--color-muted-light)', fontSize: '0.8rem' }}>
                            {new Date(post.createdAt).toLocaleDateString(lang === 'ar' ? 'ar-DZ' : 'en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </span>
                          <span style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: 500 }}>{dict.readMore}</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '3rem' }}>
                  {page > 1 && (
                    <Link
                      href={`/blog?page=${page - 1}`}
                      className="btn-secondary"
                      style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}
                    >
                      {dict.previous}
                    </Link>
                  )}
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                    <Link
                      key={p}
                      href={`/blog?page=${p}`}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        background: p === page ? 'linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))' : 'var(--color-border)',
                        color: p === page ? 'white' : 'var(--color-muted)',
                        transition: 'all 0.2s',
                      }}
                    >
                      {p}
                    </Link>
                  ))}
                  {page < pagination.totalPages && (
                    <Link
                      href={`/blog?page=${page + 1}`}
                      className="btn-secondary"
                      style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}
                    >
                      {dict.next}
                    </Link>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
