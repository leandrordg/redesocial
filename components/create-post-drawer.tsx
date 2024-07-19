"use client";

import { useState } from "react";

import { CreatePostForm } from "@/components/create-post-form";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CopyPlusIcon } from "lucide-react";

export function CreatePostDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
          <CopyPlusIcon className="size-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="flex flex-col gap-6">
        <DrawerHeader>
          <DrawerTitle>Adicionar uma publicação</DrawerTitle>
        </DrawerHeader>

        <div className="p-4">
          <CreatePostForm closeDrawer={setIsOpen} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
