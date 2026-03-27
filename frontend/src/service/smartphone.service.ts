import { api } from "@/api/axios";
import { API_URL } from "@/constants/api.url";
import { ISmartphone } from "@/shared/types/smartphone.types";
import { AxiosResponse } from "axios";


class SmartPhoneService {
    async getSmartphones(): Promise<ISmartphone[]> {
    try {
        const response = await fetch(`${API_URL}/smartphones`, {
            next: {
                revalidate: 40 // ISR кэширование
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch smartphones');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Ошибка при загрузке смартфонов:", error);
        return [];
        }
    }

    async getSmartPhoneById(smartPhoneid: string) {
        const response = await fetch(`${API_URL}/smartphones/id/${smartPhoneid}`, {
            next: {
                revalidate: 40
            }
        })
        return await response.json();
    }
}

export default new SmartPhoneService();