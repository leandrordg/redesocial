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
    <div className="p-6 lg:p-10 max-w-screen-lg mx-auto space-y-6">
      <h1 className="text-lg font-medium">
        Vendo publicação de {post.author.username}
      </h1>

      <SingleFeed post={post} author={post.author} likes={post.likes} />
    </div>
  );
}
