'use client'

import { PAGES } from "@/config/pages.config";
import smartphoneService from "@/service/smartphone.service";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

interface CreateSmartphoneData {
    name: string;
    description: string;
    specifications: string;
    price: number;
    imageUrl: string;
    brand: string;
}

export function CreateSmartphoneForm() {
    const router = useRouter();
    const formMethods = useForm<CreateSmartphoneData>({
        mode: 'onSubmit'
    });

    const onSubmit: SubmitHandler<CreateSmartphoneData> = async (data) => {
        const response = await smartphoneService.addSmartphone
        (data.name, data.description, data.specifications, data.price, data.imageUrl, data.brand);
        if (response.status === 200) {
            router.push(PAGES.HOME);
        }
    }

    return (
        <div className="w-full min-h-[90vh]">
            <form>
            </form>
        </div>
    )
}