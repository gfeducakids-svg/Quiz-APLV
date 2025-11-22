import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Footer } from '@/components/footer';
import { ChatWidget } from '@/components/chat/ChatWidget';
import { Inter, Poppins } from 'next/font/google';
import { use } from 'react';
import Script from 'next/script';
import { GtagEvent } from '@/lib/types';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Maternal APLV Quiz',
  description:
    'Descubra os 3 erros fatais que você pode estar cometendo na alimentação do seu filho com APLV.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const trackGtagEvent = (event: GtagEvent) => {
    if (typeof window.gtag !== 'function') {
      return;
    }
    window.gtag('event', event.action, event.params);
  };
  
  return (
    <html lang="pt-BR" className={cn("scroll-smooth", inter.variable, poppins.variable)}>
      <head>
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N6VT5VPB');`}}></script>
        {/* End Google Tag Manager */}
        
        {/* Google tag (gtag.js) */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-68GDJPS8W7"></Script>
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-68GDJPS8W7');
          `}
        </Script>

        <script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          data-utmify-prevent-xcod-sck
          data-utmify-prevent-subids
          async
          defer
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.pixelId = "68e2e1905f7cae90cc6bdcad";
              var a = document.createElement("script");
              a.setAttribute("async", "");
              a.setAttribute("defer", "");
              a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
              document.head.appendChild(a);
            `,
          }}
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body text-foreground antialiased flex flex-col'
        )}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N6VT5VPB"
        height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe></noscript>
        {/* End Google Tag Manager (noscript) */}
        <main className="flex-grow">{children}</main>
        <Footer />
        <ChatWidget />
        <Toaster />
      </body>
    </html>
  );
}
