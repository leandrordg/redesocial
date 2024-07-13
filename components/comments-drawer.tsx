import type { Comment, User } from "@prisma/client";

import { CommentFeed } from "@/components/comment-feed";
import { CreateCommentForm } from "@/components/create-comment-form";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type Props = {
  postId: string;
  comments: (Comment & {
    author: User;
  })[];
};

export function CommentsDrawer({ postId, comments }: Props) {
  return (
    <Drawer>
      <DrawerTrigger className="text-sm text-muted-foreground">
        {comments.length === 1
          ? "1 comentário"
          : `${comments.length} comentários`}
      </DrawerTrigger>
      <DrawerContent className="flex flex-col h-[90%] gap-6">
        <DrawerHeader>
          <DrawerTitle>Comentários ({comments.length})</DrawerTitle>
        </DrawerHeader>

        <div className="grow overflow-y-auto">
          <CommentFeed comments={comments} />
        </div>

        <DrawerFooter>
          <CreateCommentForm postId={postId} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
