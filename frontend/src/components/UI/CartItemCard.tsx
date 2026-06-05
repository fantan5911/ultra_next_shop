'use client'

import { PAGES } from "@/config/pages.config";
import cart_itemService from "@/service/cart_item.service";
import { ICartItem } from "@/shared/types/cart_item.types";
import { useCartItemStore } from "@/store/cart_item.store";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


interface Props {
    cartItem: ICartItem;
}

export function CartItemCard({ cartItem }: Props) {
    const cartItems = useCartItemStore((state) => state.cartItems);
    const setCartItems = useCartItemStore((state) => state.setCartItems);
    const [count, setCount] = useState<number>(cartItem.count);

    const deleteItem = async (cartItemId: string) => {
        await cart_itemService.deleteCartItem(cartItemId);
        setCartItems(cartItems.filter(item => item.id !== cartItemId));
    }

    return (
        <div className="flex justify-between w-full h-[15%] bg-white/5
        rounded-xl p-4 border border-white/10
        ">
            <div className="flex items-center gap-4 hover:text-underline transition-colors duration-300">
                <Image src="/test_iphone.png" alt="Изображение товара" width={100} height={100} className="rounded-lg object-cover" />
                <div className="flex flex-col gap-2">
                    <Link href={PAGES.SMARTPHONE(cartItem.smartphoneId)}
                    className="text-xl flex items-center hover:text-white/50 transition-colors duration-100">
                        {cartItem.name}
                    </Link>
                    <div className="flex items-center gap-4">
                    <button
                     className="px-3.5 py-1 bg-white/10 rounded hover:bg-white/20 transition-colors duration-200"
                     onClick={() => setCount(Math.max(1, count - 1))}>-</button>
                    <p>{count}</p>
                    <button
                     className="px-3.5 py-1 bg-white/10 rounded hover:bg-white/20 transition-colors duration-200"
                     onClick={() => setCount(count + 1)}
                    >
                        +
                    </button>
                </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
                <p className="text-lg font-bold">{cartItem.price} ₽</p>
                <button className="text-sm text-white/50
                 hover:text-white hover:cursor-pointer transition-colors duration-100"
                 onClick={() => deleteItem(cartItem.id)}
                >
                    Удалить
                </button>
            </div>
        </div>
    )
}