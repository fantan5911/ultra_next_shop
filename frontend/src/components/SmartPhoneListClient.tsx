'use client'

import { ISmartphone } from "@/shared/types/smartphone.types";
import { useSmartPhoneStore } from "@/store/smartphone.store";
import { useEffect } from "react";
import { SmartPhoneCard } from "./SmartPhoneCard";

interface SmartPhoneListClientProps {
    smartphones: ISmartphone[];
}

export function SmartPhoneListClient({smartphones}: SmartPhoneListClientProps) {
    const storeSmartphones = useSmartPhoneStore(state => state.smartPhones);
    const setSmartphones = useSmartPhoneStore(state => state.setSmartphones);

    useEffect(() => {
        setSmartphones(smartphones);
    }, [smartphones, setSmartphones]);

    return (
        <div className="grid grid-cols-4">
            {storeSmartphones.map(smartphone => (
                    <SmartPhoneCard
                        key={smartphone.id}
                        id={smartphone.id}
                        alt={smartphone.name}
                        // src={smartphone.imageUrl === null ? smartphone.name : smartphone.imageUrl}
                        src="/test_iphone.png"
                        brand={smartphone.brand}
                        name={smartphone.name}
                        price={smartphone.price}
                    />
            ))}
        </div>
    );
}