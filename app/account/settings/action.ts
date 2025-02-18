"use server";

import { prisma } from "@/lib/prisma";
import type { FormSettings } from "./FormSettings";

export const updateUser = async (id: string, data: FormSettings) => {
  await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      name: data.name,
      image: data.image,
    },
  });
};
