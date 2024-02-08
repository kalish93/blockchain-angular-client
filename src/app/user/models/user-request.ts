import { UserRole } from '../../core/constants/user-types';

export interface UserRequest {
  email: string;
  password: string;
  confirmPassword: string;
  userRole: UserRole;
}
