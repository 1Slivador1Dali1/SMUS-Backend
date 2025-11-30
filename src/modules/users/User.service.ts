import type { IUser, IUsers } from "./User.model.ts";
import type { UserRepository } from "./User.repository.ts";

export class UserService {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  getAllUsers(): IUsers {
    return this.repository.findAll();
  }

  getUserById(id: string): IUser | null {
    return this.repository.findById(id) || null;
  }
}
