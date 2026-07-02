"use client";

import { PAGES } from "@/config/pages.config";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  src: string;
  brand: string;
  name: string;
  price: number;
}

export function UserSmartphoneCard({ id, src, brand, name, price }: Props) {
  const router = useRouter();

  return (
    <div
      className="w-full h-50 rounded-3xl gap-4 flex flex-row items-center
         border border-solid border-white/10 bg-white/5 px-4 py-3 cursor-pointer hover:scale-[101%]
         hover:border-white/30 transition-all duration-200 group hover:shadow-xl hover:shadow-white/10
         "
      onClick={() => router.push(PAGES.SMARTPHONE(id))}
    >
      <Image
        src={src}
        width={50}
        height={50}
        alt="Не удалось загрузить изображение"
        className="w-[15%] h-full rounded-lg border-none"
      />
      <div className="flex flex-col gap-2 flex-1">
        <p
          className="text-[12px]
                 text-white/50 uppercase"
        >
          {brand}
        </p>
        <p className="font-bold text-base">{name}</p>
        <div className="flex w-full justify-between items-center">
          <p className="text-base font-sans">{price} ₽</p>
        </div>
      </div>
    </div>
  );
}
