import { builder } from "./builder";
import "./types/User";
import "./types/Report";
import "./types/Injury";

export const schema = builder.toSchema({})

// export const typeDefs = `
//   type Injury {
//     id:ID
//     updatedAt:String
//     reportId:Int
//     bodyPart:String
//     description:String
//   }
//   type Report {
//     id: ID
//     createdAt:String
//     reporterName: String
//     date: String
//     time: String
//     reporterEmail: String
//   }

//   type Query {
//     reports: [Report]!
//     injuries: [Injury]!
//   }
// `;
