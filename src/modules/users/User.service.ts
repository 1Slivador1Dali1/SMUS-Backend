import { AppError } from "../../utils/AppError.ts";
import type {
  AddWeightDto,
  IUsers,
  UpdateUserDto,
  UserMetrics,
  UserResponse,
  WeightHistory,
  WeightsHistory,
} from "./User.model.ts";
import type { UserRepository } from "./User.repository.ts";

export class UserService {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async getAllUsers(): Promise<IUsers> {
    return await this.repository.findAll();
  }

  async getUserById(id: string): Promise<UserResponse | null> {
    if (!id) {
      throw new AppError("User id is required", 400);
    }

    return this.repository.findById(id) || null;
  }

  async updateUser(
    id: string,
    data: UpdateUserDto,
  ): Promise<UserResponse | null> {
    if (!id) {
      throw new AppError("User id is required", 400);
    }

    if (!data) {
      throw new AppError("User data is required", 400);
    }

    const processedData: UpdateUserDto = {};

    if (data.username) {
      processedData.username = data.username;
    }

    return this.repository.update(id, processedData) || null;
  }

  async deleteUser(id: string): Promise<void> {
    if (!id) {
      throw new AppError("User id is required", 400);
    }

    const isDeleted = await this.repository.delete(id);

    if (!isDeleted) {
      throw new AppError("User not found", 404);
    }
  }

  async getUserMetrics(id: string): Promise<UserMetrics | null> {
    if (!id) {
      throw new AppError("User id is required", 400);
    }

    return (await this.repository.findMetricsByUserId(id)) || null;
  }

  // #TODO: Add-Update Metric User

  async setWeight(id: string, data: AddWeightDto): Promise<WeightHistory> {
    if (!id) {
      throw new AppError("User id is required", 400);
    }

    return await this.repository.addWeightRecord(id, data);
  }

  async getAllWeightHistory(id: string): Promise<WeightsHistory> {
    if (!id) {
      throw new AppError("User id is required", 400);
    }

    return await this.repository.findWeightHistory(id);
  }
}
