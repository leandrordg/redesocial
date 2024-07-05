"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  postId: z.string().min(1, { message: "ID do post obrigatório" }),
});

export async function likePost(data: z.infer<typeof schema>) {
  const { userId } = auth();

  if (!userId) return { error: "Usuário não autenticado" };

  const { postId } = schema.parse(data);

  // verify if user already liked the post
  const postLiked = await prisma.like.findFirst({
    where: { postId, authorId: userId },
  });

  if (!postLiked) {
    await prisma.like.create({
      data: {
        authorId: userId,
        postId,
      },
    });

    revalidatePath(`/posts/${postId}`);

    return { success: "Publicação curtida" };
  }

  await prisma.like.delete({
    where: { id: postLiked.id, authorId: userId },
  });

  revalidatePath(`/posts/${postId}`);

  return { success: "Curtida removida" };
}
