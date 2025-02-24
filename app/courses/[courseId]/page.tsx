import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { getAuthSession } from "@/lib/auth";
import { notFound } from "next/navigation";

import React from "react";
import { getCourse } from "./course.query";
import { Course } from "./Course";

export default async function CoursePage(props: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await props.params;
  const session = await getAuthSession();
  const course = await getCourse({
    courseId: courseId,
    userId: session?.user.id,
  });

  if (!course) {
    notFound();
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Course</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Course course={course} />
      </LayoutContent>
    </Layout>
  );
}
