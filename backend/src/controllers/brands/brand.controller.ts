import { NextFunction, Request, Response } from "express";
import brandService from "../../service/brand.service";


class brandController {
    async addBrand(req: Request, res: Response, next: NextFunction) {
        try {
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