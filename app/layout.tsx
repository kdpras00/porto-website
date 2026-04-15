import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk, Poppins } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { LazyMotion, domMax } from 'framer-motion';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import GlobalBackground from '@/components/layout/GlobalBackground';
import { PreloaderProvider } from '@/components/providers/PreloaderProvider';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Kurniawan Dwi Prasetyo - Portfolio',
  description: 'Full Stack Developer & UI/UX Designer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${poppins.variable} font-sans antialiased overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <GlobalBackground />
          <PreloaderProvider>
            <LazyMotion features={domMax}>
              <SmoothScrollProvider>
                {children}
              </SmoothScrollProvider>
            </LazyMotion>
          </PreloaderProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}