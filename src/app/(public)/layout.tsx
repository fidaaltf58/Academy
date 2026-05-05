import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cookies } from 'next/headers';
import { dictionaries } from '@/lib/dictionaries';
import { DictionaryProvider } from '@/components/DictionaryProvider';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const lang = (cookieStore.get('lang')?.value || 'ar') as 'en' | 'ar' | 'de';
  const dict = dictionaries[lang] || dictionaries.en;

  return (
    <DictionaryProvider dict={dict}>
      <Header dict={dict} lang={lang} />
      <main style={{ minHeight: '100vh', paddingTop: 72 }}>{children}</main>
      <Footer dict={dict} lang={lang} />
    </DictionaryProvider>
  );
}
