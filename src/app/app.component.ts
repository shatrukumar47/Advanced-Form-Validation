import { Component, OnInit, NgZone } from '@angular/core';
import { AuthServiceService } from './service/auth-service.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'user-validation';
  isAuth: boolean = false;

  constructor(private authServices: AuthServiceService, private ngZone: NgZone, private router: Router){}

  ngOnInit(): void {
    this.ngZone.run(()=>{
      const isAuth = localStorage.getItem('isAuth');
      if(isAuth){
        this.isAuth = isAuth==='true';
      }else{
        this.isAuth = false;
      }
    })
  }

  handleProfile(){
    this.router.navigate(["/user-profile"])
  }

  handleLogout(){
    this.isAuth = false;
    this.authServices.logout();
    this.router.navigate([""]);
    localStorage.setItem('isAuth', 'false');
  }
}
