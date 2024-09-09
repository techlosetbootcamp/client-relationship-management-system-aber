import { z } from "zod";

export const documentValidation = z.object({
  version: z
    .string({
      required_error: "version is required!",
    })
    .min(1, "version is required"),
  status: z.enum(["Active", "Archive"], {
    required_error: "status is required!",
    invalid_type_error: "Statusis not selected",
  }),
});
