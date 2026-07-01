import bcrypt from "bcryptjs";
import { AppError } from "../../utils/AppError.ts";
import type { IUser, UserResponse } from "../users/User.model.ts";
import type {
  AuthConfig,
  AuthResponse,
  LoginDTO,
  RegisterDTO,
  SafeUser,
} from "./Auth.model.ts";
import type { AuthRepository } from "./Auth.repository.ts";
import jwt from "jsonwebtoken";

export class AuthService {
  private repository: AuthRepository;
  private authConfig: AuthConfig;

  constructor(repository: AuthRepository, authConfig: AuthConfig) {
    this.repository = repository;
    this.authConfig = authConfig;
  }

  private toSafeUser(user: IUser | UserResponse): SafeUser {
    return {
      id: user.id,
      username: user.username,
      is_superuser: user.is_superuser,
      created_at: user.created_at,
    };
  }

  async register(dto: RegisterDTO): Promise<AuthResponse> {
    if (!dto.username) {
      throw new AppError("Username is required", 400);
    }

    if (!dto.password) {
      throw new AppError("Password is required", 400);
    }

    const usernameAlready = await this.repository.findByUsername(dto.username);

    if (usernameAlready !== null) {
      throw new AppError("Username already taken", 409);
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const newUserDTO = {
      username: dto.username,
      passwordHash: passwordHash,
    };

    const newUser = await this.repository.createUser(newUserDTO);
    const accessToken = jwt.sign(
      { id: newUser.id, username: newUser.username },
      this.authConfig.jwtSecret,
      { expiresIn: "15m" },
    );

    const refreshToken = jwt.sign(
      { id: newUser.id },
      this.authConfig.jwtSecret,
      { expiresIn: "7d" },
    );

    const refreshHash = await bcrypt.hash(refreshToken, 10);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await this.repository.saveRefreshToken(newUser.id, refreshHash, expiresAt);

    return {
      user: this.toSafeUser(newUser),
      accessToken,
      refreshToken,
    };
  }

  async login(dto: LoginDTO): Promise<AuthResponse> {
    if (!dto.username) {
      throw new AppError("Username is required", 400);
    }

    if (!dto.password) {
      throw new AppError("Password is required", 400);
    }

    const userFind = await this.repository.findByUsername(dto.username);

    if (!userFind) {
      throw new AppError("Invalid credentials", 401);
    }

    const comparePassword = await bcrypt.compare(
      dto.password,
      userFind.password_hash,
    );

    if (!comparePassword) {
      throw new AppError("Invalid credentials", 401);
    }

    const accessToken = jwt.sign(
      { id: userFind.id, username: userFind.username },
      this.authConfig.jwtSecret,
      { expiresIn: "15m" },
    );

    const refreshToken = jwt.sign(
      { id: userFind.id },
      this.authConfig.jwtSecret,
      { expiresIn: "7d" },
    );

    const refreshHash = await bcrypt.hash(refreshToken, 10);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await this.repository.saveRefreshToken(userFind.id, refreshHash, expiresAt);

    return {
      user: this.toSafeUser(userFind),
      accessToken,
      refreshToken,
    };
  }

  async me(userId: string): Promise<{ user: SafeUser }> {
    const userFind = await this.repository.findById(userId);

    if (!userFind) {
      throw new AppError("Invalid credentials", 401);
    }

    return {
      user: this.toSafeUser(userFind),
    };
  }
}
