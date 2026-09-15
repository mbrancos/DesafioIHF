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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${poppins.variable}`}>
      <body className="bg-[#f7f6f2] text-[#333333] min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
