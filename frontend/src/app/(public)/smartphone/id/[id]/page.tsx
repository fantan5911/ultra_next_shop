import { PAGES } from "@/config/pages.config";
import smartphoneService from "@/service/smartphone.service";
import { ISmartphone } from "@/shared/types/smartphone.types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type Params = {id: string}

export default async function SmartphonePage({params}: {params: Promise<Params>}) {
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
        <div className="flex items-center justify-center w-full min-h-[80vh]">
            <div className="w-[78%] grid grid-cols-2">
                <Image
                src="/test_iphone.png"
                width={700}
                height={1000}
                alt="Смартфон"
                className="rounded-2xl"
                />
                <div className="flex flex-col mb-4">
                    <div className="w-full mb-4">
                        <span className="uppercase text-[11px] rounded-2xl bg-white/15 px-2 py-1 mr-2
                        ">{smartphoneData.brand}
                        </span>
                        <Link href={PAGES.USER(smartphoneData.user)}
                         className="text-white/50 underline hover:text-white
                         transition-colors duration-150">
                            @{smartphoneData.user}
                        </Link>
                    </div>
                    <h1 className="text-6xl font-black uppercase mb-4 tracking-tighter">
                        {smartphoneData.name}
                    </h1>
                    <p className="text-2xl font-light mb-8 opacity-70">
                        {smartphoneData.description}
                    </p>
                    <h4 className="text-[10px] uppercase opacity-40 font-bold">Характеристики:</h4>
                    <p className="text-lg font-normal opacity-85">{smartphoneData.specifications}</p>
                </div>
            </div>
        </div>
    )
}
