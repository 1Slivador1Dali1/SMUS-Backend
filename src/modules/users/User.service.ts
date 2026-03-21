import type {
  CreateUserDto,
  IUser,
  IUsers,
  UpdateUserDto,
  UserMetrics,
  UserResponse,
  WeightsHistory,
} from "./User.model.ts";
import type { UserRepository } from "./User.repository.ts";

export class UserService {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async createUser(userData: CreateUserDto): Promise<IUser> {
    if (!userData.username || !userData.password) {
      throw new Error("User name and password are required");
    }

    return this.repository.create(userData);
  }

  async getAllUsers(): Promise<IUsers> {
    return await this.repository.findAll();
  }

  async getUserById(id: string): Promise<UserResponse | null> {
    if (!id) {
      throw new Error("User id is required");
    }

    return this.repository.findById(id) || null;
  }

  async updateUser(
    id: string,
    data: UpdateUserDto,
  ): Promise<UserResponse | null> {
    if (!id) {
      throw new Error("User id is required");
    }

    return this.repository.update(id, data) || null;
  }

  async deleteUser(id: string): Promise<void> {
    if (!id) {
      throw new Error("User id is required");
    }

    const isDeleted = await this.repository.delete(id);

    if (!isDeleted) {
      throw new Error("User not found");
    }
  }

  async getUserMetrics(id: string): Promise<UserMetrics | null> {
    if (!id) {
      throw new Error("User id is required");
    }

    return (await this.repository.findMetricsByUserId(id)) || null;
  }

  // #TODO: Add-Update Metric User

  // #TODO: Add Weight History

  async getAllWeightHistory(id: string): Promise<WeightsHistory> {
    if (!id) {
      throw new Error("User id is required");
    }

    return await this.repository.findWeightHistory(id);
  }
}
