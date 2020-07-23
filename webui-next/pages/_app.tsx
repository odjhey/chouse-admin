import React from "react";
import { StoreContext } from "../src/models";
import { useStore } from "../lib/store";

// @ts-ignore
export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialState);
  if (typeof window !== "undefined") {
    // @ts-ignore
    window.store = store;
  }
  return (
    <StoreContext.Provider value={store}>
      <Component {...pageProps} />
    </StoreContext.Provider>
  );
}
