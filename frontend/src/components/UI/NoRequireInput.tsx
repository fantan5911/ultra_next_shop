import { ChangeEvent } from "react";
import { UseFormReturn } from "react-hook-form";


interface Props {
    type: string;
    placeholder: string;
    value: string | number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    formMethods: UseFormReturn<any>;
    registerName: string;
}

export function CustomInput({
    type, 
    placeholder,
    value, 
    onChange, 
    formMethods, 
    registerName,
}: Props) {

    return <input
    {...formMethods.register(registerName)}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full px-3 py-3.5 text-lg bg-white/5 rounded-2xl
     outline-none border border-solid border-white/20 focus:border-white/60
     transition-colors duration-200 mb-2.5
    "
    />
}