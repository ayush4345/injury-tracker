import prisma from "~/server/db";

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
