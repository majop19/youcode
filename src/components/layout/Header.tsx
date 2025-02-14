import { SiteConfig } from "@/lib/site-config";
import Link from "next/link";
import { ThemeToggle } from "../theme/ThemeToggle";
import { Typography } from "../ui/typography";
import Image from "next/image";
import { UserButton } from "../features/auth/user-button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container m-2 flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex items-center gap-2">
          <Image src="/images/logo.svg" width={50} height={35} alt="app logo" />
          <Typography variant="h3" as={Link} href="/">
            {SiteConfig.title}
          </Typography>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <UserButton />
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
