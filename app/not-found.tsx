import { TriangleAlertIcon } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="px-6 lg:px-10 py-20">
      <div className="flex flex-col items-center gap-6 justify-center max-w-screen-lg mx-auto">
        <TriangleAlertIcon className="size-10 text-muted-foreground" />

        <h1 className="text-lg font-medium">Página não encontrada</h1>

        <p className="text-muted-foreground text-center">
          A página que você está procurando não existe. Por favor, verifique o
          endereço e tente novamente.
        </p>

        <Link href="/" className="text-blue-700 text-sm">Voltar para a página inicial</Link>
      </div>
    </div>
  );
}
