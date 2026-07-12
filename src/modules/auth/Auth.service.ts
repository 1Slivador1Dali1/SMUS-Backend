import bcrypt from "bcryptjs";
import { AppError } from "../../utils/AppError.ts";
import type { IUser, UserResponse } from "../users/User.model.ts";
import type {
  AuthConfig,
  AuthResponse,
  LoginDTO,
  RefreshResponse,
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

  async refresh(refreshToken: string): Promise<RefreshResponse> {
    const decodePayload = jwt.verify(
      refreshToken,
      this.authConfig.jwtSecret,
    ) as { id: string };

    const userFind = await this.repository.findById(decodePayload.id);
    if (!userFind) {
      throw new AppError("Invalid credentials", 401);
    }
    const findRefreshTokens = await this.repository.findRefreshTokens(
      userFind.id,
    );
    let tokenFind = null;
    for (const t of findRefreshTokens) {
      if (await bcrypt.compare(refreshToken, t.token)) {
        tokenFind = t;
        break;
      }
    }
    if (!tokenFind) {
      throw new AppError("Not found token", 404);
    }

    await this.repository.deleteRefreshToken(tokenFind.id);

    const newAccessToken = jwt.sign(
      { id: userFind.id, username: userFind.username },
      this.authConfig.jwtSecret,
      { expiresIn: "15m" },
    );

    const newRefreshToken = jwt.sign(
      { id: userFind.id },
      this.authConfig.jwtSecret,
      { expiresIn: "7d" },
    );

    const refreshHash = await bcrypt.hash(newRefreshToken, 10);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await this.repository.saveRefreshToken(userFind.id, refreshHash, expiresAt);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
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
