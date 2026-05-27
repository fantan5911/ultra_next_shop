import { API_URL } from "@/constants/api.url";


class BrandService {
    async getAllBrands() {
        const response = await fetch(`${API_URL}/brands`, {
            next: {revalidate: 30}
        });
        return await response.json();
    }
}

export default new BrandService();