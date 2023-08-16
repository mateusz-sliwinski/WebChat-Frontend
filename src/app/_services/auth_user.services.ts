import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
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
  user: any;
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

  getUser(){
    const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.user = JSON.parse(storedUser)
        return this.user;
      } else {
        console.log('user not found');
      }
  }

  usersList(user:any): Observable<any> {

    const params = new HttpParams().set('username', user.username.toString());
    return this.http.get<any>(this.api_url + 'accounts/user/list', { params });
  }

  friendsList(user:any): Observable<any> {
    console.log(user.username);
    const params = new HttpParams().set('username', user.username.toString());
    const token = 'twój_token_jwt_lub_token_authentication';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(this.api_url + 'accounts/friends/list/', {params });
  }

  invitationsList(user:any): Observable<any> {
    console.log(user.username);
    const params = new HttpParams().set('username', user.username.toString());

    return this.http.get<any>(this.api_url + 'accounts/friends/pending/', {params });
  }

  addToFriend(from: string, to: string, token: string): Observable<any> {
    const endpoint = `${this.api_url}accounts/friends/create/`;
    
    const headers = new HttpHeaders({
      'X-CSRFToken': token,
    });
    const data = { 
          from_user: from,
          to_user: to ,
          status: 'Accepted',
        };
    return this.http.post<any>(endpoint,data, {headers});
  }

  getRoom(user:any, current_user:any): Observable<any> {

    const params = new HttpParams()
  .set('username', user.username.toString())
  .append('current_user', current_user.username.toString());
    
    // const token = 'twój_token_jwt_lub_token_authentication';
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${token}`
    // });
    return this.http.get<any>(this.api_url + 'chat/room/', {params: params  });
  }
}
