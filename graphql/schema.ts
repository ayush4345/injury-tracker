// graphql/schema.ts

export const typeDefs = `
  type Report {
    id: ID
    reporterName: String
    date: String
    time: String
    reporterEmail: String
    category: String
    imageUrl: String
  }

  type Query {
    reports: [Report]!
  }
`;
