import Link from 'next/link';
import { Leaf } from 'lucide-react';

export function Header() {
  return (
    <header className="py-4 px-4 sm:px-6 md:px-8 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
      <div className="container mx-auto flex items-center gap-2">
        <Leaf className="h-6 w-6 text-primary" />
        <Link href="/" className="text-xl font-headline font-bold">
          O Cardápio Sem Leite da Mãe Prevenida
        </Link>
      </div>
    </header>
  );
}
