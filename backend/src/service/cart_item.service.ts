import { prisma } from "..";
import ApiError from "../errors/api.error";


class cartItemService {
    async addItemToCart(cartId: string, smartphoneId: string) {
        const cart = await prisma.cart.findUnique({
            where: {id: cartId}
        })
        if (!cart) {
            throw ApiError.NotFound("Не найдена корзина с данным id");
        }
        const smartphone = await prisma.smartphone.findUnique({
            where: {id: smartphoneId}
        })
        if (!smartphone) {
            throw ApiError.NotFound("Не найден смартфон с данным id");
        }
        const searchedCartItem = await prisma.cartItem.findFirst({
            where: {
                AND: [
                    {cartId: cartId},
                    {smartphoneId: smartphoneId}
                ]
            }
        })
        if (searchedCartItem) {
            throw ApiError.BadRequest("Данный товар уже есть в корзине");
        }
        const cart_item = await prisma.cartItem.create({
            data: {
                name: smartphone.name,
                cartId: cartId,
                smartphoneId: smartphoneId,
                count: 1
            }
        })
        return cart_item;
    }
    async getItemsByCartId(cartId: string) {
        const items = await prisma.cartItem.findMany({
            where: {cartId: cartId}
        })
        return items;
    }
    async getCartItemBySmartphoneId(cartId: string, smartphoneId: string) {
        const cart_item = await prisma.cartItem.findFirst({
            where: {
                AND: [
                    { cartId: cartId },
                    { smartphoneId: smartphoneId }
                ]
            }
        })
        return cart_item;
    }
}

export default new cartItemService();