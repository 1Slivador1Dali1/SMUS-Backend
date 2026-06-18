import { type Request, type Response } from "express";
import type { UserService } from "./User.service.ts";

export class UserController {
  userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  getAllUsers = async (req: Request, res: Response): Promise<void> => {
    const users = await this.userService.getAllUsers();
    res.status(200).json(users);
  };

  getUserById = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id;
    const user = await this.userService.getUserById(String(userId));
    res.status(200).json(user);
  };

  updateUser = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id;
    const body = req.body;
    const result = await this.userService.updateUser(String(userId), body);
    res.status(200).json(result);
  };

  deleteUser = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id;
    await this.userService.deleteUser(String(userId));
    res.status(204).send();
  };

  getUserMetrics = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id;
    const result = await this.userService.getUserMetrics(String(userId));
    res.status(200).json(result);
  };

  // #TODO: Add-Update Metric User

  setWeight = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id ?? "";
    const data = req.body;
    const result = await this.userService.setWeight(userId, data);

    res.status(201).json(result);
  };

  getAllWeightHistory = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id;
    const weightsHistory = await this.userService.getAllWeightHistory(
      userId ?? "",
    );
    res.status(200).json(weightsHistory);
  };
}
