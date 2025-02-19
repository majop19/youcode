import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { LessonForm } from "./LessonForm";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function LessonPage({
  params,
}: {
  params: { lessonId: string };
}) {
  const lesson = await prisma.lesson.findUnique({
    where: {
      id: params.lessonId,
    },
    select: {
      id: true,
      name: true,
      state: true,
      courseId: true,
    },
  });

  if (!lesson) {
    notFound();
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Update Lesson</LayoutTitle>
      </LayoutHeader>
      <LayoutActions>
        <Link
          className={buttonVariants({
            size: "sm",
            variant: "secondary",
          })}
          href={`/admin/courses/${lesson.courseId}/lessons`}
        >
          Back
        </Link>
      </LayoutActions>
      <LayoutContent>
        <Card className="flex-[2]">
          <CardContent className="mt-6">
            <LessonForm defaultValue={lesson} />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
