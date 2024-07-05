import { Post, User } from "@prisma/client";
import { PostCard } from "./post-card";

type Props = {
  post: Post;
  author: User;
};

export function SingleFeed({ post, author }: Props) {
  return (
    <section>
      <PostCard post={post} author={author} />
    </section>
  );
}
