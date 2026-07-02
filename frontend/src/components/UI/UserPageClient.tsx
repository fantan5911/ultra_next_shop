"use client";

import smartphoneService from "@/service/smartphone.service";
import { ISmartphone } from "@/shared/types/smartphone.types";
import { useEffect, useState } from "react";
import { UserSmartphoneCard } from "./UserSmartphoneCard";
import { LoaderCircle } from "lucide-react";

interface Props {
  username: string;
}

export function UserPageClient({ username }: Props) {
  const [smartphones, setSmartphones] = useState<ISmartphone[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setLoading(true);
    fetchSmartphonesByUserId();
  }, []);

  const fetchSmartphonesByUserId = async () => {
    const response = await smartphoneService.getSmartphonesByUsername(username);
    setSmartphones(response);
    setLoading(false);
  };

  if (!loading && !smartphones) {
    return (
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold">Нет объявлений</h1>
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col gap-3">
      {loading ? (
        <div className="flex justify-center w-full h-[50%]">
          <LoaderCircle size={40} className="animate-spin" />
        </div>
      ) : (
        smartphones.map((smartphone) => (
          <UserSmartphoneCard
            key={smartphone.id}
            id={smartphone.id}
            src={smartphone.imageUrl || "/test_samsung_a55.png"}
            name={smartphone.name}
            price={smartphone.price}
            brand={smartphone.brand}
            // alt={smartphone.name}
          />
        ))
      )}
    </div>
  );
}
