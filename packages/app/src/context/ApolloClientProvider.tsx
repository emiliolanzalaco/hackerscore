'use client'
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

export function ApolloClientProvider ({ children }: {children : React.ReactNode}) {
  
  const client = new ApolloClient({
    uri: 'https://base-sepolia.easscan.org/graphql',
    cache: new InMemoryCache(),
  });
  
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}