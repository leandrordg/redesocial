import { prisma } from "@/lib/prisma";

const getPosts = async (orderBy: "asc" | "desc" = "desc") => {
  return await prisma.post.findMany({
    orderBy: { createdAt: orderBy },
    include: {
      author: true,
    },
  });
};

export { getPosts };
