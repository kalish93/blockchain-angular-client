import { ResetPasswordRequest, UserRequest, VerifyUserEmailRequest } from "../models/user-request";

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

export class ForgetPassword{
  static readonly type = `[User] ${ForgetPassword.name}`;
  constructor(public email: string) {}
}

export class ResetPassword {
  static readonly type = `[User] ${ResetPassword.name}`;
  constructor(public request: ResetPasswordRequest) {}
}

