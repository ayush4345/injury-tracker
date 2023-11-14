import { createSchema, createYoga } from "graphql-yoga";
import { createContext } from "../../../../graphql/context";
import { schema } from "../../../../graphql/schema";

const { handleRequest } = createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
  context: createContext,
  fetchAPI: {
    Request: Request,
    Response: Response,
  },
});

export { handleRequest as GET, handleRequest as POST };
