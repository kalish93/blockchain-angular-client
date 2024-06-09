import { UserRole } from '../../core/constants/user-types';

export interface UserRequest {
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}

export interface VerifyUserEmailRequest{
  email: string;
  otp:string;
}

export interface ResetPasswordRequest{
  email: string;
  otp:string;
  password: string;
  confirmPassword: string;
}
