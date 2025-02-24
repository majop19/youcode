import { Suspense } from "react";

import { LessonSkeleton } from "./LessonSkeleton";
import { LessonsNavigation } from "./LessonsNavigation";
import { LessonsNavigationSkeleton } from "./LessonNavigationSkeleton";
import { Lesson } from "./lesson";

export default async function LessonPage({
  params,
}: {
  params: Promise<{
    lessonId: string;
    courseId: string;
  }>;
}) {
  const Params = await params;
  return (
    <div className="flex items-start gap-4 p-4">
      <Suspense fallback={<LessonsNavigationSkeleton />}>
        <LessonsNavigation
          courseId={Params.courseId}
          currentLessonId={Params.lessonId}
        />
      </Suspense>
      <Suspense fallback={<LessonSkeleton />}>
        <Lesson {...Params} />
      </Suspense>
    </div>
  );
}
