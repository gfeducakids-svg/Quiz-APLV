import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Footer } from '@/components/footer';
import { ChatWidget } from '@/components/chat/ChatWidget';
import { Inter, Poppins } from 'next/font/google';

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
  return (
    <html lang="pt-BR" className={cn("scroll-smooth", inter.variable, poppins.variable)}>
      <head>
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
        <main className="flex-grow">{children}</main>
        <Footer />
        <ChatWidget />
        <Toaster />
      </body>
    </html>
  );
}
