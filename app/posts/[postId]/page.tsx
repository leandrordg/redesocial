import { SingleFeed } from "@/components/single-feed";
import { getPostById } from "@/utils/queries/posts";
import { notFound } from "next/navigation";

export default async function Page({
  params: { postId },
}: {
  params: { postId: string };
}) {
  const post = await getPostById(postId);

  if (!post) return notFound();

  return (
    <div className="max-w-screen-lg mx-auto space-y-6">
      <div className="px-6 lg:px-10">
        <h1 className="text-lg font-medium">
          Vendo publicação de {post.author.username}
        </h1>
      </div>

      <SingleFeed
        post={post}
        author={post.author}
        likes={post.likes}
        comments={post.comments}
      />
    </div>
  );
}
