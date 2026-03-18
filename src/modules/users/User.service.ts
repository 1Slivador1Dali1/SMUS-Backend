import type { CreateUserDto, IUser, IUsers } from "./User.model.ts";
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
}
