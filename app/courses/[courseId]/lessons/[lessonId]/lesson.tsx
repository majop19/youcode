import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { LessonType } from "./lesson.query";
import { MdxProse } from "./MdxProse";

export const Lesson = ({ lesson }: { lesson: LessonType }) => {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{lesson.name}</CardTitle>
      </CardHeader>
      <CardContent className="">
        <MdxProse markdown={lesson.content} />
      </CardContent>
    </Card>
  );
};
