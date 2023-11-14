"use client";

import * as React from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../lib/apollo";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <UserProvider>
      <ApolloProvider client={apolloClient}>
        {mounted && children}
      </ApolloProvider>
    </UserProvider>
  );
}
