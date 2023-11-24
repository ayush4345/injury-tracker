"use client"

import Link from "next/link";
import { FormNextLink } from "grommet-icons";
import { gql, useQuery } from "@apollo/client";

export default function HomePage() {
  // const AllReportsQuery = gql`
  //   query allReportsQuery($first: Int, $after: ID) {
  //     reports(first: $first, after: $after) {
  //       pageInfo {
  //         endCursor
  //         hasNextPage
  //       }
  //       edges {
  //         cursor
  //         node {
  //           id
  //           reporterName
  //           date
  //           time
  //           reporterEmail
  //           injury{
  //             bodyPart
  //             description
  //           }
  //         }
  //       }
  //     }
  //   }
  // `;

  // const { data, loading, error, fetchMore } = useQuery(AllReportsQuery,{
  //   variables: { first: 3 },
  // });

  // console.log(data)

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Oh no... {error.message}</p>;

  // const { endCursor, hasNextPage } = data.reports.pageInfo;

  return (
    <main className="flex min-h-[90vh] flex-col items-center justify-center bg-[#034144] text-white">
      <div className="flex w-[80vw] items-center justify-center gap-12 rounded-2xl border-2 border-[#1e6164] p-3 px-6 ">
        <div className="flex flex-col gap-4 ">
          <h1 className="mb-3 font-['inter'] text-3xl font-semibold text-white sm:text-6xl">
            Injury Tracker
          </h1>
          <div className="text-lg font-semibold text-[#00afaa]">
            Application to maintain all your report of injury
          </div>
          <div>
            Easily to keep record of injury in the system.
            <br />
            Get acccess of report at ease
          </div>
          <Link
            href="/report"
            className="flex w-48 gap-3 rounded-xl bg-white p-4 font-semibold text-[#034144] transition-all ease-in-out hover:gap-5"
          >
            <span>Report Incident</span>
            <FormNextLink />
          </Link>
        </div>
        <div className=" translate-x-16 skew-x-6">
          <img src="/illustraction.png" className=" w-[600px]" />
        </div>
      </div>
    </main>
  );
}
