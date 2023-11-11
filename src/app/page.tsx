"use client";

import Link from "next/link";
import { FormNextLink } from "grommet-icons";

export default function HomePage() {
  return (
    <main className="flex min-h-[90vh] flex-col items-center justify-center bg-[#034144] text-white">
      <div className="flex w-[80vw] items-center justify-center gap-12 rounded-2xl border-2 border-[#1e6164] p-3 px-6 ">
        <div className="flex flex-col gap-4 ">
          <h1 className="font-['inter'] text-3xl mb-3 font-semibold text-white sm:text-[4rem]">
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
          <Link href="/report" className="flex w-40 gap-3 rounded-xl bg-white p-4 font-semibold text-[#034144] transition-all ease-in-out hover:gap-5">
            <span>Get Started</span>
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
