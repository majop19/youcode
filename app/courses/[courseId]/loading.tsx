import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { CoursePlaceholder } from "../CourcePlaceholder";

export default async function CoursePage() {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Your courses</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <CoursePlaceholder />
      </LayoutContent>
    </Layout>
  );
}
