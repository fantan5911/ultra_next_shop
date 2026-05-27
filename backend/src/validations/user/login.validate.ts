import z from "zod";

export const loginValidate = z.object({
    email: z.string()
    .min(5, 'Почта должна быть не менее 5 символов')
    .max(30, 'Почта должна быть не более 30 символов'),
    password: z.string()
    .min(8, 'Пароль должен быть не менее 8 символов')
    .max(45, 'Пароль должен быть не более 45 символов'),
}) 