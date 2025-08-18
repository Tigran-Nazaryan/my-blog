import { $api } from "@/http";
import {AuthResponse} from "@/models/response/AuthResponse";

export default class AuthService {
  static async login(email: string, password: string): Promise<AuthResponse> {
    const response = await $api('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Login failed');
    }

    return await response.json();
  }

  static async registration(email: string, password: string): Promise<AuthResponse> {
    const response = await $api('/api/auth/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    console.log('Registration response:', response);
    return response;
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
