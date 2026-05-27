'use client'

import { PAGES } from "@/config/pages.config";
import Image from "next/image";
import { useRouter } from "next/navigation";


interface Props {
    id: string;
    src: string;
    brand: string;
    name: string;
    price: number;
    alt: string;
}

export function SmartPhoneCard({id, src, brand, name, price, alt}: Props) {
    const router = useRouter();

    return (
        <div className="w-[95%] rounded-3xl gap-3 flex flex-col items-center
         border border-solid border-white/10 bg-white/5 pb-4 cursor-pointer hover:scale-[102%]
         hover:border-white/30 transition-all duration-200 group mb-4
         "
         onClick={() => router.push(PAGES.SMARTPHONE(id))}
         >
            <Image src={src}
            width={400}
            height={400}
            alt={alt}
            className="w-full rounded-t-3xl border-none"
            />
            <div className="mt-2 flex flex-col gap-2 w-[85%]">
                <p className="text-[12px]
                 text-white/50 uppercase">{brand}</p>
                <p className="font-bold text-lg">{name}</p>
                <div className="flex w-full justify-between">
                    <p className="text-lg font-sans">{price} ₽</p>
                    <p className="text-lg group-hover:translate-x-2
                    transition-transform duration-500
                    ">➔</p>
                </div>
            </div>
        </div>
    )
}