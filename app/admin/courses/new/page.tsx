import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { CourseForm } from "../[courseId]/edit/FormCourse";
import { Card, CardContent } from "@/components/ui/card";

export default async function NewCoursePage() {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>New Course</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Card className="flex-[2]">
          <CardContent className="mt-6">
            <CourseForm />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
