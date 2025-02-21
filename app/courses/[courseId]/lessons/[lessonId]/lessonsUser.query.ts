import { prisma } from "@/lib/prisma";
import { UserHasCourse } from "../../course.query";

export const getLessonUser = async (
  userId: string,
  courseId: string,
  lessonId: string
) => {
  const userHasCourse = await UserHasCourse(courseId, userId);

  if (!userHasCourse) return;

  const lesson = await prisma.lesson.findUnique({
    where: {
      courseId: courseId,
      state: {
        in: ["PUBLIC", "PUBLISHED"],
      },
      id: lessonId,
    },
  });

  return lesson;
};
