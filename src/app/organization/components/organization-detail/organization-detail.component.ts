import { Component } from '@angular/core';
import { OrganizationFacade } from '../../facades/organizations.facades';
import { Organization, OrganizationWithMembers } from '../../models/organization.model';
import { RxState } from '@rx-angular/state';
import { ActivatedRoute } from '@angular/router';

interface OrganizationDetailComponentState {
  selectedOrganization: Organization | undefined;
  organization: OrganizationWithMembers | undefined;
}

const initOrganizationDetailComponentState: OrganizationDetailComponentState = {
  selectedOrganization: undefined,
  organization: undefined,
};

@Component({
  selector: 'app-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrl: './organization-detail.component.scss',
})
export class OrganizationDetailComponent {
  selectedOrganization$ = this.state.select('selectedOrganization');
  organization$ = this.state.select('organization');
  selectedOrganization: Organization | undefined = undefined;
  organization: OrganizationWithMembers | undefined = undefined;
  constructor(
    private state: RxState<OrganizationDetailComponentState>,
    private organizationFacade: OrganizationFacade,
    private route: ActivatedRoute
  ) {
    this.state.set(initOrganizationDetailComponentState);
    this.state.connect('organization', this.organizationFacade.organization$);
    this.state.connect('selectedOrganization', this.organizationFacade.selectedOrganization$);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.organizationFacade.dispatchGetOrganizationDetail(
        params['id']
      );
    })
    this.organization$.subscribe((og) => {
        console.log("ggg", og)
        this.organization = og;
      });
    // this.selectedOrganization$.subscribe((organization)=>{
    //   this.selectedOrganization = organization
    //   console.log("fff", this.selectedOrganization);
      
    //   if (this.selectedOrganization && this.selectedOrganization.id)
        
      
    // })
  }
}
