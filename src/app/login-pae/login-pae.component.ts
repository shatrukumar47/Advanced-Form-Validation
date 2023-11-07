import { Component } from '@angular/core';
import axios from "axios";
import {Router} from "@angular/router";
import { AuthServiceService } from '../service/auth-service.service';

@Component({
  selector: 'app-login-pae',
  templateUrl: './login-pae.component.html',
  styleUrls: ['./login-pae.component.css']
})
export class LoginPaeComponent {
  email:string = "";
  password: string = "";
  loading: boolean = false;

  constructor(private router: Router, private authServices: AuthServiceService){}

  async handleSubmit(){
    if(this.email && this.password){
      this.loading = true;
      try {
        let res = await axios.get(`https://advance-angular-form-validation-json.onrender.com/users?email=${this.email}`);
        console.log(res.data)
        if(res.data.length === 0){
          this.loading = false;
          alert("⚠ User Not Found !!");
        }else
        if(res.data[0].password !== this.password){
          this.loading = false;
          alert("❌ Incorrect password !!")
        }else{
          this.loading = false;
          localStorage.setItem("userId", JSON.stringify(res.data[0].id))
          alert("Logged in successfully ✔");
          this.authServices.login();
          this.router.navigate(["/home"])
        }
      } catch (error) {
        this.loading=false;
        console.log(error)
      }
    }else{
      alert("❌ Enter valid inputs !!")
    }
  }
}
