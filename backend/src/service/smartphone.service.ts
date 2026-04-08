import { prisma } from "..";
import ApiError from "../errors/api.error";


class SmartPhoneService {
    async getSmartphones(limit: number = 8, page: number = 1) {
        const smartphones = await prisma.smartphone.findMany({
            take: limit,
            skip: (page - 1) * limit,
            select: {
                id: true,
                name: true,
                description: true,
                specifications: true,
                price: true,
                imageUrl: true,
                user: {
                    select: {
                        username: true
                    }
                },
                brand: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return smartphones.map(smartphone => ({
            ...smartphone,
            user: smartphone.user.username,
            brand: smartphone.brand.name
        }));
    }

    async getSmartPhoneById(id: string) {
        const smartphone = await prisma.smartphone.findUnique({
            where: { id: id },
            select: {
                id: true,
                name: true,
                description: true,
                specifications: true,
                price: true,
                imageUrl: true,
                user: {
                    select: {
                        username: true
                    }
                },
                brand: {
                    select: {
                        name: true
                    }
                },
            }
        });
        if (!smartphone) {
            throw ApiError.NotFound("Смартфон не найден");
        }
        return {
            ...smartphone,
            user: smartphone.user.username,
            brand: smartphone.brand.name
        };
    }
    
    async getSmartphonesByUserId(userId: string) {
        const smartphones = await prisma.smartphone.findMany({
            where: { userId: userId },
            select: {
                id: true,
                name: true,
                description: true,
                specifications: true,
                price: true,
                imageUrl: true,
                user: {
                    select: {
                        username: true
                    }
                },
                brand: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return smartphones.map(smartphone => ({
            ...smartphone,
            user: smartphone.user.username,
            brand: smartphone.brand.name
        }));
    }

    async addSmartphone
    (userId: string, name: string, description: string, specifications: string, imageUrl: string, brandId: string, price: number) {
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
            imageUrl: imageUrl,
            brandId: brandId,
            price: price
        },
        select: {
            id: true,
            name: true,
            description: true,
            specifications: true,
            price: true,
            imageUrl: true,
            user: {
                select: {
                    username: true
                }
            },
            brand: {
                select: {
                    name: true
                }
            }
        }
    });
        return {
            ...smartphone,
            user: smartphone.user.username,
            brand: smartphone.brand.name
        };
    }
}

export default new SmartPhoneService();