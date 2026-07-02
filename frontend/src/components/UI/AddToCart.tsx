"use client";

import { PAGES } from "@/config/pages.config";
import authService from "@/service/auth.service";
import cart_itemService from "@/service/cart_item.service";
import { useAuthStore } from "@/store/auth.store";
import { Check, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  smartphoneId: string;
  price: number;
}

export function AddToCart({ smartphoneId, price }: Props) {
  const router = useRouter();

  const isAuth = useAuthStore((state) => state.isAuth);
  const setIsAuth = useAuthStore((state) => state.setIsAuth);
  const [inCart, setInCart] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [banned, setIsBanned] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    const checkItemInCart = async () => {
      const response =
        await cart_itemService.getCartItemBySmartphoneId(smartphoneId);
      if (response.status === 200 && response.data) {
        setInCart(true);
      } else if (response.status === 403) {
        setIsBanned(true);
      }
      setLoading(false);
    };
    if (isAuth) {
      checkItemInCart();
    } else {
      setLoading(false);
    }
  }, [smartphoneId, isAuth]);

  const addItemToCart = async () => {
    const response = await cart_itemService.addItemToCart(smartphoneId);

    if (response.status === 403) {
      setIsBanned(true);
      router.push(PAGES.BANNED);
    }

    if (response != undefined && response.status === 200) {
      setInCart(true);
    }
  };

  return (
    <div className="px-8 py-5 flex flex-col sm:flex-row items-center justify-between bg-white/5 mt-auto rounded-2xl">
      <div>
        <p className="font-serif text-white/70">стоимость</p>
        <p className="text-2xl font-extrabold">{price} ₽</p>
      </div>
      {inCart ? (
        <Check color="white" size={32} />
      ) : (
        <>
          {!isAuth ? (
            <>
              {loading ? (
                <LoaderCircle size={30} className="animate-spin" />
              ) : (
                <Link
                  href={PAGES.LOGIN}
                  className="text-sm text-black font-semibold px-7 py-2 uppercase
                bg-white rounded-2xl cursor-pointer hover:bg-white/90 transition-colors duration-200"
                >
                  В КОРЗИНУ
                </Link>
              )}
            </>
          ) : (
            <>
              {loading ? (
                <LoaderCircle size={30} className="animate-spin" />
              ) : (
                <>
                  {banned ? (
                    <></>
                  ) : (
                    <button
                      className="text-sm text-black font-semibold px-7 py-2 uppercase
                  bg-white rounded-2xl cursor-pointer hover:bg-white/90 transition-colors duration-200"
                      onClick={addItemToCart}
                    >
                      В КОРЗИНУ
                    </button>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
