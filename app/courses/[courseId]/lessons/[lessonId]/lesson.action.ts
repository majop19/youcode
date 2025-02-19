"use server";
import { authenticatedAction } from "@/lib/action";
import { LessonSchema } from "./lesson.schema";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const LessonActionEditProps = z.object({
  lessonId: z.string(),
  data: LessonSchema,
});

export const LessonActionEdit = authenticatedAction
  .schema(LessonActionEditProps)
  .action(async ({ parsedInput, ctx }) => {
    await prisma.lesson.update({
      where: {
        id: parsedInput.lessonId,
        course: {
          creatorId: ctx.userId,
        },
      },
      data: parsedInput.data,
    });

    return "Lesson updated successfully";
  });
