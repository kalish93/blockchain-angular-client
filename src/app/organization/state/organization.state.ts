import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken, Store } from '@ngxs/store';
import { CreateOrganization, GetOrganizations, GetOrganizationDetail,CreateMember, SetSelectedOrganization } from './organization.action';
import { OrganizationService } from '../services/organization.service';
import { Member, Organization, OrganizationWithMembers } from '../models/organization.model';
import { tap } from 'rxjs';
import { insertItem, patch } from '@ngxs/store/operators';

export interface OrganizationStateModel {
  organizations: Organization[];
  organization: OrganizationWithMembers | undefined;
  selectedOrganization: Organization | undefined;
}

const ORGANIZATIO_STATE_TOKEN = new StateToken<OrganizationStateModel>(
  'OrganizationState'
);

const defaults: OrganizationStateModel = {
  organizations: [],
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
  ) { }

  @Action(CreateOrganization)
  async createElection({ setState }: StateContext<OrganizationStateModel>,
    { organization }: CreateOrganization) {
    return this.organizationService.createOrganization(organization).pipe(
      tap((createdOrganization: Organization) => {
        setState(
          patch({
            organizations: insertItem(createdOrganization),
          }),
        );
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
    return this.organizationService.createMember(member).pipe(
      tap((createdMember: Member) => {
        setState(
          patch({
            organization: patch({
              members: insertItem(createdMember),
            }),
          }),
        );
      }),
    );
  }

  @Action(SetSelectedOrganization)
  setSelectedOrganization({setState}: StateContext<OrganizationStateModel>, {organization}: SetSelectedOrganization){
    setState(patch({
      selectedOrganization: organization
    }))
  }
}
