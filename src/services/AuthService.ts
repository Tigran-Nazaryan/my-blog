import {$api} from "@/http";
import {AuthResponse} from "@/models/response/AuthResponse";

export default class AuthService {
  static async login(email: string, password: string): Promise<AuthResponse> {
    const data = await $api('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    console.log("data login", data);

    if (!data.accessToken) {
      throw new Error(data.message || 'Login failed');
    }

    return data;
  }

  static async registration(email: string, password: string, firstName: string, lastName: string): Promise<AuthResponse> {
    return await $api('/api/auth/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password, firstName, lastName}),
    });
  }

  static async logout(): Promise<void> {
    return $api('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
