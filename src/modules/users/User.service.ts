import type {
  CreateUserDto,
  IUser,
  IUsers,
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

  // #TODO: Update User

  async deleteUser(id: string): Promise<void> {
    if (!id) {
      throw new Error("User id is required");
    }

    const isDeleted = await this.repository.delete(id);

    if (!isDeleted) {
      throw new Error("User not found");
    }
  }

  // #TODO: Metric User

  // #TODO: Add Weight History

  async getAllWeightHistory(id: string): Promise<WeightsHistory> {
    if (!id) {
      throw new Error("User id is required");
    }

    return await this.repository.findWeightHistory(id);
  }
}
