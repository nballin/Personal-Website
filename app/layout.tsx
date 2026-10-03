import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import type { ReactNode } from 'react';
import { CommandPalette } from '@/components/CommandPalette';
import { TopBar } from '@/components/TopBar';
import { profile } from '@/content/profile';
import './globals.css';

const grotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-grotesk', display: 'swap' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' });

const description =
  'Data engineer (TD, CIBC) building pipelines and ML infrastructure on Azure + Databricks. Co-author of an arXiv paper on Tiny Recursive Models. CS @ Western University, 2027.';

export const metadata: Metadata = {
  metadataBase: new URL('https://nithinbalamurugan.com'),
  title: { default: `${profile.name} · Data Engineer`, template: `%s · ${profile.name}` },
  description,
  openGraph: { title: profile.name, description, type: 'website' },
  twitter: { card: 'summary_large_image', title: profile.name, description },
};

export const viewport: Viewport = { themeColor: '#07070b' };

export default function RootLayout({ children, modal }: { children: ReactNode; modal: ReactNode }) {
  return (
    <html lang="en" className={`${grotesk.variable} ${jetbrains.variable}`}>
      <body className="min-h-dvh">
        <Backdrop />
        <TopBar />
        {children}
        {modal}
        <CommandPalette />
      </body>
    </html>
  );
}

function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="board-dots absolute inset-0" />
      <div className="absolute -left-[10%] -top-[20%] size-[60vmax] animate-drift rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.22),transparent_60%)] blur-3xl" />
      <div className="absolute -bottom-[30%] -right-[10%] size-[55vmax] animate-drift rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.14),transparent_60%)] blur-3xl [animation-delay:-11s]" />
      <div className="grain absolute inset-0" />
    </div>
  );
}
