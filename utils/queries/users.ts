import { prisma } from "@/lib/prisma";

const getUserById = async (id: string) => {
  return await prisma.user.findFirst({
    where: {
      userId: id,
    },
    include: {
      posts: {
        include: {
          author: true,
          likes: true,
          comments: {
            include: {
              author: true,
            },
          },
        },
      },
      likes: true,
      comments: {
        include: {
          author: true,
        },
      },
    },
  });
};

export { getUserById };
