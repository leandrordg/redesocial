"use client";

import { useTransition } from "react";

import { likePost } from "@/_actions/like-post";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Like } from "@prisma/client";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { HeartIcon, Loader2Icon } from "lucide-react";

type Props = {
  postId: string;
  likes: Like[];
};

export function LikePostButton({ postId, likes }: Props) {
  const { userId } = useAuth();

  const [isPending, startTransition] = useTransition();

  const isLiked = likes.some((like) => like.authorId === userId);

  const handleSubmit = () => {
    startTransition(async () => {
      const res = await likePost({ postId });

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
      {!isPending ? (
        <HeartIcon
          className={cn("size-3", isLiked && "text-red-600 fill-red-600")}
        />
      ) : (
        <Loader2Icon className="size-3 animate-spin" />
      )}
    </Button>
  );
}
