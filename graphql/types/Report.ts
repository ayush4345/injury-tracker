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
