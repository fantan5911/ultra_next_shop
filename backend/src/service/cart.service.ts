import { NextFunction, Request, Response } from "express";
import { prisma } from "..";
import ApiError from "../errors/api.error";


class cartService {
    async createCart(userId: string) {
        const cart = await prisma.cart.create({
            data: {
                userId: userId
            }
        })
        return cart;
    }
    async findCartById(cartId: string) {
        const searchedCart = await prisma.cart.findUnique({
            where: {id: cartId}
        })
        if (!searchedCart) {
            throw ApiError.NotFound('Корзина с данным id не найдена');
        }
        return searchedCart;
    }
    async findCartByUserId(userId: string) {
        const searchedCart = await prisma.cart.findUnique({
            where: {id: userId}
        })
        if (!searchedCart) {
            throw ApiError.NotFound('Корзина с данным userId не найдена');
        }
        return searchedCart;
    }
}

export default new cartService();