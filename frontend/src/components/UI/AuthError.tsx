import { FieldError } from "react-hook-form";

//нужно для отображения ошибки если неверный логин или пароль
interface Props {
    error: FieldError;
}

export function AuthError({error}: Props) {
    return (
        <div className="w-full flex items-center justify-center">
            <p className="text-red-500 font-semibold text-lg">{error.message}</p>
        </div>
    )
}