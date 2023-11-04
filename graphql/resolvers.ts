import prisma from "~/server/db";

export const resolvers = {
  Query: {
    reports: () => {
      // return [
      //   {
      //     category: "Open Source",
      //     description: "Fullstack React framework",
      //     id: 1,
      //     imageUrl: "https://nextjs.org/static/twitter-cards/home.jpg",
      //     reporterName: "Next.js",
      //     reporterEmail: "https://nextjs.org",
      //     data: "20 Oct 2023",
      //     time: "11:00 AM",
      //   },
      // ];
      return prisma.report.findMany()
    },
  },
};
