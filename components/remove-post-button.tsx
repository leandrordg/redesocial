"use client";

import { useTransition } from "react";

import { deletePost } from "@/_actions/delete-post";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Loader2Icon, TrashIcon } from "lucide-react";

type Props = {
  postId: string;
};

export function RemovePostButton({ postId }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(async () => {
      const res = await deletePost({ postId });

      if (res.success) {
        toast.success(res.success);
        return;
      }

      toast.error(res.error);
    });
  };

  return (
    <Button
      variant="outline"
      size="icon"
      disabled={isPending}
      onClick={handleSubmit}
      className="size-6"
    >
      {isPending ? (
        <Loader2Icon className="size-3 animate-spin" />
      ) : (
        <TrashIcon className="size-3" />
      )}
    </Button>
  );
}
