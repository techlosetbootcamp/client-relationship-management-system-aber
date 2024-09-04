import { z } from "zod";

const signUpValidation = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),

  username: z
    .string({ required_error: "username is required" })
    .min(4, "Username must be 4 or more characters long"),
  password: z
    .string({
      required_error: "Password is required!",
    })
    .min(6, "Password must be at least 6 characters!"),
  confirmPassword: z.string({
    required_error: "Confirm Password is required!",
  }),
});

const loginValidation = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),

  password: z
    .string({
      required_error: "Password is required!",
    })
    .min(6, "Password must be at least 6 characters!"),
});

const forgetPasswordValidation = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
});

const resetPasswordValidation = z.object({
  password: z
    .string({
      required_error: "Password is required!",
    })
    .min(6, "Password must be at least 6 characters!"),
  confirmPassword: z.string({
    required_error: "Confirm Password is required!",
  }),
});

export const authValidation = {
  signUpValidation,
  loginValidation,
  forgetPasswordValidation,
  resetPasswordValidation,
};
