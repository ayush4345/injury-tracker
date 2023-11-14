import { id } from "date-fns/locale";
import { builder } from "../builder";
import prisma from "src/server/db";

builder.prismaObject("Injury", {
  fields: (t) => ({
    id: t.exposeID("id"),
    reportId: t.exposeInt("reportId"),
    bodyPart: t.exposeString("bodyPart"),
    description: t.exposeString("description"),
  }),
});

builder.queryField("injuries", (t) =>
  t.prismaConnection({
    type: "Injury",
    cursor: "id",
    resolve: (query, _parent, _args, _ctx, _info) =>
      prisma.injury.findMany({ ...query }),
  }),
);
