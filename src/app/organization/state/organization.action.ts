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
export class GetMyOrganizations{
  static readonly type = `[Organization] ${GetMyOrganizations.name}`;
  constructor(public userId: string){}
}
export class UploadMembers{
  static readonly type = `[Organization] ${UploadMembers.name}`;
  constructor(public file: File, public organizationId: string){}
}

export class DownloadTemplateCsv{
  static readonly type = `[Organization] ${DownloadTemplateCsv.name}`;
  constructor(){}
}
export class DownloadTemplateXlsx{
  static readonly type = `[Organization] ${DownloadTemplateXlsx.name}`;
  constructor(){}
}
