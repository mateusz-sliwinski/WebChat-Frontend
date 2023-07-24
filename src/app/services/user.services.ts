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
        const endpoint = `${this.api_url}accounts/account-confirm-email/${key}/`;
        return this.http.post(endpoint, key);
      }
}

