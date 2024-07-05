"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

const formSchema = z.object({
  content: z.string().min(1, { message: "Conteúdo obrigatório" }).trim(),
});

export const createPost = async (data: z.infer<typeof formSchema>) => {
  const { userId } = auth();

  if (!userId) return { error: "Usuário não autenticado" };

  const { content } = formSchema.parse(data);

  return { success: `Publicação criada com sucesso: ${content}` };
};
