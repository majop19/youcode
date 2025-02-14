import { getAuthSession } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Link from "next/link";
import { UserLogout } from "@/components/features/auth/userStatusButton";
import { buttonVariants } from "@/components/ui/button";

export default async function AccountPage() {
  const session = await getAuthSession();

  if (!session) throw new Error("No Session Found");

  const user = session.user;

  return (
    <Card className="m-auto mt-4 max-w-lg">
      <CardHeader className="flex flex-row gap-4 space-y-0">
        <Avatar className="mr-2 size-10">
          <AvatarFallback>{user.name?.[0]}</AvatarFallback>
          {user.image && (
            <AvatarImage src={user.image} alt={user.name ?? "user picture"} />
          )}
        </Avatar>
        <div className="flex flex-col gap-1">
          <CardTitle>{user.email}</CardTitle>
          <CardDescription>{user.name}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Link
          className={buttonVariants({ variant: "outline", size: "lg" })}
          href="/account/settings"
        >
          Settings
        </Link>
        <Link
          className={buttonVariants({ variant: "outline", size: "lg" })}
          href="/admin"
        >
          Admin
        </Link>
      </CardContent>
      <CardFooter className="flex flex-row-reverse">
        <UserLogout />
      </CardFooter>
    </Card>
  );
}
