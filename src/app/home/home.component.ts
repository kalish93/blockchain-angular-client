import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RxState } from '@rx-angular/state';
import { Observable } from 'rxjs';
import { LOGIN_ROUTE } from '../core/constants/routes';
import { AuthFacade } from '../auth/facades/auth.facade';
import { UserRole } from '../core/constants/user-types';

interface HomeComponentState {
  isAuthenticated: boolean;
}

const initHomeComponentState: Partial<HomeComponentState> = {
  isAuthenticated: true,
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [RxState],
})
export class HomeComponent implements OnInit {
  mainMenu = [];

  loginRoute = {
    link: LOGIN_ROUTE,
    label: `login`,
    icon: '',
  };

  logoutRoute = {
    link: '',
    label: `logout`,
    icon: '',
  };
  isAuthenticated$: Observable<boolean> = this.state.select('isAuthenticated');

  constructor(
    private authFacade: AuthFacade,
    private router: Router,
    private state: RxState<HomeComponentState>
  ) {
    this.state.set(initHomeComponentState);
    this.state.connect('isAuthenticated', authFacade.isAuthenticated$);
  }

  ngOnInit(): void {
    this.isAuthenticated$.subscribe((isAuthenticated) => {
      if (!isAuthenticated) {
        this.router.navigate([LOGIN_ROUTE]);
      }
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }

  logout() {
    this.authFacade.dispatchLogout();
  }
}
