import axios from "axios";
import { API_URL } from "../constants/api.url";

class UserService {
    async getUsers() {
        try {
            const response = await axios.get(`${API_URL}/users`);
            return response.data;
        } 
        catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }
    async searchUsers(search: string) {
        try {
            const response = await axios.get(`${API_URL}/users/search/${search}`);
            return response.data;
        }
        catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }

    async banUserById(userId: string, isBanned: boolean) {
        try {
            const response = await axios.put(`${API_URL}/users/ban`, {
                userId: userId,
                isBanned: isBanned
            });
            return response.data;
        }
        catch (error) {
            console.error('Error banning user:', error);
            throw error;
        }
    }   
}

export default new UserService();