"use client";

import { useTransition } from "react";

import { createPost } from "@/_actions/create-post";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  EarthIcon,
  ImageIcon,
  Loader2Icon,
  UsersRoundIcon,
} from "lucide-react";

type Props = {
  closeDrawer: React.Dispatch<React.SetStateAction<boolean>>;
};

export function CreatePostForm({ closeDrawer }: Props) {
  const [isPending, startTrantision] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTrantision(async () => {
      const content = formData.get("content") as string;

      if (!content) return;

      const res = await createPost({ content });

      if (res.success) {
        toast.success(res.success);
        closeDrawer(false);
        return;
      }

      toast.error(res.error);
    });
  };

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <Label htmlFor="content">Conteúdo</Label>

      <Input
        id="content"
        name="content"
        placeholder="O que você está pensando?"
        disabled={isPending}
      />

      <div className="flex items-center gap-2">
        <Button type="button" size="sm" variant="ghost" className="w-fit">
          <ImageIcon className="size-4 mr-2" />
          Imagens/vídeos
        </Button>

        <div className="flex items-center gap-2 text-xs font-medium">
          <EarthIcon className="size-4" />
          <span>Todos</span>
          <Switch />
          <UsersRoundIcon className="size-4" />
          <span>Somente seguidores</span>
        </div>
      </div>

      <Button disabled={isPending}>
        {isPending ? (
          <Loader2Icon className="size-4 animate-spin" />
        ) : (
          "Adicionar"
        )}
      </Button>
    </form>
  );
}
