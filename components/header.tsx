import Link from "next/link";

import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/user-nav";
import { CopyPlusIcon } from "lucide-react";
import { CreatePostDrawer } from "./create-post-drawer";

export function Header() {
  return (
    <div className="h-16 flex items-center justify-between px-6 lg:px-10 text-sm">
      <Link href="/">Inicio</Link>

      <div className="flex items-center gap-4">
        <ClerkLoading>
          <div className="size-7 rounded-full bg-muted animate-pulse" />
          <div className="size-7 rounded-full bg-muted animate-pulse" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <CreatePostDrawer />
            <UserNav />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">Entrar</SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </div>
  );
}
