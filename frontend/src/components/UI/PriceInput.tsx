import { ChangeEvent } from "react";
import { UseFormReturn } from "react-hook-form";


interface Props {
    placeholder: string;
    value: string | number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    formMethods: UseFormReturn<any>;
    registerName: string;
    required: string;
    minPrice: number;
    maxPrice: number;
}

export function PriceInput({
    placeholder,
    value,
    onChange, 
    formMethods, 
    registerName,
    minPrice,
    maxPrice,
}: Props) {

    return <input
    {...formMethods.register(registerName, {
        required: "Обязательное поле",
        valueAsNumber: true,
        min: {
            value: minPrice,
            message: `Цена должна быть не менее ${minPrice}`
        },
        max: {
            value: maxPrice,
            message: `Цена должна быть не более ${maxPrice}`
        }
    })}
    type="number"
    placeholder={placeholder}
    value={value || ''}
    onChange={onChange}
    className="w-full px-3 py-3.5 text-lg bg-white/5 rounded-2xl
     outline-none border border-solid border-white/20 focus:border-white/60
     transition-colors duration-200 mb-2.5
    "
    />
}