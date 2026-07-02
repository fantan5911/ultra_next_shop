import z from "zod";

export const updateCountValidate = z.object({
  cartItemId: z.string(),
  count: z.number(),
});
