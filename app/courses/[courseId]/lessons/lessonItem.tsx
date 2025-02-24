import { Typography } from "@/components/ui/typography";
import { CheckCircle, Circle, CircleDashed } from "lucide-react";
import Link from "next/link";
import type { CourseLessonItem } from "../course.query";
import { cn } from "@/lib/utils";

export type LessonItemProps = {
  lesson: CourseLessonItem;
  currentLessonId?: string;
};

export const getLessonIcon = (status: CourseLessonItem["progress"]) => {
  if (status === "COMPLETED") {
    return CheckCircle;
  }

  if (status === "IN_PROGRESS") {
    return Circle;
  }

  return CircleDashed;
};

export const LessonItem = ({ lesson, currentLessonId }: LessonItemProps) => {
  const Icon = getLessonIcon(lesson.progress);
  return (
    <Link href={`/courses/${lesson.courseId}/lessons/${lesson.id}`}>
      <div
        className={cn(
          "flex items-center gap-3 rounded border border-border px-4 py-2 transition-colors hover:bg-accent",
          lesson.id === currentLessonId ? "bg-muted" : "bg-card"
        )}
      >
        <Icon size={16} />
        <Typography variant="small" className="flex-1">
          {lesson.name}
        </Typography>
      </div>
    </Link>
  );
};
