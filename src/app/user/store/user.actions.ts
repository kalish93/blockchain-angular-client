import { UserRequest } from "../models/user-request";

export class Register {
  static readonly type = '[User] Register';
  constructor(public request: UserRequest) {}
}

