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

builder.mutationField("createInjury", (t) =>
  t.prismaField({
    type: 'Injury',
    args: {
      reportId: t.arg.int({ required: true }),
      bodyPart: t.arg.string({ required: true }),
      description: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, ctx) => {
      const { reportId,bodyPart, description } = args

      if (!(await ctx).user) {
        throw new Error("You have to be logged in to perform this action")
      }

      return prisma.injury.create({
        ...query,
        data: {
          reportId,
          bodyPart,
          description,
        }
      })
    }
  })
)