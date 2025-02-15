import { UserLogin } from "@/components/features/auth/userStatusButton";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotAuthentificatedCard() {
  return (
    <Card className="m-auto mt-4 max-w-lg">
      <CardHeader>
        <CardTitle>You need to be logged to view your courses</CardTitle>
      </CardHeader>
      <CardFooter>
        <UserLogin />
      </CardFooter>
    </Card>
  );
}
