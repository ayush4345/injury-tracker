import { createSchema, createYoga } from "graphql-yoga";
import { resolvers } from "../../../../graphql/resolvers";
import { typeDefs } from "../../../../graphql/schema";
import { createContext } from '../../../../graphql/context'

const { handleRequest } = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  graphqlEndpoint: "/api/graphql",
  context: createContext,
  fetchAPI: {
    Request: Request,
    Response: Response,
  },
});

export { handleRequest as GET, handleRequest as POST };
