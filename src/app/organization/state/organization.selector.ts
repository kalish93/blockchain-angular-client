import { Selector, createPropertySelectors } from '@ngxs/store';
import { OrganizationState, OrganizationStateModel } from './organization.state';

export class OrganizationSelector {
  static slices = createPropertySelectors<OrganizationStateModel>(OrganizationState);

  @Selector([OrganizationState])
  static organizations(stateModel: OrganizationStateModel) {
    return stateModel.organizations;
  }

  @Selector([OrganizationState])
  static organization(stateModel: OrganizationStateModel) {
    return stateModel.organization;
  }
}