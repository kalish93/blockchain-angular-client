import { UserRequest, VerifyUserEmailRequest } from "../models/user-request";

export class Register {
  static readonly type = '[User] Register';
  constructor(public request: UserRequest) {}
}

export class VerifyUserEmail{
  static readonly type = `[User] ${VerifyUserEmail.name}`;
  constructor(public request: VerifyUserEmailRequest) {}
}
export class GetUsers{
  static readonly type = `[User] ${GetUsers.name}`;
  constructor() {}
}

