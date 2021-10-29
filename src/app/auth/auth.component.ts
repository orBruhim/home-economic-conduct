import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  @ViewChild('authForm')
  authForm: NgForm = new NgForm ([],[]);
  isLogin = true;
  error: string | null = null;
  constructor(private route: Router) { }

  ngOnInit() {
  }
  onSwitchMode() {
    this.isLogin = !this.isLogin;
  }
  onSubmit() {
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;
    console.log(this.authForm.value);
    this.authForm.reset();
    
    // if (this.isLogin) {
    //   this.authService.login(email, password).subscribe (responseData => {
    //     console.log (responseData);
    //     this.route.navigate (['/recipes']);
    //   },
    //   errorMessage => {
    //     console.log(errorMessage);
    //     this.error = errorMessage;
    //   });
    // } else {
    // this.authService.signUp(email, password).subscribe( responseData => {
    //   console.log(responseData);
    //   this.route.navigate (['/recipes']);
    // },
    //  errorMessage => {
    //   console.log(errorMessage);
    //   this.error = errorMessage;
    // }
    // );
    // this.SignUpForm.reset();
    // }
  }

}
