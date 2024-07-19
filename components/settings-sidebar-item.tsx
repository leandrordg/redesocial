"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { SidebarLinkProps } from "@/types/globals";

export function SidebarLink({ id, title, href, icon: Icon }: SidebarLinkProps) {
  const pathname = usePathname();

  const isActive = pathname === href && pathname.startsWith(href);

  return (
    <Link
      key={id}
      href={href}
      className={cn(
        "p-2 hover:bg-muted transition-all rounded-md text-muted-foreground text-sm",
        {
          "text-black font-medium": isActive,
        }
      )}
    >
      <Icon className="size-4 inline-block mr-2" />
      {title}
    </Link>
  );
}