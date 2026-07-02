import { ca } from "zod/v4/locales";
import { prisma } from "..";
import ApiError from "../errors/api.error";

class cartItemService {
  async addItemToCart(cartId: string, smartphoneId: string) {
    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
    });
    if (!cart) {
      throw ApiError.NotFound("Не найдена корзина с данным id");
    }
    const smartphone = await prisma.smartphone.findUnique({
      where: { id: smartphoneId },
    });
    console.log(smartphone);
    if (!smartphone) {
      throw ApiError.NotFound("Не найден смартфон с данным id");
    }
    const searchedCartItem = await prisma.cartItem.findFirst({
      where: {
        AND: [{ cartId: cartId }, { smartphoneId: smartphoneId }],
      },
    });
    if (searchedCartItem) {
      throw ApiError.BadRequest("Данный товар уже есть в корзине");
    }
    const cart_item = await prisma.cartItem.create({
      data: {
        name: smartphone.name,
        price: smartphone.price,
        cartId: cartId,
        smartphoneId: smartphoneId,
        count: 1,
      },
    });
    return cart_item;
  }
  async getItemsByCartId(cartId: string) {
    const items = await prisma.cartItem.findMany({
      where: { cartId: cartId },
    });
    return items;
  }
  async getCartItemBySmartphoneId(cartId: string, smartphoneId: string) {
    const cart_item = await prisma.cartItem.findFirst({
      where: {
        AND: [{ cartId: cartId }, { smartphoneId: smartphoneId }],
      },
    });
    if (!cart_item) {
      throw ApiError.NotFound("Товар не найден в корзине");
    }
    return cart_item;
  }

  async deleteCartItem(cartItemId: string) {
    const cart_item = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
    });
    if (!cart_item) {
      throw ApiError.NotFound("Не найден элемент корзины с данным id");
    }
    await prisma.cartItem.delete({
      where: { id: cartItemId },
    });
  }

  async updateCount(cartItemId: string, count: number) {
    const cart_item = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
    });
    if (!cart_item) {
      throw ApiError.NotFound("Не найден элемент корзины с данным id");
    }
    const updatedCartItem = await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { count: count },
    });
    return updatedCartItem;
  }
}

export default new cartItemService();
