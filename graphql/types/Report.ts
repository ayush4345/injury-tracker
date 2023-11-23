import { builder } from "../builder";
import prisma from "src/server/db";

builder.prismaObject("Report", {
  fields: (t) => ({
    id: t.exposeID("id"),
    reporterName: t.exposeString("reporterName"),
    date: t.exposeString("date"),
    time: t.exposeString("time"),
    reporterEmail: t.exposeString("reporterEmail"),
    injury: t.relation("injury"),
  }),
});

// Define a custom input type for the filter
const filterType = builder.inputType("ReportFilterInput", {
  fields: (t) => ({
    reporterName: t.string(),
    reporterEmail: t.string(),
    date: t.string(),
    time: t.string(),
  }),
});

builder.queryField("reports", (t) =>
  t.prismaConnection({
    type: "Report",
    cursor: "id",
    args: {
      filter: t.arg({ type: filterType }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const { filter } = args;

      const reports = await prisma.report.findMany({
        ...query,
        where: {
          reporterEmail: filter?.reporterEmail ? { equals: filter?.reporterEmail } : undefined,
          reporterName: filter?.reporterName ? { equals: filter?.reporterName } : undefined,
          date: filter?.date ? { equals: filter?.date } : undefined,
          time: filter?.time ? { equals: filter?.time } : undefined,
        },
      });
      return reports;
    },
  }),
);

builder.mutationField("createReport", (t) =>
  t.prismaField({
    type: "Report",
    args: {
      reporterName: t.arg.string({ required: true }),
      reporterEmail: t.arg.string({ required: true }),
      date: t.arg.string({ required: true }),
      time: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, ctx) => {
      const { reporterName, reporterEmail, date, time } = args;

      if (!(await ctx).user) {
        throw new Error("You have to be logged in to perform this action");
      }

      return prisma.report.create({
        ...query,
        data: {
          reporterName,
          reporterEmail,
          date,
          time,
        },
      });
    },
  }),
);
