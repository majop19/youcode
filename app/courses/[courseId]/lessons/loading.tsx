import { LessonsNavigationSkeleton } from "./LessonNavigationSkeleton";
import { LessonSkeleton } from "./LessonSkeleton";

export default function LessonLoading() {
  return (
    <div className="flex items-start gap-4 p-4">
      <LessonsNavigationSkeleton />
      <LessonSkeleton />
    </div>
  );
}
