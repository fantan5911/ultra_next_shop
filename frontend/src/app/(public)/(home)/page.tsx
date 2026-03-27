import { SmartPhoneCard } from "@/components/SmartPhoneCard";
import { SmartPhoneListResponse } from "@/components/SmartPhoneListResponse";


export default function HomePage() {
  return (
    <div className="flex justify-center w-full min-h-[90%] bg-black">
      <div className="w-[80%]">
        <h1 className="my-8 font-extrabold text-5xl font-mono">Все смартфоны</h1>
        <div className="grid grid-cols-4">
          <SmartPhoneListResponse />
        </div>
      </div>
    </div>
  )
}