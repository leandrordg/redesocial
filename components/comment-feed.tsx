import Image from "next/image";
import Link from "next/link";

import type { Comment, User } from "@prisma/client";
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";

type Props = {
  comments: (Comment & {
    author: User;
  })[];
};

export function CommentFeed({ comments }: Props) {
  return (
    <section className="flex flex-col gap-1">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="px-6 py-3 hover:bg-muted flex flex-col gap-1"
        >
          <div className="flex items-center gap-1 text-sm">
            <Image
              src={comment.author.imageUrl}
              alt={comment.author.username}
              width={64}
              height={64}
              loading="lazy"
              className="size-4 rounded-full bg-muted mr-1"
            />
            <Link href={`/accounts/${comment.author.userId}`}>
              {comment.author.username}
            </Link>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">
              {formatDistance(comment.createdAt, new Date(), {
                locale: ptBR,
                addSuffix: true,
              })}
            </span>
          </div>
          <p>{comment.content}</p>
        </div>
      ))}
    </section>
  );
}
