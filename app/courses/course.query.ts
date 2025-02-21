import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export const getCourses = async (userId?: string) => {
  // eslint-disable-next-line no-return-await
  return await prisma.course.findMany({
    where: userId
      ? {
          users: {
            some: {
              userId,
              canceledAt: null,
            },
          },
        }
      : undefined,
    select: {
      name: true,
      image: true,
      presentation: true,
      id: true,
      creator: {
        select: {
          image: true,
          name: true,
        },
      },
    },
  });
};

export type CoursesCard = Prisma.PromiseReturnType<typeof getCourses>[number];
