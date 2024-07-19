"use client";

import { usePathname } from "next/navigation";
import { Fragment } from "react";

import { routes } from "@/app/settings/_links";
import { SidebarLink } from "./settings-sidebar-item";

export function SettingsSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href);

  return (
    <div className="p-6 lg:py-10 w-full h-full">
      <h1 className="text-lg font-medium">Configurações</h1>

      <div className="flex flex-col mt-4">
        {routes?.map((link) => (
          <Fragment key={link.id}>
            <SidebarLink
              id={link.id}
              title={link.title}
              href={link.href}
              icon={link.icon}
            />

            {link.subRoutes.length > 0 && isActive(link.href) && (
              <div className="flex flex-col gap-2 ml-8 relative">
                {link.subRoutes.map((subLink) => (
                  <SidebarLink
                    key={subLink.id}
                    id={subLink.id}
                    title={subLink.title}
                    href={subLink.href}
                    icon={subLink.icon}
                  />
                ))}
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
