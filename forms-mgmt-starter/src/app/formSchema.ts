import { z } from "zod";

export const schema = z.object({
  first: z.string().min(1, {
    message: "First name is required.",
  }),
  last: z.string().min(1, {
    message: "Last name is required.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
});
