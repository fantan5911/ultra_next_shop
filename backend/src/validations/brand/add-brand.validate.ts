import z from "zod";

export const addBrandValidate = z.object({
    name: z.string()
    .min(2, 'Название бренда должно быть не менее 2')
    .max(15, 'Название бренда должно быть не более 15 символов')
})