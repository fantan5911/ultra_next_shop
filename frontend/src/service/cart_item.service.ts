"use client";

import { $api } from "@/api/axios";
import { AxiosResponse } from "axios";

class CartItemService {
  async getAllItems() {
    try {
      const response = await $api.get(`/cart_item/all`);
      // await new Promise(resolve => setTimeout(resolve, 2000));

      if (response.status === 200) {
        return response;
      }
    } catch (error: any) {
      console.log("Вы не авторизованы", error);
      return error.response;
    }
  }
  async addItemToCart(smartphoneId: string) {
    try {
      const response = await $api.post(`/cart_item/add/${smartphoneId}`, {
        smartphoneId: smartphoneId,
      });

      if (response.status === 200) {
        return response;
      }
    } catch (error: any) {
      console.log(error);
      return error.response;
    }
  }
  async getCartItemBySmartphoneId(smartphoneId: string) {
    try {
      const response = await $api.get(`/cart_item/smartphone/${smartphoneId}`);
      if (response.status === 200) {
        return response;
      }
    } catch (error: any) {
      console.log(error);
      return error.response;
    }
  }

  async deleteCartItem(cartItemId: string) {
    try {
      const response = await $api.delete(`/cart_item/delete/${cartItemId}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error: any) {
      console.log(error);
      return "Произошла ошибка";
    }
  }

  async updateCartItemCount(cartItemId: string, count: number) {
    try {
      const response = await $api.put(`/cart_item/count/update/`, {
        cartItemId: cartItemId,
        count: count,
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error: any) {
      console.log(error);
      return "Произошла ошибка";
    }
  }
}

export default new CartItemService();
