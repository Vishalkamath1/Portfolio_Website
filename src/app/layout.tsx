import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://sharang-ai.com'),
  title: 'SHARANG AI — Insurance Expertise & Artificial Intelligence Portfolio',
  description: 'Bridging 7.4 years of frontline insurance expertise (Life Insurance & GMC/GPA Underwriting) with applied AI automation and advanced Excel modelling.',
  keywords: [
    'Insurance Underwriting',
    'GMC Underwriting',
    'GPA Underwriting',
    'Group Health Insurance',
    'AI in Insurance',
    'Insurance Process Automation',
    'SHARANG AI',
    'Incurred Claims Ratio',
    'Burn Cost Modelling'
  ],
  authors: [{ name: 'Hiranyanabh' }],
  openGraph: {
    title: 'SHARANG AI — Insurance & Artificial Intelligence Portfolio',
    description: 'Bridging Insurance Expertise with Artificial Intelligence. Smart Insights. Better Decisions. A Safer Tomorrow.',
    url: 'https://sharang-ai.com',
    siteName: 'SHARANG AI',
    images: [
      {
        url: '/images/sarang-archer.jpg',
        width: 1200,
        height: 630,
        alt: 'SHARANG AI Futuristic Archer Guardian'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="font-sans bg-navy-950 text-slate-100 min-h-screen flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200 antialiased bg-grid-pattern">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
