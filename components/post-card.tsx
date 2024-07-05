import { Post, User } from "@prisma/client";
import { formatRelative } from "date-fns";
import { ptBR } from "date-fns/locale";

type Props = {
  post: Post;
  author: User;
};

export function PostCard({ post, author }: Props) {
  return (
    <article className="border rounded-md p-4 space-y-2">
      <div className="text-muted-foreground text-sm space-x-1">
        <span>{author.username}</span>
        <span>•</span>
        <span>
          {formatRelative(post.createdAt, new Date(), { locale: ptBR })}
        </span>
      </div>
      <p>{post.content}</p>
    </article>
  );
}
