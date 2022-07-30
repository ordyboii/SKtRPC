import { t } from "./trpc";
import { z } from "zod";
import { postValidator } from "$lib/utils/validators";

export const appRouter = t.router({
  hello: t.procedure
    .input(
      z.object({
        greeting: z.string()
      })
    )
    .query(({ input }) => `hello ${input.greeting}`),
  posts: t.procedure.query(({ ctx }) =>
    ctx.prisma.post.findMany({
      include: { comments: true }
    })
  ),
  createPost: t.procedure.input(postValidator).mutation(({ input, ctx }) =>
    ctx.prisma.post.create({
      data: input
    })
  )
});
