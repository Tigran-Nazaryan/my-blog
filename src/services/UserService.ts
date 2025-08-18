import {IUser} from "@/models/Iuser";

export default class UserService {
  static async fetchUsers(): Promise<IUser[]> {
    try {
      const response = await fetch('/api/auth/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`);
      }

      const data: IUser[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }
}
