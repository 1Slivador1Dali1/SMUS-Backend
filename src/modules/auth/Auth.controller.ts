import type { Request, Response } from "express";
import type { AuthService } from "./Auth.service.ts";

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  register = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    const credentials = await this.authService.register({ username, password });
    res.status(201).json(credentials);
  };

  login = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    const credentials = await this.authService.login({ username, password });
    res.status(200).json(credentials);
  };

  me = async (req: Request, res: Response) => {};
}
