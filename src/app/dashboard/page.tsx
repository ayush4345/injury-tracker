"use client";
import { useQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { FormNextLink } from "grommet-icons";
import ReportCards from "./reportsCard";

const FetchReportData = gql`
  query GetReport($reportFilter: ReportFilterInput) {
    reports(filter: $reportFilter) {
      edges {
        node {
          id
          reporterEmail
          reporterName
          time
          date
        }
        cursor
      }
    }
  }
`;

export default function TableDemo() {
  const { user } = useUser();
  const [reporterEmail, setReporterEmail] = useState<
    string | null | undefined
  >();

  useEffect(() => {
    setReporterEmail(user?.email);
  }, [user]);

  const { loading, error, data, refetch } = useQuery(FetchReportData, {
    variables: {
      reportFilter: {
        reporterEmail: reporterEmail,
      },
    },
  });

  console.log(data?.reports);

  return (
    <div className=" my-10">
      <h1 className="text-center text-white text-3xl font-semibold mb-5">Dashboard</h1>
      <Table className="text-white">
        <TableCaption>A list of your reported incident.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Reporter Name</TableHead>
            <TableHead className="text-center">More Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.reports.edges.map((invoice: any) => {
            let newDate = new Date(invoice.node.date);
            let dateString = newDate.toDateString();
            return (
              <TableRow key={invoice.node.id} className="hover:bg-green-100/10">
                <TableCell className="font-medium">{invoice.node.id}</TableCell>
                <TableCell>{dateString}</TableCell>
                <TableCell>{invoice.node.time}</TableCell>
                <TableCell>{invoice.node.reporterName}</TableCell>
                <TableCell className=" flex cursor-pointer justify-center gap-1 text-center underline transition-all hover:gap-3">
                  view <FormNextLink className=" fill-white stroke-white" />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-center">
              {data?.reports.edges.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
