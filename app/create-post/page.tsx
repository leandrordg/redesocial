import { auth } from "@clerk/nextjs/server";

import { CreatePostForm } from "./form";

export default function Page() {
  const { userId, protect } = auth();

  if (!userId) protect();

  return (
    <div className="p-6 lg:p-10 max-w-screen-lg mx-auto space-y-6">
      <h1 className="text-lg font-medium">Adicionar publicação</h1>

      <CreatePostForm />
    </div>
  );
}
