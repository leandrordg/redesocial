"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

const schema = z.object({
  postId: z.string().min(1, { message: "ID da publicação obrigatório" }),
  content: z.string().min(1, { message: "Conteúdo do comentário obrigatório" }),
});

export async function createComment(data: z.infer<typeof schema>) {
  const { userId } = auth();

  if (!userId) return { error: "Usuário não autenticado" };

  const { postId, content } = schema.parse(data);

  await prisma.comment.create({
    data: {
      postId,
      content,
      authorId: userId,
    },
  });

  revalidatePath(`/posts/${postId}`);

  return { success: "Comentário criado com sucesso" };
}
