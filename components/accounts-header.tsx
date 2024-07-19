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
import { EllipsisVerticalIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  user: User;
};

export function AccountsHeader({ user }: Props) {
  const { userId } = auth();

  const isOwner = userId === user.userId;

  return (
    <div className="flex flex-col gap-4 p-6 lg:p-10">
      {/* User Info */}
      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-4">
          <Image
            src={user.imageUrl}
            alt={user.username!}
            width={256}
            height={256}
            className="size-20 sm:size-24 rounded-full bg-muted"
          />

          <div>
            <h1 className="text-lg font-medium">{user.username}</h1>

            <p className="text-sm text-muted-foreground">
              0 seguidores 0 seguindo
            </p>

            {user.bio && <p className="text-sm hidden md:block mt-1">{user.bio}</p>}
          </div>
          <div className="ml-auto">
            <Button size="icon" variant="ghost">
              <EllipsisVerticalIcon className="size-4" />
            </Button>
          </div>
        </div>
        {user.bio && <p className="text-sm md:hidden">{user.bio}</p>}
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
              Seguir
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            {isOwner ? (
              <Link href="/settings" className="w-full">
                <Button size="sm" className="w-full">
                  Editar perfil
                </Button>
              </Link>
            ) : (
              <Button size="sm" variant="outline" className="w-full">
                Seguir
              </Button>
            )}
          </SignedIn>
        </ClerkLoaded>
      </div>
    </div>
  );
}
