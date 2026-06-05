'use client'

import { $api } from "@/api/axios";

class CartItemService {
    async getAllItems() {
        try {
            const response = await $api.get(`/cart_item/all`);
            // await new Promise(resolve => setTimeout(resolve, 2000));

            if (response.status === 200) {
                return response.data;
            }
        }
        catch (error: any) {
            console.log("Вы не авторизованы", error);
            return [];
        }
    }
    async addItemToCart(smartphoneId: string) {
        try {
            const response = await $api.post(`/cart_item/add/${smartphoneId}`, {
                smartphoneId: smartphoneId
            });
            
            if (response.status === 200) {
                return response.data;
            }
        }
        catch (error: any) {
            console.log(error);
            return "Произошла ошибка";
        }
    }
    async getCartItemBySmartphoneId(smartphoneId: string) {
        try {
            const response = await $api.get(`/cart_item/smartphone/${smartphoneId}`);
            if (response.status === 200) {
                return response.data;
            }
        }
        catch (error: any) {
            console.log(error);
            return null;
        }
    }

    async deleteCartItem(cartItemId: string) {
        try {
            const response = await $api.delete(`/cart_item/delete/${cartItemId}`);
            if (response.status === 200) {
                return response.data;
            }
        }
        catch (error: any) {
            console.log(error);
            return "Произошла ошибка";
        }
    }
}

export default new CartItemService();