import { LoginRequest } from "../models/login-request";

export class Login {
  static readonly type = '[Auth] Login';
  constructor(public request: LoginRequest) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}
