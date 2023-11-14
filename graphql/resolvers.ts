import { PrismaClient } from "@prisma/client";

prisma = new PrismaClient()

export const resolvers = {

  Query: {
    reports: () => {
      return prisma.report.findMany()
    },
    injuries: () => {
      return prisma.injury.findMany()
    },
  },
};
