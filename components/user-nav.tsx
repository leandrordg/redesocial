import Image from "next/image";

import { currentUser } from "@clerk/nextjs/server";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BoltIcon, LogOutIcon, UserRoundIcon } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

export async function UserNav() {
  const user = await currentUser();

  if (!user) return null;

  const primaryEmail = user.emailAddresses.find(
    (email) => email.id === user.primaryEmailAddressId
  )?.emailAddress;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <Image
          src={user.imageUrl}
          alt={user.username!}
          width={56}
          height={56}
          className="size-7 rounded-full bg-muted"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.username}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {primaryEmail}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={`/accounts/${user.id}`}>
            <DropdownMenuItem>
              Meu perfil
              <DropdownMenuShortcut>
                <UserRoundIcon className="size-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href={`/settings`}>
            <DropdownMenuItem>
              Configurações
              <DropdownMenuShortcut>
                <BoltIcon className="size-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <SignOutButton>
          <DropdownMenuItem>
            Desconectar
            <DropdownMenuShortcut>
              <LogOutIcon className="size-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
