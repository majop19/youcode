import { getAuthSession } from "@/lib/auth";
import { UserLogged, UserLogin } from "./userStatusButton";

export const UserButton = async () => {
  const session = await getAuthSession();

  const user = session?.user;

  if (!user) {
    return <UserLogin />;
  }

  return <UserLogged user={user} />;
};
