import type { SidebarLinkProps, SidebarLinksProps } from "@/types/globals";

import {
  BellIcon,
  BoltIcon,
  CirclePlusIcon,
  PenLineIcon,
  Settings2Icon,
  ShieldIcon,
  TrashIcon,
  UserRoundIcon,
} from "lucide-react";

const exampleLink: SidebarLinkProps[] = [
  {
    id: 1,
    title: "Adicionar uma categoria",
    href: "/admin/categories/add",
    icon: CirclePlusIcon,
  },
  {
    id: 2,
    title: "Editar uma categoria",
    href: "/admin/categories/edit",
    icon: PenLineIcon,
  },
  {
    id: 3,
    title: "Excluir uma categoria",
    href: "/admin/categories/delete",
    icon: TrashIcon,
  },
];

const routes: SidebarLinksProps[] = [
  {
    id: 1,
    title: "Meu perfil",
    href: "/settings",
    icon: UserRoundIcon,
    subRoutes: [],
  },
  {
    id: 2,
    title: "Notificações",
    href: "/settings/notifications",
    icon: BellIcon,
    subRoutes: [],
  },
  {
    id: 3,
    title: "Segurança",
    href: "/settings/security",
    icon: ShieldIcon,
    subRoutes: [],
  },
  {
    id: 4,
    title: "Preferências",
    href: "/settings/preferences",
    icon: Settings2Icon,
    subRoutes: [],
  },
  {
    id: 5,
    title: "Avançado",
    href: "/settings/advanced",
    icon: BoltIcon,
    subRoutes: [],
  },
];

export { routes };
