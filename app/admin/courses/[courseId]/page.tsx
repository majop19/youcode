import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Typography } from "@/components/ui/typography";
import { getRequiredAuthSession } from "@/lib/auth";
import Link from "next/link";
import {
  PreviewButton,
  NextButton,
} from "@/components/features/pagination/PaginationButton";
import { getAdminCourse } from "./adminCourse.query";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
export default async function AdminCoursePage({
  params,
  searchParams,
}: {
  params: {
    courseId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams.page ?? 0);

  const session = await getRequiredAuthSession();

  const course = await getAdminCourse({
    courseId: params.courseId,
    userId: session.user.id,
    userPage: page,
  });

  const numberofUsers = course._count?.users ?? 0;

  const totalpage = Math.floor(numberofUsers / 5);

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>
          <Link href={"/admin/courses"}>Courses</Link>
        </LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-4 lg:flex-row">
        <Card className="flex-[2]">
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-end">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {course.users?.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Avatar className="rounded">
                        <AvatarFallback>{user.email?.[0]}</AvatarFallback>
                        {user.image && (
                          <AvatarImage
                            src={user.image}
                            alt={user.email ?? ""}
                          />
                        )}
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <Typography
                        as={Link}
                        variant="large"
                        href={`/admin/users/${user.id}`}
                      >
                        {user.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {user.canceled ? "Canceled" : "Active"}
                      </Badge>
                    </TableCell>
                    <TableCell className="flex flex-row-reverse">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button size="sm" variant="secondary">
                            <Menu size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem asChild>
                            <form>
                              <button
                                formAction={async () => {
                                  "use server";

                                  const session =
                                    await getRequiredAuthSession();

                                  const courseId = params.courseId;
                                  const userId = user.id;

                                  const courseOnUser =
                                    await prisma.courseOnUser.findFirst({
                                      where: {
                                        userId,
                                        course: {
                                          id: courseId,
                                          creatorId: session.user.id,
                                        },
                                      },
                                    });

                                  if (!courseOnUser) return;

                                  await prisma.courseOnUser.update({
                                    where: {
                                      id: courseOnUser.id,
                                    },
                                    data: {
                                      canceledAt: courseOnUser.canceledAt
                                        ? null
                                        : new Date(),
                                    },
                                  });

                                  revalidatePath(`/admin/courses/${courseId}`);
                                }}
                              >
                                {user.canceled ? "Activate" : "Cancel"}
                              </button>
                            </form>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-2 flex gap-2">
              {page != 0 && (
                <PreviewButton
                  baseUrl={`/admin/courses/${course.id}`}
                  page={page}
                />
              )}
              {totalpage > page && totalpage != 0 ? (
                <NextButton
                  baseUrl={`/admin/courses/${course.id}`}
                  page={page}
                />
              ) : null}
            </div>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader className="flex-row items-center gap-4 space-y-0">
            <Avatar className="rounded">
              <AvatarFallback>{course.name?.[0]}</AvatarFallback>
              {course.image && (
                <AvatarImage src={course.image} alt={course.name ?? ""} />
              )}
            </Avatar>
            <CardTitle>{course.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            <Typography>{course._count?.users} users</Typography>
            <Typography>{course._count?.lessons} lessons</Typography>
            <Link
              href={`/admin/courses/${course.id}/edit`}
              className={buttonVariants({
                variant: "outline",
              })}
            >
              Edit
            </Link>{" "}
            <Link
              href={`/admin/courses/${course.id}/lessons`}
              className={buttonVariants({
                variant: "outline",
              })}
            >
              Edit lessons
            </Link>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
