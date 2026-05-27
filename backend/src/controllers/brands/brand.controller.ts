import { NextFunction, Request, Response } from "express";
import brandService from "../../service/brand.service";
import { addBrandValidate } from "../../validations/brand/add-brand.validate";
import { brandIdValidate } from "../../validations/brand/brand-id-validate";
import ApiError from "../../errors/api.error";


class brandController {
    async addBrand(req: Request, res: Response, next: NextFunction) {
        try {
            const validation = addBrandValidate.safeParse(req.body);
            if (!validation.success) {
                throw ApiError.BadRequest('Не указано название бренда');
            }
            const {name} = req.body;
            const brand = await brandService.addBrand(name);
            return res.status(200).json(brand);
        }
        catch (e) {
            next(e);
        }
    }
    async getBrands(req: Request, res: Response, next: NextFunction) {
        try {
            const brands = await brandService.getBrands();
            return res.status(200).json(brands);
        }
        catch (e) {
            next(e);
        }
    }
    async findBrandById(req: Request, res: Response, next: NextFunction) {
        try {
            const validation = brandIdValidate.safeParse(req.params);
            if (!validation.success) {
                return next(ApiError.BadRequest('Не указан id'));
            }
            const id = req.params.id as string;
            const brand = await brandService.findBrandById(id);
            return res.status(200).json(brand);
        }
        catch (e) {
            next(e);
        }
    }
    async deleteBrandById(req: Request, res: Response, next: NextFunction) {
        try {
            const validation = brandIdValidate.safeParse(req.params);
            if (!validation.success) {
                return next(ApiError.BadRequest('Не указан id'));
            }
            const id = req.params.id as string;
            const brand = await brandService.deleteBrandById(id);
            return res.status(200).json(brand);
        }
        catch (e) {
            next(e);
        }
    }
}

export default new brandController();