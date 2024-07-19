"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

const schema = z.object({
  bio: z.string().min(1, { message: "Biografia obrigatória" }),
});

export async function updateBiography(data: z.infer<typeof schema>) {
  const { userId } = auth();

  if (!userId) return { error: "Usuário não autenticado" };

  const { bio } = schema.parse(data);

  await prisma.user.update({
    where: { userId },
    data: { bio },
  });

  revalidatePath(`/settings`);

  return { success: "Biografia salva!" };
}
