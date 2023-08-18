import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserInformationService {
  getData() {
    const storedData = localStorage.getItem('currentUser');
    return storedData ? JSON.parse(storedData) : null;
  }

}