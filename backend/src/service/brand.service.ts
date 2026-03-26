import { prisma } from "..";
import ApiError from "../errors/api.error";


class brandService {
    async addBrand(name: string) {
        if (!name) {
            throw ApiError.BadRequest('Не указано название бренда');
        }
        const searchedBrand = await prisma.brand.findUnique({
            where: {name: name}
        })
        if (searchedBrand) {
            throw ApiError.BadRequest('Данный бренд уже существует в базе данных');
        }
        const brand = await prisma.brand.create({
            data: {
                name: name
            },
            include: {
                smartphones: true
            }
        })
        return brand;
    }
    async getBrands() {
        const brands = await prisma.brand.findMany();
        return brands;
    }

    async findBrandById(brandId: string) {
        const brand = await prisma.brand.findUnique({
            where: {id: brandId}
        })
        if (!brand) {
            throw ApiError.NotFound('бренд с данным id не найден');
        }
        return brand;
    }
    async deleteBrandById(brandId: string) {
        const brand = await prisma.brand.findUnique({
            where: {id: brandId}
        })
        if (!brand) {
            throw ApiError.NotFound('бренд с данным id не найден');
        }
        const deletedBrand = await prisma.brand.delete({
            where: {id: brandId}
        })
        return deletedBrand;
    }
}

export default new brandService();