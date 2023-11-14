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

builder.queryField("reports", (t) =>
  t.prismaConnection({
    type: "Report",
    cursor: "id",
    resolve: (query, _parent, _args, _ctx, _info) =>
      prisma.report.findMany({ ...query }),
  }),
);

builder.mutationField("createReport", (t) =>
  t.prismaField({
    type: 'Report',
    args: {
      reporterName: t.arg.string({ required: true }),
      reporterEmail: t.arg.string({ required: true }),
      date: t.arg.string({ required: true }),
      time: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, ctx) => {
      const { reporterName,reporterEmail, date, time } = args

      if (!(await ctx).user) {
        throw new Error("You have to be logged in to perform this action")
      }

      return prisma.report.create({
        ...query,
        data: {
          reporterName,
          reporterEmail,
          date,
          time,
        }
      })
    }
  })
)