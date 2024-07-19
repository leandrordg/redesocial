import { getPosts } from "@/utils/queries/posts";

import { Feed } from "@/components/feed";

export default async function Page() {
  const posts = await getPosts();

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="p-6 lg:px-10">
        <h1 className="text-lg font-medium">Página Inicial</h1>
        <p className="text-sm text-muted-foreground">
          Exibindo as publicações mais recentes.
        </p>
      </div>

      <Feed posts={posts} />
    </div>
  );
}
