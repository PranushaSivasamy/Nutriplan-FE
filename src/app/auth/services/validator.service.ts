import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  constructor(private userService: UserService) {}

  passwordValidator(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordcontrol = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordcontrol || !confirmPasswordControl) {
        return null;
      }
      if (confirmPasswordControl.invalid || passwordcontrol.invalid) {
        return null;
      }
      if (passwordcontrol.value != confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMisMatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
      return null;
    };
  }

  usernameValidator() {
    return (control: AbstractControl) => {
      return this.userService.searchUsername({ username: control.value }).pipe(
        map((res) => {
          return res.usernameTaken ? { usernameTaken: true } : null;
        })
      );
    };
  }

  emailValidator() {
    return (control: AbstractControl) => {
      return this.userService.searchEmail({ email: control.value }).pipe(
        map((res) => {
          return res.emailTaken ? { emailTaken: true } : null;
        })
      );
    };
  }

  onLogin(token: any) {
    sessionStorage.setItem('token', token);
  }

}
