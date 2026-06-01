import SmartphoneId from "@/components/SmartphoneId";
import { PageLoading } from "@/components/UI/PageLoading";
import { Suspense } from "react";


export default function SmartphoneIdPage({params}: {params: {id: string}}) {
    return (
        <Suspense fallback={<PageLoading />}>
            <SmartphoneId params={Promise.resolve(params)} />
        </Suspense>
    );
}