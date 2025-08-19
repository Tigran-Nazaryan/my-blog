import {IUser} from "@/models/Iuser";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export type VerifyResponse = Pick<AuthResponse, "user">;