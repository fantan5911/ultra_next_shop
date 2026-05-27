import z from "zod";

export const brandIdValidate = z.object({
    id: z.string()
})