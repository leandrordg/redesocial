import { Like, Post, User } from "@prisma/client";
import { PostCard } from "./post-card";

type Props = {
  post: Post;
  author: User;
  likes: Like[];
};

export function SingleFeed({ post, author, likes }: Props) {
  return (
    <section>
      <PostCard post={post} author={author} likes={likes} />
    </section>
  );
}
