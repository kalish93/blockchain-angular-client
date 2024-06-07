import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken, Store } from '@ngxs/store';
import { CreateOrganization, GetOrganizations, GetOrganizationDetail,CreateMember, SetSelectedOrganization, GetMyOrganizations, UploadMembers, DownloadTemplateCsv, DownloadTemplateXlsx } from './organization.action';
import { OrganizationService } from '../services/organization.service';
import { Member, Organization, OrganizationWithMembers } from '../models/organization.model';
import { tap } from 'rxjs';
import { insertItem, patch } from '@ngxs/store/operators';
import { OperationStatusService } from '../../core/services/operation-status.service';
import { successStyle } from '../../core/services/status-style-names';
import { SetProgressOff, SetProgressOn } from '../../core/store/progress-status.actions';

export interface OrganizationStateModel {
  organizations: Organization[];
  myOrganizations: Organization[];
  organization: OrganizationWithMembers | undefined;
  selectedOrganization: Organization | undefined;
}

const ORGANIZATIO_STATE_TOKEN = new StateToken<OrganizationStateModel>(
  'OrganizationState'
);

const defaults: OrganizationStateModel = {
  organizations: [],
  myOrganizations: [],
  organization: undefined,
  selectedOrganization: undefined,

};

@State<OrganizationStateModel>({
  name: ORGANIZATIO_STATE_TOKEN,
  defaults: defaults,
})
@Injectable()
export class OrganizationState {
  constructor(
    private organizationService: OrganizationService,
    private store: Store,
    private operationStatusService: OperationStatusService,
  ) { }

  @Action(CreateOrganization)
  async createOrganization({ setState }: StateContext<OrganizationStateModel>,
    { organization }: CreateOrganization) {
    this.store.dispatch(new SetProgressOn());
    return this.organizationService.createOrganization(organization).pipe(
      tap((createdOrganization: Organization) => {
        setState(
          patch({
            organizations: insertItem(createdOrganization),
            myOrganizations: insertItem(createdOrganization),
          }),
        );
        this.store.dispatch(new SetProgressOff());
        this.operationStatusService.displayStatus('Organization created successfully', successStyle)
      }),
    );

  }

  @Action(GetOrganizations)
  getOrganizations({ setState }: StateContext<OrganizationStateModel>) {
    return this.organizationService.getOrganizations().pipe(
      tap((organizations: Organization[]) => {
        setState(
          patch({
            organizations,
          }),
        );
      }),
    );
  }

  @Action(GetOrganizationDetail)
  getOrganizationDetail({ setState }: StateContext<OrganizationStateModel>,
    { organizationId }: GetOrganizationDetail) {
    return this.organizationService.getOrganization(organizationId).pipe(
      tap((organization: OrganizationWithMembers) => {
        setState(
          patch({
            organization,
          }),
        );
      }),
    );
  }

  @Action(CreateMember)
  createMember({ setState }: StateContext<OrganizationStateModel>,
    { member }: CreateMember) {
    this.store.dispatch(new SetProgressOn());
    return this.organizationService.createMember(member).pipe(
      tap((createdMember: Member) => {
        setState(
          patch({
            organization: patch({
              members: insertItem(createdMember),
            }),
          }),
        );
        this.store.dispatch(new SetProgressOff());
        this.operationStatusService.displayStatus('Member created successfully', successStyle)
      }),
    );
  }

  @Action(SetSelectedOrganization)
  setSelectedOrganization({setState}: StateContext<OrganizationStateModel>, {organization}: SetSelectedOrganization){
    setState(patch({
      selectedOrganization: organization
    }))
  }

  @Action(GetMyOrganizations)
  getMyOrganizations({ setState }: StateContext<OrganizationStateModel>,
    {userId}: GetMyOrganizations) {
    this.store.dispatch(new SetProgressOn());
    return this.organizationService.getmyOrganizations(userId).pipe(
      tap((organizations: Organization[]) => {
        setState(
          patch({
            myOrganizations: organizations,
          }),
        );
        this.store.dispatch(new SetProgressOff());
      }),
    );
  }

  @Action(UploadMembers)
  uploadMembers({ getState, setState }: StateContext<OrganizationStateModel>,
  { file, organizationId }: UploadMembers) {
  this.store.dispatch(new SetProgressOn());
  return this.organizationService.uploadMembers(file, organizationId).pipe(
    tap((createdMembers) => {
      const state = getState();
      const newMembers = [...state.organization!.members, ...createdMembers];
      setState(
        patch({
          organization: patch({
            members: newMembers,
          }),
        }),
      );
      this.store.dispatch(new SetProgressOff());
      this.operationStatusService.displayStatus('Members Uploaded successfully', successStyle)
    }),
  );
}

@Action(DownloadTemplateCsv)
downloadTemplateCsv({}: StateContext<OrganizationStateModel>) {
  return this.organizationService.downloadTemplateCsv();
}

@Action(DownloadTemplateXlsx)
downloadTemplateXlsx({}: StateContext<OrganizationStateModel>) {
  return this.organizationService.downloadTemplateXlsx();
}
}
