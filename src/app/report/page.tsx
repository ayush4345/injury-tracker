"use client";

import React, { InputHTMLAttributes, useEffect, useState } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { format } from "date-fns";
import { BodyComponent } from "reactjs-human-body";
import { Textarea } from "~/components/ui/textarea";
import toast, { Toaster } from "react-hot-toast";
import { gql, useMutation } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { getSession } from "@auth0/nextjs-auth0";
import InjuryInfo, { InputData } from "./injuryInfo";
import { useQuery, useLazyQuery } from "@apollo/client";

const CreateReportMutation = gql`
  mutation createReport(
    $reporterName: String!
    $reporterEmail: String!
    $date: String!
    $time: String!
  ) {
    createReport(
      reporterName: $reporterName
      reporterEmail: $reporterEmail
      date: $date
      time: $time
    ) {
      reporterName
      reporterEmail
      date
      time
    }
  }
`;

const CreateInjuryMutation = gql`
  mutation createInjury($reportId: Int!, $part: String!, $value: String!) {
    createInjury(reportId: $reportId, bodyPart: $part, description: $value) {
      reportId
      bodyPart
      description
    }
  }
`;

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

const Form = () => {
  const [reporterName, setReporterName] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [reporterEmail, setReporterEmail] = useState<
    string | null | undefined
  >();
  const [description, setDescription] = useState<InputData[]>([]);
  const [injuredPart, setInjuredPart] = useState<String[]>([]);

  const handleAddInput = (part: string) => {
    const newInputData = {
      part: part,
      value: "",
    };

    setDescription((prevList) => [...prevList, newInputData]);
  };

  const handleRemoveInput = (part: string) => {
    setDescription((prevList) =>
      prevList.filter((input) => input.part !== part),
    );
  };

  const handleInputChange = (part: string, value: string) => {
    console.log(part, value);
    setDescription((prevList) =>
      prevList.map((input) =>
        input.part === part ? { ...input, value } : input,
      ),
    );
  };

  console.log(description);

  const { user } = useUser();

  const router = useRouter();

  useEffect(() => {
    setReporterEmail(user?.email);
  }, [user]);

  const [
    loadReport,
    {
      loading: fetchReportLoading,
      error: reportFetchError,
      data: reportData,
      refetch,
    },
  ] = useLazyQuery(FetchReportData, {
    variables: {
      reportFilter: {
        reporterName: reporterName,
        reporterEmail: reporterEmail,
        date: date,
        time: time,
      },
    },
    onCompleted: (data) => handleInjurySubmit(data),
    // skip: true, // Skip initial query execution
    // fetchPolicy: "network-only", // Disable cache
  });

  const [createReport, { loading, error }] = useMutation(CreateReportMutation, {
    onCompleted: () => loadReport(),
  });

  const [createInjury, { loading: injuryLoading, error: injuryError }] =
    useMutation(CreateInjuryMutation, {
      // onCompleted: () => loadReport(),
    });

  console.log(reporterEmail);
  console.log((reportData?.reports.edges[0].node.id));
  console.log(reportFetchError);
  console.log(fetchReportLoading);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      router.push("/api/auth/login");
    } else {
      const variables = { reporterName, reporterEmail, date, time };
      // console.log("Form submitted:", { name, date, time, email });
      try {
        toast.promise(createReport({ variables }), {
          loading: "Creating new report..",
          success: "Report successfully created!🎉",
          error: `Something went wrong 😥 Please try again -  ${error}`,
        });

        console.log(reportData);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleInjurySubmit = async (data: any) => {
    if (!user) {
      router.push("/api/auth/login");
    } else {
      const reportId = parseInt(data.reports.edges[0].node.id);
      console.log(data)
      description.forEach((item) => {
        let part = item.part;
        let value = item.value;
        const variables = { reportId, part, value };
        console.log("Form submitted:", { reportId, part, value });
        try {
          toast.promise(createInjury({ variables }), {
            loading: "Creating new injury..",
            success: "Injury successfully added!🎉",
            error: `Something went wrong 😥 Please try again -  ${error}`,
          });
        } catch (error) {
          console.error(error);
        }
      });
    }
  };

  const showBodyPart = (side: string, e: string) => {
    console.log("Bodypart:", typeof e);
    const injury = [...description];
    const index = injury.findIndex((data) =>
      data.part.includes(`${side} ${e}`),
    );
    if (index !== -1) {
      // injury.splice(index, 1);
      // setDescription([...injury]);
      handleRemoveInput(side + " " + e);
    } else {
      handleAddInput(side + " " + e);
    }
  };

  console.log(description);

  console.log("injuredPart:", injuredPart);

  return (
    <div className="flex justify-around">
      <Toaster />
      <form onSubmit={handleSubmit} className="flex max-w-lg flex-col p-16">
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="mb-2 block font-semibold text-gray-100"
          >
            Reporter Name
          </label>
          <Input
            type="text"
            id="reporterName"
            value={reporterName}
            onChange={(event) => setReporterName(event.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="Date"
            className="mb-2 block font-semibold text-gray-100"
          >
            Date & Time of Injury
          </label>
          <div className="flex gap-5">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal text-white",
                    !date && "text-white",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="bg-white"
                />
              </PopoverContent>
            </Popover>
            <Input
              placeholder="hh:mm:ss"
              onChange={(event) => setTime(event.target.value)}
              value={time}
              className="placeholder:text-gray-400"
            />
          </div>
        </div>
        <h2 className="mb-4 text-xl font-semibold text-white">
          Injury Details
        </h2>
        {description.map((data, index) => {
          return (
            <InjuryInfo
              key={index}
              data={data.part}
              value={data.value}
              onInputChange={handleInputChange}
            />
          );
        })}
        <Button
          type="submit"
          className="focus:shadow-outline rounded bg-white px-4 py-2 font-semibold text-[#00afaa] hover:bg-gray-300 focus:outline-none"
        >
          Submit
        </Button>
      </form>
      <section className="flex gap-14">
        <div className=" flex flex-col items-center">
          <BodyComponent onClick={(e: string) => showBodyPart("front", e)} />
          <h3 className="font-semibold text-white">Front Body</h3>
        </div>
        <div className=" flex flex-col items-center">
          <BodyComponent onClick={(e: string) => showBodyPart("back", e)} />
          <h3 className="font-semibold text-white">Back Body</h3>
        </div>
      </section>
    </div>
  );
};

export default Form;
