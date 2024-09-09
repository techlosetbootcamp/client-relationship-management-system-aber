import { z } from "zod";

export const checkoutValidation = z.object({
  userPhone: z
    .string({
      required_error: "Phone Number is required!",
    })
    .refine(
      (contact) => {
        const phoneRegex = /^03[0-9]{9}$/;
        return phoneRegex.test(contact);
      },
      { message: "Invalid contact number" }
    ),

  address: z
    .string({
      required_error: "total stock is required!",
      invalid_type_error: "total stock must be a number",
    })
    .refine((value) => value !== "Select Address", {
      message: "Please select a valid address.",
    }),

  amount: z
    .number({
      required_error: "Amount is required!",
      invalid_type_error: "Amount must be a number",
    })
    .min(1, { message: "Amount must be greater than 0." }),
});
