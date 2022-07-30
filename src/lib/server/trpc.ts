import { initTRPC, type inferAsyncReturnType } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { PrismaClient } from "@prisma/client";
import superjson from "superjson";

const prisma = new PrismaClient();

export const context = ({ req }: FetchCreateContextFnOptions) => {
  return { req, prisma };
};

export const t = initTRPC<{ ctx: inferAsyncReturnType<typeof context> }>()({
  transformer: superjson
});
