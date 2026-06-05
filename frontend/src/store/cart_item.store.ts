import { ICartItem } from "@/shared/types/cart_item.types";
import { create } from "zustand";


interface CartItemStore {
    cartItems: ICartItem[];
    setCartItems: (cartItems: ICartItem[]) => void;
}

export const useCartItemStore = create<CartItemStore>((set) => ({
    cartItems: [],
    setCartItems: (cartItems) => set({ cartItems }),
}));