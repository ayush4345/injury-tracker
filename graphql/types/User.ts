import { builder } from "../builder";
import prisma from "src/server/db";

builder.prismaObject('User', {
  fields: (t) => ({
    id: t.exposeID('id'),
    email: t.exposeString('email'),
    image: t.exposeString('image', { nullable: true, }),
    role: t.expose('role', { type: Role, }),
    reports: t.relation('reports'),
  })
})

const Role = builder.enumType('Role', {
  values: ['USER', 'ADMIN'] as const,
})

builder.queryField("users", (t) =>
  t.prismaConnection({
    type: "User",
    cursor: "id",
    resolve: (query, _parent, _args, _ctx, _info) =>
      prisma.user.findMany({ ...query }),
  }),
);
