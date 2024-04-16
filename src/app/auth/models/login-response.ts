import { Organization } from "../../organization/models/organization.model";

export interface LoginResponse {
    accessToken: string | null;
    refreshToken: string | null;
    user: CurrentUser;
  }

  export interface CurrentUser {
    id: string;
    email: string;
    isEmailVerified: boolean;
    role: string;
    memberOf: Organization[];
    ownerOf: Organization[];
  }