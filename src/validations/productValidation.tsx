import { z } from "zod";

export const productValidation = z.object({
  productName: z.string({
    required_error: "product name is required!",
  }),

  totalStock: z.number({
    required_error: "total stock is required!",
    invalid_type_error: "total stock must be a number",
  }),
  price: z.number({
    required_error: "sales price is required!",
    invalid_type_error: "sales price must be a number",
  }),
  purchasedPrice: z.number({
    required_error: "purchased price is required!",
    invalid_type_error: "purchased price must be a number",
  }),
  category: z.enum(["HomeGoods", "Potterific", "Flower Child", "Wood Co."], {
    required_error: "category is required!",
    invalid_type_error: "category is not selected",
  }),
});
