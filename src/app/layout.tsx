import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";

const cairo = Cairo({ 
  subsets: ["latin", "arabic"],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: 'var(--color-surface)',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: '%s | أكاديمية الغزالي',
    default: 'أكاديمية الغزالي | Ghazeli Academy',
  },
  description: "A dedicated platform for women and children with support in parenting, self-discovery, and healthy family growth.",
  keywords: "women support, parenting, child development, family wellbeing, self-discovery, أكاديمية, المرأة, تربية الأطفال",
  authors: [{ name: 'Ghazeli Academy' }],
  creator: 'Ghazeli Academy',
  openGraph: {
    title: "أكاديمية الغزالي | Ghazeli Academy",
    description: "A supportive platform for women and children.",
    url: 'https://ghazeli.com',
    siteName: 'Ghazeli Academy',
    images: [
      {
        url: '/og-image.jpg', // Placeholder
        width: 1200,
        height: 630,
        alt: 'Ghazeli Academy',
      },
    ],
    locale: 'ar_AR',
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: "أكاديمية الغزالي | Ghazeli Academy",
    description: "A supportive platform for women and children.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const lang = cookieStore.get('lang')?.value || 'ar';
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={lang} dir={dir}>
      <body className={cairo.className}>
        {children}
      </body>
    </html>
  );
}
