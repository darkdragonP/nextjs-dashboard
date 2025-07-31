import '@/app/ui/global.css';

import { Metadata } from 'next';
import ClientLayout from '@/app/ClientLayout';

export const metadata: Metadata = {
   title: {
    template: '%s | Acme 대시보드',
    default: 'Acme 대시보드',
  },
  description: 'App Router로 제작된 공식 Next.js 강의 대시보드입니다.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
        <ClientLayout>{children}</ClientLayout>
    </html>
  );
}
