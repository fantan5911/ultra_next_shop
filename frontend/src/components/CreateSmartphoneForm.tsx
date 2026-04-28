'use client'

import { PAGES } from "@/config/pages.config";
import smartphoneService from "@/service/smartphone.service";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { CustomInput } from "./UI/CustomInput";
import { useEffect, useState } from "react";
import { FormError } from "./UI/FormError";
import { BrandSection } from "./UI/BrandSection";
import brandService from "@/service/brand.service";
import { IBrand } from "@/shared/types/brand.types";
import { PriceInput } from "./UI/PriceInput";
import { SubmitButton } from "./UI/SubmitButton";

interface CreateSmartphoneData {
    name: string;
    description: string;
    specifications: string;
    price: number;
    imageUrl: string;
    brandId: string;
    SmartphoneError: string;
}

export function CreateSmartphoneForm() {
    const [name, setName] = useState<string>('');
    const [brands, setBrands] = useState<IBrand[]>([]);
    const [price, setPrice] = useState<number>(0);
    const [description, setDescription] = useState<string>('');
    const [specifications, setSpecifications] = useState<string>('');

    const router = useRouter();
    const formMethods = useForm<CreateSmartphoneData>({
        mode: 'onSubmit'
    });

    useEffect(() => {
        const fetchBrands = async () => {
            const brandsData = await brandService.getAllBrands();
            setBrands(brandsData);
        };
        fetchBrands();
    }, []);

    const onSubmit: SubmitHandler<CreateSmartphoneData> = async (data) => {
        const response = await smartphoneService.addSmartphone
        (data.name, data.description, data.specifications, data.price, data.imageUrl, data.brandId);
        if (response.status === 200) {
            router.push(PAGES.HOME);
        }
        else {
            formMethods.setError("SmartphoneError", {message: response.data?.message});
        }
    }

    const NameError = formMethods.formState.errors.name;

    const SmartphoneError = formMethods.formState.errors.SmartphoneError;

    return (
        <div className="flex justify-center items-center w-full min-h-[90vh]">
            <form onSubmit={formMethods.handleSubmit(onSubmit)} className="w-[30%]">
                <h1 className="text-4xl mb-2 text-white font-extrabold">Публикация смартфона</h1>
                <p className="text-white/40 mb-8">Заполните всю информацию о смартфоне</p>
                <CustomInput
                type="text"
                placeholder="Введите название"
                formMethods={formMethods}
                registerName="name"
                value={name}
                onChange={e => setName(e.target.value)}
                required="Обязательное поле"
                minLength={3}
                minLenghtMessage="Название должно быть не менее 3 символов"
                maxLength={20}
                maxLengthMessage="Название должно быть не более 20 символов"
                />
                {NameError && <FormError error={NameError} />}

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                    <label htmlFor="" className="ml-1">Бренд</label>
                    <BrandSection
                    defaultValue=""
                    formMethods={formMethods}
                    brands={brands}
                    />
                    </div>
                    <div>
                    <label htmlFor="" className="ml-1">Цена</label>
                    <PriceInput
                    formMethods={formMethods}
                    placeholder="Введите цену"
                    value={price}
                    onChange={e => setPrice(Number(e.target.value))}
                    registerName="price"
                    required="Обязательное поле"
                    minPrice={0}
                    maxPrice={100000}
                    />
                    </div>
                </div>
                <label htmlFor="" className="ml-1">Описание</label>
                <textarea
                    placeholder="Введите описание" 
                    className="w-full h-32 p-3 bg-white/5 border border-white/20 rounded-2xl focus:outline-none focus:border-white/60 transition-colors duration-200"
                    {...formMethods.register("description")}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <label htmlFor="" className="ml-1">Характеристики</label>
                <textarea
                    placeholder="Введите характеристики" 
                    className="w-full h-32 p-3 mb-4 bg-white/5 border border-white/20 rounded-2xl focus:outline-none focus:border-white/60 transition-colors duration-200"
                    {...formMethods.register("specifications")}
                    value={specifications}
                    onChange={e => setSpecifications(e.target.value)}
                />
                <SubmitButton>Опубликовать</SubmitButton>
            </form>
        </div>
    )
}