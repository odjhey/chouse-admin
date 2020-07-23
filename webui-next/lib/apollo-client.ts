import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createHttpLink } from "apollo-link-http";

const createApolloClient = (initialState: any, headers: any) => {
  const ssrMode = typeof window === "undefined";
  // let link;
  // if (ssrMode) {
  //   link = createHttpLink(headers); // executed on server
  // } else {
  //   link = createWSLink(); // executed on client
  // }
  const link = createHttpLink({ uri: "http://localhost:4000/" }); // executed on server
  return new ApolloClient({
    ssrMode,
    // @ts-ignore
    link,
    cache: new InMemoryCache().restore(initialState),
  });
};

export default createApolloClient;
