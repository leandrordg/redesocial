import Image from "next/image";

import { Comment, User } from "@prisma/client";
import { formatRelative } from "date-fns";
import { ptBR } from "date-fns/locale";

type Props = {
  comments: (Comment & {
    author: User;
  })[];
};

export function CommentFeed({ comments }: Props) {
  return (
    <section className="flex flex-col gap-4 py-2">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="border rounded-md p-4 shadow-sm hover:bg-muted/20 flex flex-col gap-2"
        >
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <Image
              src={comment.author.imageUrl}
              alt={comment.author.username}
              width={64}
              height={64}
              loading="lazy"
              className="size-4 rounded-full bg-muted mr-1"
            />
            <span>{comment.author.username}</span>
            <span>•</span>
            <span>
              {formatRelative(comment.createdAt, new Date(), { locale: ptBR })}
            </span>
          </div>
          <p>{comment.content}</p>
        </div>
      ))}
    </section>
  );
}
