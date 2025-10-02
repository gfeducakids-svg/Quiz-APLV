export function Footer() {
  return (
    <footer className="bg-background/80 backdrop-blur-sm border-t">
      <div className="container mx-auto px-4 py-6 text-center text-muted-foreground text-sm">
        <p className="font-semibold">
          © {new Date().getFullYear()} Maternal APLV Quiz. Todos os direitos
          reservados.
        </p>
        <p className="mt-2">
          Este quiz é uma ferramenta de autoconhecimento e não substitui o
          diagnóstico e acompanhamento de um profissional de saúde qualificado.
        </p>
      </div>
    </footer>
  );
}
