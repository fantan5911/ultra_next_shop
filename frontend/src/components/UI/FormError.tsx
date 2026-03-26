import { FieldError } from "react-hook-form";



interface Props {
    error: FieldError;
}


export function FormError({error}: Props) {
    return (
        <div className="w-[95%] flex items-start font-semibold text-red-500">
            <p>{error.message}</p>
        </div>
    )
}