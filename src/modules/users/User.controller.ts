import { type Request, type Response } from "express";
import type { UserService } from "./User.service.ts";

export class UserController {
  userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  createUser = async (req: Request, res: Response) => {
    try {
      const { username, password, is_superuser } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .json({ error: "User name and password required" });
      }

      if (typeof username !== "string" || typeof password !== "string") {
        return res
          .status(400)
          .json({ error: "User name and password must be strings" });
      }

      const newUser = await this.userService.createUser({
        username,
        password,
        is_superuser: is_superuser ?? false,
      });

      res.status(201).json(newUser);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  };

  getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.id;

      if (!userId || userId === undefined) {
        res.status(400).json({ error: "User id is required" });
        return;
      }

      const user = await this.userService.getUserById(String(userId));

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Initial server error" });
    }
  };

  updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.id;
      const body = req.body;
      if (!userId || userId === undefined) {
        res.status(400).json({ error: "User id is required" });
        return;
      }

      const result = await this.userService.updateUser(String(userId), body);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.id;
      if (!userId || userId === undefined) {
        res.status(400).json({ error: "User id is required" });
        return;
      }

      const result = await this.userService.deleteUser(String(userId));

      res.status(204).json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  getUserMetrics = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.id;
      if (!userId || userId === undefined) {
        res.status(400).json({ error: "User id is required" });
        return;
      }

      const result = await this.userService.getUserMetrics(String(userId));

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  // #TODO: Add-Update Metric User

  // #TODO: Add Weight History

  getAllWeightHistory = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.id;

      if (!userId || userId === undefined) {
        res.status(400).json({ error: "User id is required" });
        return;
      }

      const weightsHistory = await this.userService.getAllWeightHistory(
        userId ?? "",
      );

      res.status(200).json(weightsHistory);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
