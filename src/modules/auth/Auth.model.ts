export interface RegisterDTO {
  username: string;
  password: string;
}

export interface LoginDTO {
  username: string;
  password: string;
}

export interface CreateUserDTO {
  username: string;
  passwordHash: string;
  isSuperuser?: boolean;
}

export interface SafeUser {
  id: string;
  username: string;
  is_superuser: boolean;
  created_at: Date;
}

export interface AuthResponse {
  user: SafeUser;
  accessToken: string;
  refreshToken: string;
}

export interface AuthConfig {
  jwtSecret: string;
  jwtExpiresIn?: string;
}

export interface RefreshToken {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
}
