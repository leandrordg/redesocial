import Link from "next/link";

import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export function Header() {
  const { userId } = auth();

  return (
    <div className="h-16 flex items-center justify-between px-6 lg:px-10 text-sm">
      <Link href="/">Inicio</Link>

      <div className="flex items-center gap-4">
        {userId && <Link href="/create-post">Adicionar</Link>}
        <ClerkLoading>
          <div className="size-7 rounded-full bg-muted animate-pulse" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">Entrar</SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </div>
  );
}
