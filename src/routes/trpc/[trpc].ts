import type { RequestEvent } from "@sveltejs/kit";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "$lib/server/router";
import { context } from "$lib/server/trpc";

const handler = (event: RequestEvent) =>
  fetchRequestHandler({
    req: event.request,
    endpoint: "/trpc",
    router: appRouter,
    createContext: context
  });

export { handler as GET, handler as POST };
