"use client";

import { redirect } from "next/navigation";
import { useTransition } from "react";

import { createPost } from "@/app/create-post/actions";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2Icon } from "lucide-react";

export function CreatePostForm() {
  const [isPending, startTrantision] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTrantision(async () => {
      const content = formData.get("content") as string;

      if (!content) return;

      const res = await createPost({ content });

      if (res.success) {
        toast.success(res.success);
        redirect("/");
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
