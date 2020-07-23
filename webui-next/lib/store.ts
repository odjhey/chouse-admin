import { useMemo } from "react";
import { applySnapshot } from "mobx-state-tree";
import { RootStore } from "../src/models";
import { createHttpClient } from "mst-gql";

//@ts-ignore
let store: any;

export function initializeStore(snapshot = null) {
  const _store =
    store ??
    RootStore.create(undefined, {
      gqlHttpClient: createHttpClient(
        process.env.SERVICE_URL || "http://localhost:4000/graphql"
      ),
    });

  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here, check `pages/ssg.js` and `pages/ssr.js` for more details
  if (snapshot) {
    applySnapshot(_store, snapshot);
  }
  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return store;
}

export function useStore(initialState: any) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
