import { Category, Color, Product } from "@prisma/client";

export {};

export type Roles = "owner" | "admin";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}

export interface SidebarLinkProps {
  id: number;
  title: string;
  href: string;
  icon: LucideIcon;
}

export interface SidebarLinksProps extends SidebarLinkProps {
  subRoutes: SidebarLinkProps[];
}

export interface ProductType extends Product {
  category: Category;
  colors: Color[];
}

export interface CategoryType extends Category {
  products: ProductType[];
}
