"use client";

import { Button } from "../../ui/button";
import { signIn, signOut } from "next-auth/react";
import { LogOut, User } from "lucide-react";
import type { Session } from "next-auth";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { AvatarFallback } from "../../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../ui/alert-dialog";

import Link from "next/link";

export const UserLogin = () => {
  return (
    <>
      <Button variant="outline" onClick={async () => signIn("github")}>
        <User />
        Sign in with Github
      </Button>
    </>
  );
};

export type UserLogged = {
  user: Session["user"];
};

export const UserLogged = ({ user }: UserLogged) => {
  return (
    <DropdownMenu>
      <AlertDialog>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Avatar className="mr-2 size-6">
              <AvatarFallback>{user.name?.[0]}</AvatarFallback>
              {user.image && (
                <AvatarImage
                  src={user.image}
                  alt={user.name ?? "user picture"}
                />
              )}
            </Avatar>
            {user.name}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link href="/account">
              <User size={12} />
              My Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <AlertDialogTrigger asChild>
            <DropdownMenuItem>
              <LogOut size={12} />
              Logout
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to logout?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="secondary">Cancel</Button>
            </AlertDialogCancel>
            <Button variant="destructive" onClick={async () => signOut()}>
              Logout
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DropdownMenu>
  );
};

export const UserLogout = () => {
  return (
    <Button
      variant="destructive"
      onClick={async () => signOut()}
      className="ml-auto"
    >
      <LogOut size={12} />
      Logout
    </Button>
  );
};
