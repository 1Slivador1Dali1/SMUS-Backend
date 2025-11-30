import { UserController } from "./User.controller.ts";
import type { IUsers } from "./User.model.ts";
import { UserRepository } from "./User.repository.ts";
import { createUserRouter } from "./User.router.ts";
import { UserService } from "./User.service.ts";

export const initializeUserModule = (usersData: IUsers) => {
  const repository = new UserRepository(usersData);
  const service = new UserService(repository);
  const controller = new UserController(service);
  const router = createUserRouter(controller);

  return { repository, service, controller, router };
};
