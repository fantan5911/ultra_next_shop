import { prisma } from "..";
import ApiError from "../errors/api.error";


class SmartPhoneService {
    async getSmartphones(limit: number = 16, page: number = 1) {
        const smartphones = await prisma.smartphone.findMany({
            take: limit,
            skip: (page - 1) * limit,
        });
        return smartphones;
    }

    async getSmartPhoneById(id: string) {
        const smartphone = await prisma.smartphone.findUnique({
            where: {id: id}
        })
        if (!smartphone) {
            throw ApiError.NotFound("Смартфон не найден");
        }
        return smartphone;
    }
    
    async getSmartphonesByUserId(userId: string) {
        const smartphones = await prisma.smartphone.findMany({
            where: {userId: userId}
        })
        return smartphones;
    }

    async addSmartphone
    (userId: string, name: string, description: string, specifications: string, brandId: string, price: number) {
        const searchedUser = await prisma.user.findUnique({
            where: {id: userId}
        });
        if (!searchedUser) {
            throw ApiError.UnAuthorizedError();
        }
        const searchedBrand = await prisma.brand.findUnique({
            where: {id: brandId}
        })
        if (!searchedBrand) {
            throw ApiError.BadRequest("Нет данного бренда");
        }
        const smartphone = await prisma.smartphone.create({
            data: {
                userId: userId,
                name: name,
                description: description,
                specifications: specifications,
                brandId: brandId,
                price: price
            },
            include: {
                user: true,
                brand: true,
                cart_items: true
            }
        })
        return smartphone;
    }
}

export default new SmartPhoneService();