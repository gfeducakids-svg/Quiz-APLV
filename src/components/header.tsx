import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export function Header() {
  return (
    <header className="py-4 px-4 sm:px-6 md:px-8 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
      <div className="container mx-auto flex items-center gap-4">
        <BookOpen className="h-8 w-8 text-primary" />
        <Link href="/" className="text-xl font-headline font-bold">
          O Cardápio Sem Leite da Mãe Prevenida
        </Link>
      </div>
    </header>
  );
}
