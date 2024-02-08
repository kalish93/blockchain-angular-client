import { Organization, Member} from '../models/organization.model';

export class CreateOrganization {
  static readonly type = `[Organization] ${CreateOrganization.name}`;
  constructor(public organization: Organization){}
}

export class GetOrganizations{
  static readonly type = `[Organization] ${GetOrganizations.name}`;
  constructor(){}
}

export class GetOrganizationDetail{
  static readonly type = `[Organization] ${GetOrganizationDetail.name}`;
  constructor(public organizationId: string){}
}

export class SetSelectedOrganization {
  static readonly type = `[Organization] ${SetSelectedOrganization.name}`;
  constructor(public organization: Organization) {}
}
export class CreateMember{
  static readonly type = `[Organization] ${CreateMember.name}`;
  constructor(public member: Member){}
}


