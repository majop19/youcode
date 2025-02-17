import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";

import { getCourses } from "../courses/course.query";
import { CourseCard } from "../courses/courseCard";

export default async function ExplorerPage() {
  const courses = await getCourses();

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Explorer</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {courses.map((course) => (
          <CourseCard course={course} key={course.id} />
        ))}
      </LayoutContent>
    </Layout>
  );
}
