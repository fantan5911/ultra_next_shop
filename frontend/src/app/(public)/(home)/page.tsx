import { HomeLoading } from "@/components/UI/HomeLoading";
import { lazy, Suspense } from "react";

const SmartPhoneListResponse = lazy(() => import("@/components/SmartPhoneListResponse")
  .then(module => ({ default: module.SmartPhoneListResponse })));



export const metadata = {
    title: 'Mono - интернет-магазин смартфонов',
    description: 'Главная страница интернет-магазина смартфонов Mono',
}

export default function HomePage() {
  return (
    <div className="flex justify-center w-full min-h-[90%] bg-black">
      <div className="w-[80%]">
        <h1 className="my-8 font-extrabold text-5xl font-mono">Все смартфоны</h1>
        <Suspense fallback={<HomeLoading />}>
          <SmartPhoneListResponse />
        </Suspense>
      </div>
    </div>
  )
}