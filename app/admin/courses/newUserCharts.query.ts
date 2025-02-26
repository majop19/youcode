import { prisma } from "@/lib/prisma";

type Enrollment = {
  id: string;
  userId: string;
  createdAt: Date;
  courseId: string;
  canceledAt: Date | null;
};

export type NewUserChartsProps = {
  data: {
    date: string;
    newUsersCount: number;
    canceledUsersCount: number;
  }[];
};

function getEnrollmentStats(enrollments: Enrollment[]): NewUserChartsProps {
  const statsMap = new Map<
    string,
    { newUsersCount: number; canceledUsersCount: number }
  >();

  enrollments.forEach(({ createdAt, canceledAt }) => {
    const createdDate = createdAt.toISOString().split("T")[0];
    if (!statsMap.has(createdDate)) {
      statsMap.set(createdDate, { newUsersCount: 0, canceledUsersCount: 0 });
    }
    const createdStats = statsMap.get(createdDate);
    if (createdStats) {
      createdStats.newUsersCount++;
    }

    if (canceledAt) {
      const canceledDate = canceledAt.toISOString().split("T")[0];
      if (!statsMap.has(canceledDate)) {
        statsMap.set(canceledDate, { newUsersCount: 0, canceledUsersCount: 0 });
      }
      const canceledStats = statsMap.get(canceledDate);
      if (canceledStats) {
        canceledStats.canceledUsersCount++;
      }
    }
  });

  return {
    data: Array.from(statsMap.entries()).map(
      ([date, { newUsersCount, canceledUsersCount }]) => ({
        date,
        newUsersCount,
        canceledUsersCount,
      })
    ),
  };
}

export const newUserCharts = async () => {
  const date = new Date();
  date.setDate(date.getDate() - 30);

  const courseOnUser = await prisma.courseOnUser.findMany({
    where: {
      createdAt: {
        gte: date,
      },
    },
  });

  return getEnrollmentStats(courseOnUser);
};
