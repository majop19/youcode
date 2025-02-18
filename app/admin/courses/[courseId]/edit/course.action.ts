"use server";

import { authenticatedAction } from "@/lib/action";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { CourseFormSchema } from "./course.schema";

const CourseActionEditProps = z.object({
  courseId: z.string(),
  data: CourseFormSchema,
});

export const courseActionEdit = authenticatedAction
  .schema(CourseActionEditProps)
  .action(async ({ parsedInput, ctx }) => {
    const course = await prisma.course.update({
      where: {
        id: parsedInput.courseId,
        creatorId: ctx.userId,
      },
      data: parsedInput.data,
    });
    return { id: course.id, message: "Course updated successfully" };
  });

export const courseActionCreate = authenticatedAction
  .schema(CourseFormSchema)
  .action(async ({ parsedInput, ctx }) => {
    const course = await prisma.course.create({
      data: {
        creatorId: ctx.userId,
        ...parsedInput,
      },
    });

    return { id: course.id, message: "Course created successfully" };
  });
