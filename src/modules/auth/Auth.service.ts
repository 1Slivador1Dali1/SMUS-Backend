export class AuthService {
  private repository;

  constructor(repository: any) {
    this.repository = repository;
  }
}
