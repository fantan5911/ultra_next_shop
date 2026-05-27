import z from "zod";

export const addItemValidate = z.object({
    smartphoneId: z.string().min(5).max(90)
})