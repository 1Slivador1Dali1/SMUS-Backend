import type { Request, Response } from "express";
import type { UserService } from "./User.service.ts";

export class UserController {
  #service: UserService;

  constructor(service: UserService) {
    this.#service = service;
  }

  getAllUsers = (req: Request, res: Response): void => {
    try {
      const users = this.#service.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
