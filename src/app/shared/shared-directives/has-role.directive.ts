import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthFacade } from '../../auth/facades/auth.facade';
import { jwtDecode } from "jwt-decode";
@Directive({
  selector: '[appHasRole]',
})
export class HasRoleDirective implements OnInit{

  constructor(
    private authFacade: AuthFacade,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) {}

  @Input() appHasRole: string = '';
  private hasRole: boolean = false;
  private token: string | undefined = undefined;
  ngOnInit(): void {
    this.authFacade.accessToken$.subscribe((token)=>{
      this.token = token;
    });
    this.updateRole();
  }

  private updateRole() {
    if (this.token) {
      const decodedToken: any = jwtDecode(this.token);
      const userRole = decodedToken.role;

      if (userRole === this.appHasRole) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasRole = true;
      } else {
        this.viewContainer.clear();
        this.hasRole = false;
      }
    }
  }
}
