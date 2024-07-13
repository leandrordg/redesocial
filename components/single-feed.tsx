import type { Comment, Like, Post, User } from "@prisma/client";

import { PostCard } from "@/components/post-card";

type Props = {
  post: Post;
  author: User;
  likes: Like[];
  comments: (Comment & {
    author: User;
  })[];
};

export function SingleFeed({ post, author, likes, comments }: Props) {
  return (
    <PostCard post={post} author={author} likes={likes} comments={comments} />
  );
}
