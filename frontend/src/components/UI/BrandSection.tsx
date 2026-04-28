import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { IBrand } from "@/shared/types/brand.types";
import { Option } from "./Option";

interface Props {
  defaultValue?: string;
  formMethods: UseFormReturn<any>;
  brands: IBrand[];
}

export function BrandSection({
  defaultValue = "",
  formMethods,
  brands,
}: Props) {
  const { setValue, register } = formMethods;

  const [open, setOpen] = useState(false);
  const [selectedBrandName, setSelectedBrandName] = useState(defaultValue);

  const handleSelect = (brand: IBrand) => {
    setSelectedBrandName(brand.name);
    setValue("brandId", brand.id, {
      shouldValidate: true,
    });
    setOpen(false);
  };

  return (
    <div className="relative w-full">
      <input
        type="hidden"
        {...register("brandId", {
          required: "Выберите бренд",
        })}
      />

      <div
        onClick={() => setOpen((v) => !v)}
        className="w-full px-3 py-3.5 text-lg bg-white/5 rounded-2xl
        outline-none border border-solid border-white/20 hover:border-white/60 cursor-pointer
        transition-colors duration-200 mb-2.5"
      >
        {selectedBrandName || "Выберите бренд"}
      </div>

      {open && (
        <ul className="absolute z-10 mt-2 w-full max-h-60 overflow-y-auto rounded-2xl border border-white/20 bg-black/90 backdrop-blur-md">
          {brands.map((brand) => (
            <Option
              key={brand.id}
              value={brand.name}
              onClick={() => handleSelect(brand)}
              brandId={brand.id}
            >
              {brand.name}
            </Option>
          ))}
        </ul>
      )}
    </div>
  );
}