import Link from "next/link";

import { auth } from "@clerk/nextjs/server";
import { Post, User } from "@prisma/client";
import { formatRelative } from "date-fns";
import { ptBR } from "date-fns/locale";

import { RemovePostButton } from "@/components/remove-post-button";

type Props = {
  post: Post;
  author: User;
};

export function PostCard({ post, author }: Props) {
  const { userId } = auth();

  const isAuthor = userId === author.userId;

  return (
    <article className="border rounded-md p-4 shadow-sm hover:bg-muted/20 flex flex-col gap-1">
      <div className="flex items-center gap-1 text-muted-foreground text-sm">
        <span>{author.username}</span>
        <span>•</span>
        <span>
          {formatRelative(post.createdAt, new Date(), { locale: ptBR })}
        </span>
        {isAuthor && (
          <div className="ml-auto">
            <RemovePostButton postId={post.id} />
          </div>
        )}
      </div>
      <Link href={`/posts/${post.id}`}>
        <p>{post.content}</p>
      </Link>
    </article>
  );
}
