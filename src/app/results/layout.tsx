import { Suspense } from 'react';

export default function ResultsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">{children}</main>
      </div>
  );
}
