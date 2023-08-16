import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  },
  ),
  withCredentials: true,
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  api_url: string = 'http://localhost:8000/';

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<any>(
        this.api_url + 'accounts/login/',
        { email, password },
      )
      .pipe(
        map((user_all_data => {
          console.log(user_all_data)

          if (user_all_data && user_all_data.access) {
            user_all_data.user.access = user_all_data.access;
            delete user_all_data.access;
            delete user_all_data.refresh;
            localStorage.setItem('currentUser', JSON.stringify(user_all_data));
            this.isLoggedInSubject.next(true);
          }
          return user_all_data;
        })
      ));
  }

  logout()  {
    localStorage.removeItem('currentUser');
    this.isLoggedInSubject.next(false);
    const endpoint = `${this.api_url}accounts/logout/`;

    return this.http.post(endpoint, {}, httpOptions);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.api_url + 'accounts/register/', data);
  }

  activateAccount(key: any): Observable<any> {
    const endpoint = `${this.api_url}accounts/verify-email/`;
    return this.http.post(endpoint, { key }, httpOptions);
  }

  resetPassword(email: string): Observable<any> {
    const url = `${this.api_url}accounts/user/password/reset/`;
    return this.http.post(url, { email });
  }

  confirmPasswordReset(
    uidb64: string,
    token: string,
    new_password1: string,
    new_password2: string
  ): Observable<any> {
    const url = `${this.api_url}accounts/user/password/reset/confirm/${uidb64}/${token}/`;
    return this.http.post(url, {
      token: token,
      uid: uidb64,
      new_password1: new_password1,
      new_password2: new_password2,
    });
  }

  isUserLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }
}
