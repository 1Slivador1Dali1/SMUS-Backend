import bcrypt from "bcryptjs";
import { AppError } from "../../utils/AppError.ts";
import type { IUser } from "../users/User.model.ts";
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

  private toSafeUser(user: IUser): SafeUser {
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
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      this.authConfig.jwtSecret,
    );

    return {
      user: this.toSafeUser(newUser),
      token,
    };
  }

  async login(dto: LoginDTO): Promise<AuthResponse> {
    if (!dto.username) {
      throw new AppError("Username is required", 400);
    }

    if (!dto.password) {
      throw new AppError("Password is required", 400);
    }

    const usernameAlready = await this.repository.findByUsername(dto.username);

    if (!usernameAlready) {
      throw new AppError("Invalid credentials", 401);
    }

    const comparePassword = await bcrypt.compare(
      dto.password,
      usernameAlready.password_hash,
    );

    if (!comparePassword) {
      throw new AppError("Invalid credentials", 401);
    }

    const token = jwt.sign(
      { id: usernameAlready.id, username: usernameAlready.username },
      this.authConfig.jwtSecret,
    );

    return {
      user: this.toSafeUser(usernameAlready),
      token,
    };
  }
}
