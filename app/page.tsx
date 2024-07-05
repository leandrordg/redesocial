import { getPosts } from "@/utils/queries/posts";

import { Feed } from "@/components/feed";

export default async function Page() {
  const posts = await getPosts();

  return (
    <div className="p-6 lg:p-10 max-w-screen-lg mx-auto space-y-6">
      <h1 className="text-lg font-medium">Página Inicial</h1>

      <Feed posts={posts} />
    </div>
  );
}
