'use client'

import cart_itemService from "@/service/cart_item.service"
import { useEffect, useState } from "react"

export function CartPageClient() {
    const [cartItems, setCartItems] = useState([]);

    const fetchItems = async () => {
        const ItemsResponse = await cart_itemService.getAllItems();
        setCartItems(ItemsResponse);
    }

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <div className="flex justify-center w-full min-h-[90vh]">
            <div className="w-[78%] mt-8 border border-amber-500">
                <h1 className="text-4xl font-bold mb-4 uppercase">корзина</h1>
                <div className="w-full h-full">
                </div>
            </div>
        </div>
    )
}