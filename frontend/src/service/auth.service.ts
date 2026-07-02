import { $api } from "@/api/axios";
import { API_URL } from "@/constants/api.url";
import { AuthResponse } from "@/shared/response/auth.response";
import axios from "axios";

const isBrowser = typeof window !== "undefined";

async function getCookies() {
  if (!isBrowser) return null;
  const Cookies = (await import("js-cookie")).default;
  return Cookies;
}

class AuthService {
  async Register(
    email: string,
    username: string,
    password: string,
    acceptedTerms: boolean,
  ) {
    try {
      const response = await $api.post(`/users/register`, {
        email: email,
        username: username,
        password: password,
        accepted_terms: acceptedTerms,
      });
      console.log(response);
      if (response.status == 200) {
        return response;
      }

      return response;
    } catch (error: any) {
      console.log(error.response);
      return error.response;
    }
  }
  async Login(email: string, password: string) {
    try {
      const response = await $api.post<AuthResponse>(`/users/login`, {
        email: email,
        password: password,
      });
      console.log(response);
      if (response.status === 200 && response?.data.accessToken) {
        const Cookies = await getCookies();
        Cookies?.set("accessToken", response?.data.accessToken);
      }
      return response;
    } catch (error: any) {
      console.log(error.response);
      return error.response;
    }
  }

  async Logout() {
    try {
      const response = await $api.get("/users/logout");
      if (response.status === 200) {
        const Cookies = await getCookies();
        if (Cookies) {
          Cookies.remove("accessToken");
        }
        return true;
      }
    } catch (error: any) {
      console.log(error.response);
      const Cookies = await getCookies();
      if (Cookies) {
        Cookies.remove("accessToken");
      }
    }
  }

  async checkAuth() {
    try {
      const Cookies = await getCookies();
      if (!Cookies) {
        return false;
      }

      if (Cookies.get("accessToken")) {
        return true;
      }

      const response = await $api.get(`/users/refresh`, {
        timeout: 3000,
      });

      if (response.data?.accessToken) {
        Cookies.set("accessToken", response.data.accessToken);
        return true;
      }

      return false;
    } catch (error: any) {
      console.log("Ошибка авторизации:", error.response?.status, error.message);
      const Cookies = await getCookies();
      if (Cookies?.get("accessToken")) {
        return true;
      }
      return false;
    }
  }

  async activate(activationLink: string) {
    try {
      const response = await axios.get(
        `${API_URL}/users/activate/${activationLink}`,
      );
      if (response.status === 200) {
        return response.data.message;
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        return "Некорректная ссылка для активации";
      } else {
        return "Произошла ошибка";
      }
    }
  }
}

export default new AuthService();
