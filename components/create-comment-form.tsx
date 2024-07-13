"use client";

import { useTransition } from "react";

import { createComment } from "@/_actions/create-comment";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Loader2Icon, SendIcon } from "lucide-react";

type Props = {
  postId: string;
};

export function CreateCommentForm({ postId }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const content = formData.get("content") as string;

      if (!content) return;

      const res = await createComment({ postId, content });

      if (res.success) {
        toast.success(res.success);
        return;
      }

      toast.error(res.error);
    });
  };

  return (
    <form action={handleSubmit} className="flex items-center gap-2 w-full">
      <Input
        name="content"
        placeholder="Comentar na publicação..."
        disabled={isPending}
      />
      <SignedOut>
        <Button disabled>
          <SendIcon className="size-4" />
        </Button>
      </SignedOut>
      <SignedIn>
        <Button disabled={isPending}>
          {!isPending ? (
            <SendIcon className="size-4" />
          ) : (
            <Loader2Icon className="size-4 animate-spin" />
          )}
        </Button>
      </SignedIn>
    </form>
  );
}
