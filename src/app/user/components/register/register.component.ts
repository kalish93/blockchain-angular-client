import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RxState } from '@rx-angular/state';
import { UserResponse } from '../../models/user-response';
import { UserFacade } from '../../facades/users.facades';
import { Observable } from 'rxjs';

interface RegisterComponentState{
  isPasswordVisible : boolean;
  user: UserResponse 
}

const initRegisterComponentState: Partial<RegisterComponentState> = {
  isPasswordVisible: true,
  user : { email : '',id : ''}

};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [RxState]
})
export class RegisterComponent implements OnInit{
  registerForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  user$: Observable< UserResponse> = this.state.select('user');

 constructor(
  private fb : NonNullableFormBuilder,
  private userFacade : UserFacade,
  private state : RxState<RegisterComponentState>,
  private router : Router,
 ) {
  this.state.set(initRegisterComponentState);
  this.state.connect('user',userFacade.user$);
 }
  ngOnInit(): void {
    this.user$.subscribe((result) => {
      if(result.email){
        console.log(result.email,result.id)
      }
     
      if(result.email && result.id){
        this.router.navigate(['login']);
      }
    })
  }

  get emailValidationError() {
    return this.registerForm.controls.email;
  }

  get passwordValidationError() {
    return this.registerForm.controls.password;
  }

  get isPasswordVisible() {
    const { isPasswordVisible } = this.state.get();
    return isPasswordVisible;
  }

  togglePasswordVisibility() {
    const { isPasswordVisible } = this.state.get();
    this.state.set({ isPasswordVisible: !isPasswordVisible });
  }

  register() {
    const { valid, touched, dirty } = this.registerForm;

    if (
      valid &&
      (touched || dirty) &&
      this.registerForm.value.email &&
      this.registerForm.value.password
    ) {
      this.userFacade.dispatchRegister({
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      });
    }
  }



}
