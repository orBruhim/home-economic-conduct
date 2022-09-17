import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  user,
  User
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable, of, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User | null = null;

  user$: Observable<User | null>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: Auth
  ) {
    this.user$ = user(auth);
  }

  signUp(email: string, password: string) {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      tap(() => {
        this.currentUser = this.auth.currentUser;
        console.log(this.currentUser);
      })
    );
  }

  login(email: string, password: string) {
    // return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDUviVzZyYZrJ0e55PgnQnzx7xBPRWTtSA',
    //   {
    //     email: email,
    //     password: password,
    //     returnSecureToken: true
    //   })
    //   .pipe
    //   (
    //     tap(resData => {
    //       // this.user$.next({ email: email, id: password, token: 'By49g23DuqObdBwEayqIz1VHtupEmI2QlonuFoIN' });
    //     }
    //     )
    //   );
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  // getUser(): Observable<User | null> {
  //   return this.user$.asObservable();
  // }

  handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exist.';
        break;
    }
    return errorMessage;
  }

  logout() {
    // this.user$.next({ email: '', id: '', token: 'By49g23DuqObdBwEayqIz1VHtupEmI2QlonuFoIN' });
    console.log(this.user$);
    this.router.navigate(['/auth']);
  }
}
