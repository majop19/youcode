import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Card, CardContent } from "@/components/ui/card";
import { getRequiredAuthSession } from "@/lib/auth";
import { FormSettings } from "./FormSettings";

export default async function Settingspage() {
  const session = await getRequiredAuthSession();
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Account settings</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Card>
          <CardContent>
            <FormSettings {...session.user} />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
