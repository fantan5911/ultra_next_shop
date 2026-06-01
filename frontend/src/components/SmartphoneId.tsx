import { AddToCart } from "@/components/UI/AddToCart";
import { PAGES } from "@/config/pages.config";
import smartphoneService from "@/service/smartphone.service";
import { ISmartphone } from "@/shared/types/smartphone.types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type Params = {id: string}

export default async function SmartphoneId({params}: {params: Promise<Params>}) {
    const {id} = await params;
    
    let smartphoneData: ISmartphone;
    try {
        smartphoneData = await smartphoneService.getSmartPhoneById(id);
    } catch (error) {
        if (error instanceof Error && error.message === '404') {
            redirect('/404');
        }
        throw error;
    }

    return (
        <div className="flex items-center justify-center w-full min-h-[80vh] px-4 sm:px-6 lg:px-8">
            <div className="w-full lg:w-[90%] xl:w-[78%] grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Изображение */}
                <div className="flex justify-center">
                    <Image
                        src="/test_iphone.png"
                        width={700}
                        height={1000}
                        alt="Смартфон"
                        className="rounded-2xl w-full max-w-md lg:max-w-full object-cover"
                    />
                </div>
                
                {/* Информация о товаре */}
                <div className="flex flex-col h-full">
                    <div className="mb-4">
                        <span className="uppercase text-[11px] rounded-2xl bg-white/15 px-2 py-1 mr-2">
                            {smartphoneData.brand}
                        </span>
                        <Link 
                            href={PAGES.USER(smartphoneData.user)}
                            className="text-white/50 hover:text-white transition-colors duration-150 text-sm sm:text-base"
                        >
                            @{smartphoneData.user}
                        </Link>
                    </div>
                    
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-4 tracking-tighter">
                        {smartphoneData.name}
                    </h1>
                    
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light mb-6 md:mb-8 opacity-70">
                        {smartphoneData.description}
                    </p>
                    
                    <h4 className="text-[10px] uppercase opacity-40 font-bold mb-2">
                        Характеристики:
                    </h4>
                    
                    <p className="text-sm sm:text-base lg:text-lg font-normal opacity-85 mb-6 md:mb-8">
                        {smartphoneData.specifications}
                    </p>
                    
                    <div className="mt-auto">
                        <AddToCart smartphoneId={id} price={smartphoneData.price} />
                    </div>
                </div>
            </div>
        </div>
    )
}