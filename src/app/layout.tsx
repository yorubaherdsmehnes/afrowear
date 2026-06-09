import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const bankGothic = localFont({
  src: './fonts/BankGothic Md BT.ttf', 
  variable: '--font-bankgothic',
});
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Afrowear | Earn the Fit. The Digital Fashion Archive',
  description: 'Where streets speak royalty. A curated, ephemeral digital archive deconstructing contemporary Nigerian university fashion. By invitation only.',
  keywords: [
    'Alté fashion Nigeria',
    'Nigerian university streetwear',
    'Lagos youth culture',
    'ARSTKRT',
    'Aristokrat King Country',
    'digital fashion magazine',
    'Naija underground fashion',
    'streetwear lookbook Nigeria',
    'exclusive fashion community',
    'Earn the fit',
    'contemporary African streetwear'
  ],
  authors: [{ name: 'Afrowear', url: 'https://afrowear.com.ng' }],
  openGraph: {
    title: 'Afrowear.com.ng | The Archive',
    description: 'A curated digital and print archive deconstructing contemporary Nigerian fashion. The artifact self-destructs in 7 days.',
    url: 'https://afrowear.com.ng',
    siteName: 'Afrowear',
    images: [
      {
        url: '/hero-cover-1.png', 
        width: 1200,
        height: 630,
        alt: 'Afrowear.com.ng Cover',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Afrowear | Earn the Fit.',
    description: 'A curated digital and print archive deconstructing contemporary Nigerian fashion. By invitation only.',
    images: ['/hero-cover-1.png'],
  },
  icons: {
    icon: '/favicon.ico'
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${bankGothic.variable} font-sans bg-neutral-950 text-white antialiased`}>
        
        {/* Google Analytics */}
        <Script 
          src="https://www.googletagmanager.com/gtag/js?id=G-JLD0Z80V1V" 
          strategy="afterInteractive" 
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JLD0Z80V1V');
          `}
        </Script>

        {/* Schema.org Knowledge Graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Periodical",
              "name": "Afrowear.com.ng",
              "url": "https://afrowear.com.ng",
              "logo": "https://afrowear.com.ng/icon.png", 
              "description": "An exclusive digital and print fashion archive curating contemporary Nigerian streetwear and youth culture.",
              "publisher": {
                "@type": "Organization",
                "name": "Aristokrat King Country (ARSTKRT)"
              }
            })
          }}
        />

        {children}
      </body>
    </html>
  );
}