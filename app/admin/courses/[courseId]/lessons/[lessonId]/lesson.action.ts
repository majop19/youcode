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

const LessonActionEditContentSchema = z.object({
  lessonId: z.string(),
  markdown: z.string(),
});

export const LessonActionEditContent = authenticatedAction
  .schema(LessonActionEditContentSchema)
  .action(async ({ parsedInput, ctx }) => {
    const lesson = await prisma.lesson.update({
      where: {
        id: parsedInput.lessonId,
        course: {
          creatorId: ctx.userId,
        },
      },
      data: {
        content: parsedInput.markdown,
      },
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      message: "Lesson updated successfully",
      lesson,
    };
  });
