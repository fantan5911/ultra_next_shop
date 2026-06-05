'use client'

import cart_itemService from "@/service/cart_item.service"
import { useCartItemStore } from "@/store/cart_item.store"
import { useEffect, useState } from "react"
import { CartItemCard } from "./UI/CartItemCard";
import { CartItemCardLoader } from "./UI/CartItemCardLoader";
import { PageLoading } from "./UI/PageLoading";

export function CartPageClient() {
    const [loading, setLoading] = useState<boolean>(false);
    const loaderItems = new Array(8).fill(null);
    const cartItems = useCartItemStore((state) => state.cartItems);
    const setCartItems = useCartItemStore((state) => state.setCartItems);

    const fetchItems = async () => {
        const ItemsResponse = await cart_itemService.getAllItems();
        setCartItems(ItemsResponse);
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        fetchItems();
    }, []);

    if (loading) {
        return <PageLoading />
    }

    return (
        <div className="flex justify-center w-full min-h-[90vh]">
            <div className="flex flex-col w-[95%] lg:w-[78%] mt-8">
                <h1 className="text-4xl font-bold mb-4 uppercase">корзина</h1>
                    <div className="flex sm:flex-col lg:flex-row gap-6 w-full h-full">
                        {!cartItems.length || loading ? (
                            <div className="flex flex-col items-center justify-center w-full min-h-[70vh] gap-6">
                                <p className="text-3xl font-bold">Ваша корзина пуста</p>
                            </div>
                        ) : (
                        <div className="flex flex-col md:flex-row lg:flex-row gap-20 h-full w-full">
                        <div className="flex flex-col md:w-[80%] lg:w-[65%] gap-4">
                            {cartItems.map((cartItem) => (
                                <CartItemCard
                                    key={cartItem.id}
                                    cartItem={cartItem}
                                />
                            ))}
                        </div>
                        
                        <div className="px-5 py-5 sm:flex sm:w-full md:w-[40%] lg:w-[25%] bg-white/5 h-[20%]
                        rounded-2xl flex flex-col gap-5">
                            {cartItems.length > 0 && (
                                <p className="mt-4 text-lg font-semibold">
                                    Итого: {cartItems.reduce((total, item) => total + item.price * item.count, 0)} ₽
                                </p>
                            )}
                            <button className="text-black border border-solid
                             border-white bg-white hover:bg-black hover:text-white cursor-pointer
                              transition-colors duration-100
                             font-bold py-2 px-4 rounded-2xl">
                            Оформить заказ
                            </button>
                        </div>
                    </div>
                    )}
                    </div>
            </div>
        </div>
    )
}