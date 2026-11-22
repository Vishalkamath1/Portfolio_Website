import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AgentChatProvider } from '@/context/AgentChatContext';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://sarang-ai.com'),
  title: 'SARANG AI — Insurance Expertise & Artificial Intelligence Portfolio',
  description: 'Bridging 7.4 years of frontline insurance expertise (Life Insurance & GMC/GPA Underwriting) with applied AI automation and advanced Excel modelling.',
  keywords: [
    'Insurance Underwriting',
    'GMC Underwriting',
    'GPA Underwriting',
    'Group Health Insurance',
    'AI in Insurance',
    'Insurance Process Automation',
    'SARANG AI',
    'Incurred Claims Ratio',
    'Burn Cost Modelling'
  ],
  authors: [{ name: 'Vishal Kamath' }],
  openGraph: {
    title: 'SARANG AI — Insurance & Artificial Intelligence Portfolio',
    description: 'Bridging Insurance Expertise with Artificial Intelligence. Smart Insights. Better Decisions. A Safer Tomorrow.',
    url: 'https://sarang-ai.com',
    siteName: 'SARANG AI',
    images: [
      {
        url: '/sarang-avatar.png',
        width: 512,
        height: 512,
        alt: 'Sarang AI Agent Logo'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SARANG AI — Insurance & Artificial Intelligence Portfolio',
    description: 'Bridging 7.4 years of insurance underwriting expertise with applied AI automation.',
    images: ['/sarang-avatar.png'],
    creator: '@Vishalkamath1',
  },
  icons: {
    icon: '/sarang-avatar.png',
    shortcut: '/sarang-avatar.png',
    apple: '/sarang-avatar.png',
  },
  alternates: {
    canonical: '/',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="font-sans bg-navy-950 text-slate-100 min-h-screen flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200 antialiased">
        <AgentChatProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </AgentChatProvider>
      </body>
    </html>
  );
}
