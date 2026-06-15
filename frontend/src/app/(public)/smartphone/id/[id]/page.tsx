import SmartphoneId from "@/components/SmartphoneId";
import { PageLoading } from "@/components/UI/PageLoading";
import { Suspense } from "react";

type Params = {
  id: string;
}

export const metadata = {
  title: "Смартфон",
  description: "Страница смартфона",
};

export default function SmartphoneIdPage({ params }: { params: Promise<Params> }) {
  return (
    <Suspense fallback={<PageLoading />}>
      <SmartphoneId params={Promise.resolve(params)} />
    </Suspense>
  );
}
