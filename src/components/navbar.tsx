"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";

const Navbar = () => {
  const router = useRouter();
  const { user } = useUser();

  return (
    <nav className="flex items-center justify-between bg-[#034144] p-4">
      <Link href="/">
        <h1 className=" text-3xl font-semibold text-white">Lief</h1>
      </Link>
      <ul className="flex list-none items-center">
        <li className="ml-4">
          <a href="#" className="font-semibold text-white hover:underline">
            Dashboard
          </a>
        </li>
        {user ? (
          <li className="ml-4">
            <button
              onClick={() => router.push("/api/auth/logout")}
              className="rounded-lg border-2 border-[#1e6164] px-4 py-2 font-semibold text-white transition duration-300 ease-in-out hover:border-[#2e888c]"
            >
              Logout
            </button>
          </li>
        ) : (
          <li className="ml-4">
            <button
              onClick={() => router.push("/api/auth/login")}
              className=" rounded-lg border-2 border-[#1e6164] px-4 py-2 font-semibold text-white transition duration-300 ease-in-out hover:border-[#2e888c]"
            >
              Login
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
