export interface IUser {
  id: string;
  username: string;
  password_hash: string;
  is_superuser: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface IUsers {
  items: IUser[];
}

export interface UpdateUserDto {
  username?: string;
  is_superuser?: string;
}

export interface UserResponse {
  id: string;
  username: string;
  is_superuser: boolean;
  created_at: Date;
}

export interface AuthResponse {
  user: UserResponse;
  token: string;
}