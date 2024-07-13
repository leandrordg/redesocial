import { prisma } from "@/lib/prisma";

const getUserById = async (id: string) => {
  return await prisma.user.findFirst({
    where: {
      userId: id,
    },
    include: {
      posts: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          author: true,
          likes: true,
          comments: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              author: true,
            },
          },
        },
      },
      likes: true,
      comments: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          author: true,
        },
      },
    },
  });
};

export { getUserById };
