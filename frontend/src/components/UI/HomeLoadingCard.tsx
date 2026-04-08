//короче не мешай сам напишу

export function HomeLoadingCard() {
    return (
        <div className="w-[95%] rounded-3xl gap-3 flex flex-col items-center
        border border-solid border-white/10 bg-white/5 pb-4 cursor-pointer hover:scale-[102%]
        hover:border-white/30 transition-all duration-200 group mb-4">
            <div className="bg-white/10 w-full h-90 animate-pulse rounded-t-3xl" />

            <div className="mt-2 flex flex-col gap-2 w-[85%]">
                <div className="bg-white/10 w-[70%] h-5 animate-pulse rounded-3xl" />
                <div className="bg-white/10 w-[60%] h-5 animate-pulse rounded-3xl" />
                <div className="bg-white/10 w-[50%] h-5 animate-pulse rounded-3xl" />
            </div>
        </div>
    )
}