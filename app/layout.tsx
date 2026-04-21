import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import AppShell from './shell';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'AgAsset Co | Energy for Growth',
  description: 'AgAsset Co — powering sustainable energy solutions across Africa.',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth ${outfit.variable}`}>
      <body className="bg-ag-green-950 text-white antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
