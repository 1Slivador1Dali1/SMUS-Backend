import type { AuthService } from "./Auth.service.ts";

export class AuthController {
  private authService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }
}
