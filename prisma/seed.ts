/* eslint-disable no-await-in-loop */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Dans la function `main`, je fais un code pour créer 10 utilisateurs qui ont chacun 1 cours et 100 relations entre les cours et les utilisateurs en tant qu'élèves.

const main = async () => {
  const users = await prisma.user.findMany();

  for (const user of users) {
    try {
      await prisma.courseOnUser.create({
        data: {
          courseId: "cm74rpf4s0011v6q8v76pb9sp",
          userId: user.id,
        },
      });
    } catch {
      /* empty */
    }
  }
};

// link users to courses
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    // eslint-disable-next-line no-console
    console.error(error);

    await prisma.$disconnect();

    process.exit(1);
  });
