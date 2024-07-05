"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

const schema = z.object({
  postId: z.string().min(1, { message: "ID do post obrigatório" }),
});

export async function deletePost(data: z.infer<typeof schema>) {
  const { userId } = auth();

  if (!userId) return { error: "Usuário não autenticado" };

  const { postId } = schema.parse(data);

  // verify if the userId is the same as the authorId
  const postExists = !!(await prisma.post.findFirst({
    where: { id: postId, authorId: userId },
  }));

  if (!postExists)
    return {
      error: "Sem permissão para deletar esta publicação",
    };

  await prisma.post.delete({ where: { id: postId } });

  revalidatePath("/");

  return { success: "Publicação removida com sucesso" };
}
