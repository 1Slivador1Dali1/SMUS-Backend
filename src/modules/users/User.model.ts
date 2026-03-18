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

export interface UserMetrics {
  id: string;
  user_id: string;
  current_weight: number | null;
  height: number | null;
  birth_date: Date | null;
  gender: "male" | "female";
  created_at: Date;
  updated_at: Date;
}

export interface WeightHistory {
  id: string;
  user_id: string;
  weight: number;
  date: Date;
  notes: string | null;
  created_at: Date;
}

export interface CreateUserDto {
  username: string;
  password: string;
  is_superuser?: boolean;
}

export interface UpdateUserDto {
  username?: string;
  password?: string;
  is_superuser?: string;
}

export interface UserResponse {
  id: string;
  username: string;
  is_superuser: boolean;
  created_at: Date;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: UserResponse;
  token: string;
}

export interface UpdateUserMetricsDto {
  current_weight?: number;
  height?: number;
  birth_date?: Date;
  gender?: "male" | "female";
}

export interface AddWeightDto {
  weight: number;
  date?: Date;
  notes?: string;
}
