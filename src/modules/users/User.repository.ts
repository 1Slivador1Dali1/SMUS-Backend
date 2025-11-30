import type { IUser, IUsers } from "./User.model.ts";

export class UserRepository {
  private users: IUsers;

  constructor(users: IUsers) {
    this.users = users;
  }

  findAll(): IUsers {
    return this.users;
  }

  findById(id: string): IUser | undefined {
    return this.users.items.find((u) => u.id === id);
  }
}
