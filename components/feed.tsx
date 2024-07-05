import type { Comment, Like, Post, User } from "@prisma/client";

import { PostCard } from "@/components/post-card";

type Props = {
  posts: (Post & {
    author: User;
    likes: Like[];
    comments: (Comment & {
      author: User;
    })[];
  })[];
};

export function Feed({ posts }: Props) {
  return (
    <section className="grid grid-cols-1 gap-6">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          author={post.author}
          likes={post.likes}
          comments={post.comments}
        />
      ))}
    </section>
  );
}
