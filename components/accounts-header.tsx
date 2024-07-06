import Image from "next/image";

import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import type { User } from "@prisma/client";
import { formatRelative } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Button } from "@/components/ui/button";

type Props = {
  user: User;
};

export function AccountsHeader({ user }: Props) {
  const { userId } = auth();

  const isOwner = userId === user.userId;

  return (
    <div className="flex flex-col gap-4">
      {/* User Info */}
      <div className="flex items-center gap-4">
        <Image
          src={user.imageUrl}
          alt={user.username!}
          width={256}
          height={256}
          className="size-20 sm:size-24 md:size-32 rounded-full bg-muted"
        />

        <div>
          <h1 className="text-lg font-medium">{user.username}</h1>
          <span className="text-muted-foreground text-sm">
            Entrou{" "}
            {formatRelative(new Date(), user.createdAt, { locale: ptBR })}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <ClerkLoading>
          <div className="bg-muted rounded-md h-8 px-4 py-2 w-full animate-pulse" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedOut>
            <SignInButton mode="modal">
              <Button size="sm" variant="outline" className="w-full">
                Acompanhar
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            {isOwner ? (
              <Button size="sm" className="w-full">
                Editar perfil
              </Button>
            ) : (
              <Button size="sm" variant="outline" className="w-full">
                Acompanhar
              </Button>
            )}
          </SignedIn>
        </ClerkLoaded>
      </div>
    </div>
  );
}
