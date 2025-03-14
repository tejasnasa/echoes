import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must be at least 4 characters long." })
    .trim(),
  fullname: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters long." }),
  email: z.string().email({ message: "Enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-zA-Z]/, {
      message: "Password must contain at least one letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    })
    .trim(),
});

export const loginSchema = z.object({
  emailOrUsername: z
    .string()
    .min(4, { message: "Enter a valid username or email" })
    .trim(),
  password: z.string().min(8, { message: "Enter a valid password" }).trim(),
});

export const postSchema = z
  .object({
    text: z.string(),
    images: z.string().array(),
    postAboveId: z.string().optional(),
  })
  .refine((data) => data.text.trim().length > 0 || data.images.length > 0, {
    message: "Red",
  });
