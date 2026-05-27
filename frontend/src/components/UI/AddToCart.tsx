'use client'

import authService from "@/service/auth.service";
import cart_itemService from "@/service/cart_item.service";
import { useAuthStore } from "@/store/auth.store";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";


interface Props {
    smartphoneId: string;
    price: number;
}


export function AddToCart({smartphoneId, price}: Props) {
    const isAuth = useAuthStore(state => state.isAuth);
    const setIsAuth = useAuthStore(state => state.setIsAuth);
    const [inCart, setInCart] = useState<boolean>(false);

    useEffect(() => {
        if (!isAuth) return;

        const checkItemInCart = async () => {
            const response = await cart_itemService.getCartItemBySmartphoneId(smartphoneId);
            if (response) {
                setInCart(true);
            }
        }
        checkItemInCart();
    }, [smartphoneId, isAuth])

    if (!isAuth) {
        return <></>;
    }

    const addItemToCart = async () => {
        const response = await cart_itemService.addItemToCart(smartphoneId);
        if (response) {
            setInCart(true);
        }
    }

    return (
        <div className="px-8 py-5 flex flex-col sm:flex-row items-center justify-between bg-white/5 mt-auto rounded-2xl">
            <div>
                <p className="font-serif text-white/70">стоимость</p>
                <p className="text-2xl font-extrabold">{price} ₽</p>
            </div>
            {inCart ? (
                <Check color="white" size={32} />
            ) : (
            <button className="text-sm text-black font-semibold px-7 py-2 uppercase
             bg-white rounded-2xl cursor-pointer hover:bg-white/90 transition-colors duration-200"
             onClick={addItemToCart}
             >
                В КОРЗИНУ
            </button>
            )}
        </div>
    )
}