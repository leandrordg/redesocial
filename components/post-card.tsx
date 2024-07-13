import Image from "next/image";
import Link from "next/link";

import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import type { Comment, Like, Post, User } from "@prisma/client";
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";

import { CommentsDrawer } from "@/components/comments-drawer";
import { LikePostButton } from "@/components/like-post-button";
import { RemovePostButton } from "@/components/remove-post-button";
import { Button } from "@/components/ui/button";
import { HeartIcon } from "lucide-react";

type Props = {
  post: Post;
  author: User;
  likes: Like[];
  comments: (Comment & {
    author: User;
  })[];
};

export function PostCard({ post, author, likes, comments }: Props) {
  const { userId } = auth();

  const isAuthor = userId === author.userId;

  return (
    <article className="p-6 lg:px-10 rounded-md shadow-sm hover:bg-muted/20 flex flex-col gap-2">
      <div className="flex items-center gap-1">
        <Image
          src={author.imageUrl}
          alt={author.username}
          width={64}
          height={64}
          loading="lazy"
          className="size-5 rounded-full bg-muted mr-1"
        />

        <div className="flex items-baseline gap-1">
          <Link href={`/accounts/${author.userId}`}>{author.username}</Link>

          <span className="text-muted-foreground text-xs">
            •{" "}
            {formatDistance(post.createdAt, new Date(), {
              locale: ptBR,
              addSuffix: true,
            })}
          </span>
        </div>

        {isAuthor && (
          <div className="ml-auto">
            <RemovePostButton postId={post.id} />
          </div>
        )}
      </div>

      <Link href={`/posts/${post.id}`}>
        <p>{post.content}</p>
      </Link>

      <div className="flex items-center gap-2">
        <ClerkLoading>
          <div className="size-6 rounded-md bg-muted animate-pulse" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline" size="icon" className="size-6">
                <HeartIcon className="size-3" />
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <LikePostButton postId={post.id} likes={likes} />
          </SignedIn>
        </ClerkLoaded>
        <span className="text-sm text-muted-foreground">
          {likes.length === 1 ? "1 curtida" : `${likes.length} curtidas`}
        </span>
        <CommentsDrawer postId={post.id} comments={comments} />
      </div>
    </article>
  );
}
