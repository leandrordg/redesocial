"use client";

import { useTransition } from "react";

import { updateBiography } from "@/_actions/update-biography";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2Icon } from "lucide-react";

export function BiographyForm() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const bio = formData.get("bio") as string;

      if (!bio) return;

      const res = await updateBiography({ bio });

      if (res.success) {
        toast.success(res.success);
        return;
      }

      toast.error(res.error);
    });
  };

  return (
    <form action={handleSubmit} className="space-y-4">
      <Textarea
        name="bio"
        placeholder="Escreva uma biografia para o seu perfil..."
        disabled={isPending}
      />

      <Button size="sm" disabled={isPending}>
        {isPending ? (
          <Loader2Icon className="size-4 animate-spin" />
        ) : (
          "Atualizar"
        )}
      </Button>
    </form>
  );
}
