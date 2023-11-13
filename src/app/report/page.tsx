"use client";

import React, { InputHTMLAttributes, useState } from "react";
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
import { format, set } from "date-fns";
import { BodyComponent } from "reactjs-human-body";
import { Textarea } from "~/components/ui/textarea";

const Form = () => {
  const [Name, setName] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [injuredPart, setInjuredPart] = useState<String[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted:", { Name, date, email, phone });
  };

  const showBodyPart = (side: string, e: string) => {
    console.log("Bodypart:", typeof e);
    const newInjuredPart = [...injuredPart];
    const index = newInjuredPart.findIndex((part) =>
      part.includes(`${side} ${e}`),
    );
    if (index !== -1) {
      newInjuredPart.splice(index, 1);
      setInjuredPart([...newInjuredPart]);
    } else {
      setInjuredPart([...newInjuredPart, side + " " + e]);
    }
  };

  console.log("injuredPart:", injuredPart);

  return (
    <div className="flex justify-around">
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
            id="firstName"
            value={Name}
            onChange={(event) => setName(event.target.value)}
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
        <h2 className="text-white text-xl font-semibold mb-4">Injury Details</h2>
        {injuredPart.map((data, index) => {
          return (
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="mb-2 block font-semibold text-gray-100"
              >
                {data}
              </label>
              <Textarea
                id="phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                // className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-100 shadow focus:outline-none"
              />
            </div>
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
