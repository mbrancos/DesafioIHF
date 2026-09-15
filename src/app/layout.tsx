import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'iHubFiscal — Central de Contas a Pagar & Governança',
  description: 'Central inteligente de contas a pagar e governança fiscal da holding Companhia de Impacto',
  icons: {
    icon: [
      { url: '/img/logo-impact-hub.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/img/logo-impact-hub.svg',
    apple: '/img/logo-impact-hub.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${poppins.variable}`} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="bg-[#f7f6f2] text-[#333333] min-h-screen antialiased"
      >
        {children}
      </body>
    </html>
  );
}
