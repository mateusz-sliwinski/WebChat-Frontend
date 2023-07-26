import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

 
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    })
}

@Injectable({
    providedIn:'root'
})
export class UserService {
    api_url: string = 'http://127.0.0.1:8000/'
    constructor(private http:HttpClient){}

    login(email:string, password:string){
        return this.http.post<any>(this.api_url + 'accounts/login/', {email,password}, httpOptions).pipe(
            map(user => {
                if (user && user.access){
                    localStorage.setItem('currentUser', JSON.stringify(user))
                }
                return user
            })
        );
    }

    logout(){
        localStorage.removeItem('currentUser');
    }

    create(data: any): Observable<any> {
        return this.http.post(this.api_url + 'accounts/register/' , data);
      }

      activateAccount(key: any): Observable<any> {
        const endpoint = `${this.api_url}accounts/verify-email/`;
        return this.http.post(endpoint, {key}, httpOptions);
      }
    
      resetPassword(email: string): Observable<any> {
        const url = `${this.api_url}accounts/user/password/reset/`;
        return this.http.post(url, { email });
      }
    
      confirmPasswordReset(uidb64: string, token: string, password1: string, password2:string): Observable<any> {
        const url = `${this.api_url}accounts/user/password/reset/confirm/${uidb64}/${token}/`;
        return this.http.post(url, { password1: password1, password2:password2 });
      }

    }