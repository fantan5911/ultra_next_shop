import z from "zod";

export const loginValidate = z.object({
  email: z
    .string()
    .min(5, "Почта должна быть не менее 5 символов")
    .max(70, "Почта должна быть не более 70 символов"),
  password: z
    .string()
    .min(8, "Пароль должен быть не менее 8 символов")
    .max(80, "Пароль должен быть не более 80 символов"),
});
