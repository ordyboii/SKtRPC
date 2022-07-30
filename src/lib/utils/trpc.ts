import type { appRouter } from "$lib/server/router";
import type { inferHandlerInput } from "@trpc/server";
import { createTRPCClient } from "@trpc/client";
import superjson from "superjson";
import { writable } from "svelte/store";
import { browser } from "$app/env";

const client = createTRPCClient<typeof appRouter>({
  url: browser ? "/trpc" : "http://127.0.0.1:5173/trpc",
  transformer: superjson
});

type AppQueries = typeof appRouter["_def"]["queries"];

export const createTRPCQuery = <TPath extends keyof AppQueries>(
  path: TPath,
  ...args: inferHandlerInput<AppQueries[TPath]>
) => {
  const { subscribe, update } = writable(client.query(path, ...args));

  return {
    subscribe,
    refetch: () => update(() => client.query(path, ...args))
  };
};

type AppMutations = typeof appRouter["_def"]["mutations"];

export const createTRPCMutation = <TPath extends keyof AppMutations>(
  path: TPath
) => {
  const createData = (...args: inferHandlerInput<AppMutations[TPath]>) => {
    return client.mutation(path, ...args);
  };
  return { mutate: createData };
};
