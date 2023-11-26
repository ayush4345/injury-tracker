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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { FormNextLink } from "grommet-icons";
import { Injury, Report } from "@prisma/client";

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
          injury {
            bodyPart
            description
            id
          }
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
      <h1 className="mb-5 text-center text-3xl font-semibold text-white">
        Dashboard
      </h1>
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
          {data?.reports.edges.map((report: any) => {
            let newDate = new Date(report.node.date);
            let dateString = newDate.toDateString();
            return (
              <TableRow key={report.node.id} className="hover:bg-green-100/10">
                <TableCell className="font-medium">{report.node.id}</TableCell>
                <TableCell>{dateString}</TableCell>
                <TableCell>{report.node.time}</TableCell>
                <TableCell>{report.node.reporterName}</TableCell>
                <TableCell className=" flex cursor-pointer justify-center text-center underline ">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <span className="flex gap-1 transition-all hover:gap-3">
                        view <FormNextLink />
                      </span>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-[#20425A] text-white">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Information</AlertDialogTitle>
                        {report.node.injury.length > 0 ? (
                          report.node.injury.map((data: Injury) => {
                            return (
                              <AlertDialogDescription className="mb-3">
                                <strong className="text-md">Body Part</strong> : {data.bodyPart}
                                <br />
                                <strong className="text-md">Description📃</strong> : {data.description}
                              </AlertDialogDescription>
                            )
                          })
                        ) : (
                          <AlertDialogDescription>
                            no more Information
                          </AlertDialogDescription>
                        )}
                        
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogAction className="bg-[#34485B] shadow-lg hover:bg-[#0a3d66]">
                          Close
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
