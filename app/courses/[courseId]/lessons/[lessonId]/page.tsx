import { getRequiredAuthSession } from "@/lib/auth";
import { getCourse } from "../../course.query";
import { LessonItem } from "../lessonItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLessonUser } from "./lessonsUser.query";
import { MarkdownProse } from "@/components/features/mdx/MarkdownProse";
export default async function CoursePage({
  params,
}: {
  params: {
    courseId: string;
    lessonId: string;
  };
}) {
  const session = await getRequiredAuthSession();

  const course = await getCourse({
    courseId: params.courseId,
    userId: session.user.id,
  });

  const lesson = await getLessonUser(
    session.user.id,
    params.courseId,
    params.lessonId
  );

  if (!lesson) return;

  return (
    <div className="m-10 flex flex-row gap-2">
      <Card className="grid-col flex-2 grid items-center gap-2">
        <CardHeader>
          <CardTitle>{course?.name}</CardTitle>
        </CardHeader>
        <CardContent>
          {course?.lessons.map((lesson) => (
            <LessonItem key={lesson.id} lesson={lesson} />
          ))}
        </CardContent>
      </Card>
      <Card className="flex-[2]">
        <CardHeader>
          <CardTitle>{lesson.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <MarkdownProse markdown={lesson.content} />
        </CardContent>
      </Card>
    </div>
  );
}
