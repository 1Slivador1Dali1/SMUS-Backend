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
  token: string;
}

export interface AuthConfig {
  jwtSecret: string;
  jwtExpisenIn?: string;
}
