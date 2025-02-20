import { z } from "zod";

export const LESSON_STATE = ["HIDDEN", "PUBLISHED", "PUBLIC"] as const;

export const LessonSchema = z.object({
  name: z.string(),
  state: z.enum(LESSON_STATE),
});

export type LessonSchema = z.infer<typeof LessonSchema>;
