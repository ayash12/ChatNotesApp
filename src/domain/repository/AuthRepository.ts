export interface IAuthRepository {
    login(email: string, password: string): Promise<string>;
    logout(): Promise<void>;
  }
  