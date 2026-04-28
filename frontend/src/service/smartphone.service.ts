import { api } from "@/api/axios";
import { API_URL } from "@/constants/api.url";
import { ISmartphone } from "@/shared/types/smartphone.types";


class SmartPhoneService {
    async addSmartphone
    (name: string,
    description: string,
    specifications: string, 
    price: number, 
    imageUrl: string,
    brandId: string
    ) {
        try {
            const response = await api.post('/smartphones/add', {
                name: name,
                description: description,
                specifications: specifications,
                price: price,
                imageUrl: imageUrl,
                brandId: brandId
            });
            if (response?.status === 200) {
                return response;
            }
        }
        catch (error: any) {
            return error.response;
        }
    }

    async getSmartphones(): Promise<ISmartphone[]> {
    try {
        const response = await fetch(`${API_URL}/smartphones`, {
            next: {
                revalidate: 40
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch smartphones');
        }
        
        return await response.json();
    } catch (error) {
        console.error("Ошибка при загрузке смартфонов:", error);
        return [];
        }
    }

    async getSmartPhoneById(smartPhoneid: string): Promise<ISmartphone> {
        const response = await fetch(`${API_URL}/smartphones/id/${smartPhoneid}`, {
            next: {
                revalidate: 40
            }
        })
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('404');
            }
            throw new Error('Failed to fetch smartphone');
        }
        
        return await response.json();
    }
}

export default new SmartPhoneService();