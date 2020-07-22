import React from "react";
import { RootStore, StoreContext } from "../src/models";
import { createHttpClient } from "mst-gql";

const rootStore = RootStore.create(undefined, {
  gqlHttpClient: createHttpClient("http://localhost:4000/graphql"),
});

// @ts-ignore
export default function App({ Component, pageProps }) {
  return (
    <StoreContext.Provider value={rootStore}>
      <Component {...pageProps} />
    </StoreContext.Provider>
  );
}

// @ts-ignore
//window.store = rootStore;
