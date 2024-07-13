"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

const formSchema = z.object({
  content: z.string().min(1, { message: "Conteúdo obrigatório" }).trim(),
});

export const createPost = async (data: z.infer<typeof formSchema>) => {
  const { userId } = auth();

  if (!userId) return { error: "Usuário não autenticado" };

  const { content } = formSchema.parse(data);

  await prisma.post.create({
    data: {
      content,
      authorId: userId,
    },
  });

  revalidatePath("/");

  return { success: "Post criado com sucesso!" };
};
