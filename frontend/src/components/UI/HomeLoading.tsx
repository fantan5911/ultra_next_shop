import { HomeLoadingCard } from "./HomeLoadingCard";


export function HomeLoading() {
    return (
        <div className="grid grid-cols-4">
            {[...Array(8)].map((_, i) => (
                <HomeLoadingCard key={i} />
            ))}
        </div>
    );
}