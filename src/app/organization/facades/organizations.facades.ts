import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Member, Organization, OrganizationWithMembers } from '../models/organization.model';
import { CreateOrganization, GetOrganizations, GetOrganizationDetail, CreateMember, SetSelectedOrganization, GetMyOrganizations } from '../state/organization.action';
import { OrganizationSelector } from '../state/organization.selector';

@Injectable({
  providedIn: 'root',
})
export class OrganizationFacade {


  @Select(OrganizationSelector.organizations)
  organizations$!: Observable<Organization[]>;

  @Select(OrganizationSelector.myOrganizations)
  myOrganizations$!: Observable<Organization[]>;

  @Select(OrganizationSelector.organization)
  organization$!: Observable<OrganizationWithMembers>;

  @Select(OrganizationSelector.selectedOrganization)
  selectedOrganization$!: Observable<Organization>;

  constructor(private store: Store) {}

  dispatchCreateOrganization(organization: Organization) {
    this.store.dispatch(new CreateOrganization(organization));
  }

  dispatchGetOrganizations() {
    this.store.dispatch(new GetOrganizations());
  }

  dispatchGetOrganizationDetail(organizationId: string) {
    this.store.dispatch(new GetOrganizationDetail(organizationId));
  }

  dispatchSetSelectedOrganization(organization: Organization){
    this.store.dispatch(new SetSelectedOrganization(organization));
  }

  dispatchCreateMember(member: Member) {
    this.store.dispatch(new CreateMember(member));
  }

  dispatchGetMyOrganizationsMember(userId: string) {
    this.store.dispatch(new GetMyOrganizations(userId));
  }
}
