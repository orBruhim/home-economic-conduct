import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Header } from 'igniteui-angular-core';
import { Observable, throwError } from 'rxjs';
import { AuthResponseData } from '../authResponseData.interface';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  //   isLogin = true;
  //   errormessae = '';
  //   constructor(private authService: AuthService,
  //     private router: Router) { }


  //   onSwitchMode() {
  //     this.isLogin = !this.isLogin;
  //   }
  //   onSubmit(form: NgForm) {
  //     const email = form.value.email;
  //     const password = form.value.password;
  //     if (this.isLogin) {
  //       this.authService.login(email, password).subscribe((resData) => {
  //         this.router.navigate(['bills']);
  //       },
  //           error => {
  //             // const errorme = this.authService.handleError(error);
  //             // this.errormessae = errorme.toString();
  //           }
  //       );
  //     }
  //     else {
  //       this.authService.signUp(email, password).subscribe((resData) => {
  //         this.router.navigate(['bills']);
  //       },
  //         error => {
  //           const errorme = this.authService.handleError(error);
  //           this.errormessae = errorme.toString();
  //         }
  //       );
  //     }
  //     form.reset();
  //   }
  // }
  isLoginMode = true;
  error: string |null = null;
  authObs: any;

  constructor(private authService: AuthService, private router: Router) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;


    if (this.isLoginMode) {
      this.authObs = this.authService.login(email, password);
    } else {
      this.authObs = this.authService.signUp(email, password);
    }

    console.log(this.authObs);


    this.authObs.subscribe(
      (resData: any) => {
        console.log(resData);
        this.router.navigate(['/bills']);
      },
      (errorMessage: any) => {
        this.error = errorMessage.error.error.message;
        switch (errorMessage.error.error.message) {
          case 'EMAIL_EXISTS':
            this.error = 'This email exists already';
            break;
          case 'EMAIL_NOT_FOUND':
            this.error = 'This email does not exist.';
            break;
          case 'INVALID_PASSWORD':
            this.error = 'This password is not correct.';
            break;
        }
      }
    );

    form.reset();
  }
}
