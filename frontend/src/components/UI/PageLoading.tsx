import { LoaderCircle } from "lucide-react"

export function PageLoading() {
    return (
        <div className="flex flex-col gap-3 text-4xl items-center justify-center w-full min-h-[90vh]">
            <LoaderCircle size={40} className="animate-spin" />
            <h1 className="font-bold animate-pulse">Загрузка...</h1>
        </div>
    )
}

