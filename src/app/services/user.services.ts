import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';

 
const httpOptions = {
    headers:new HttpHeaders({
        'Content-Type': 'application/json'
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
            map((user: { token: any; }) => {
                if (user && user.token){
                    localStorage.setItem('curretUser', JSON.stringify(user))
                }
                return user
            })
        );
    }

    logout(){
        localStorage.removeItem('currentUser');
    }
}

