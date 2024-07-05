import { prisma } from "@/lib/prisma";

const getPosts = async (orderBy: "asc" | "desc" = "desc") => {
  return await prisma.post.findMany({
    orderBy: { createdAt: orderBy },
    include: {
      author: true,
      likes: true,
    },
  });
};

const getPostById = async (postId: string) => {
  return await prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: true,
      likes: true,
    },
  });
};

export { getPosts, getPostById };
