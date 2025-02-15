import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { CourseCard } from "../courses/CourseCard";
import { getCourses } from "../courses/course.query";
import { getAuthSession } from "@/lib/auth";
import NotAuthentificatedCard from "./NotAuthenticatedCard";

export default async function ExplorerPage() {
  const session = await getAuthSession();

  if (!session) return <NotAuthentificatedCard />;

  const courses = await getCourses(session.user.id);

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Courses</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {courses.map((course) => (
          <CourseCard course={course} key={course.id} />
        ))}
      </LayoutContent>
    </Layout>
  );
}
