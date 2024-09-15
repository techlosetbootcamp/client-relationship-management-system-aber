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

const changePasswordValidation = z.object({
  currentPassword: z
    .string({
      required_error: "Current Password is required!",
    })
    .min(6, "Current Password must be at least 6 characters!"),

  newPassword: z
    .string({
      required_error: "New Password is required!",
    })
    .min(6, "New Password must be at least 6 characters!"),
  confirmNewPassword: z
    .string({
      required_error: "Confirm New Password is required!",
    })
    .min(6, "Confirm New Password must be at least 6 characters!"),
});

const updateUserValidation = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),

  name: z
    .string({ required_error: "username is required" })
    .min(4, "Username must be 4 or more characters long"),
});

export const authValidation = {
  signUpValidation,
  loginValidation,
  forgetPasswordValidation,
  resetPasswordValidation,
  changePasswordValidation,
  updateUserValidation,
};
