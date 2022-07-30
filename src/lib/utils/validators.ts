import { z } from "zod";

export const postValidator = z.object({
  title: z.string().min(1)
});

export type PostValidator = z.infer<typeof postValidator>;
