import { prisma } from "@/lib/prisma";

const getPosts = async (orderBy: "asc" | "desc" = "desc") => {
  return await prisma.post.findMany({
    orderBy: { createdAt: orderBy },
    include: {
      author: true,
    },
  });
};

const getPostById = async (postId: string) => {
  return await prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: true,
    },
  });
};

export { getPosts, getPostById };
