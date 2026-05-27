import ApiError from "@/api/error";
import { API_URL } from "@/constants/api.url";


class UserService {
    async getUserByName(username: string) {
        const response = await fetch(`${API_URL}/users/name/${username}`, {
            next: {
                revalidate: 40
            }
        });

        const error = await ApiError.NotFound(response, 'User not found');
        if (error) {
            throw error;
        }
        return await response.json();
    }
}

export default new UserService();