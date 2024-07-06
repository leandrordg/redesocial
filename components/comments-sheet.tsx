import type { Comment, User } from "@prisma/client";

import { CommentFeed } from "@/components/comment-feed";
import { CreateCommentForm } from "@/components/create-comment-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type Props = {
  postId: string;
  comments: (Comment & {
    author: User;
  })[];
};

export function CommentsSheet({ postId, comments }: Props) {
  return (
    <Sheet>
      <SheetTrigger className="text-sm text-muted-foreground">
        {comments.length === 1
          ? "1 comentário"
          : `${comments.length} comentários`}
      </SheetTrigger>
      <SheetContent className="flex flex-col h-dvh gap-4">
        <SheetHeader>
          <SheetTitle>Comentários ({comments.length})</SheetTitle>
          <SheetDescription>
            Veja o que as pessoas estão falando sobre esse post.
          </SheetDescription>
        </SheetHeader>

        <div className="grow overflow-y-auto">
          <CommentFeed comments={comments} />
        </div>

        <SheetFooter>
          <CreateCommentForm postId={postId} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
