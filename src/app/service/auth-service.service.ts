import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  constructor() { }
  

  isLoggedIn():Observable<boolean>{
    return this.isAuthenticated.asObservable();
  }

  login(){
    localStorage.setItem('isAuth', 'true');
    this.isAuthenticated.next(true);
  }

  logout(){
    this.isAuthenticated.next(false);
  }
}
