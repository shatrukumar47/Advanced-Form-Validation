import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Form } from '../models';
import { ToastrService } from 'ngx-toastr';
import {Router} from "@angular/router";
import axios from "axios"

@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css'],
})
export class MyFormComponent {
  @ViewChild('userForm') userForm: any;

  user: Form = {
    id: 1,
    image: "",
    username: "",
    DOB:"",
    phone: "",
    email: "",
    password: "",
    address: ""
  };

  constructor(private toast: ToastrService, private router: Router) {}

  onSubmit(event: NgForm) {
    if (event.value.password !== event.value.confirm_password) {
      alert(
        '⚠ Password Mismatch: The password and confirm password do not match. Please make sure to enter the same password in both fields.'
      );
    } else {
      if (this.checkPasswordStrength(event.value.password)) {
        this.user = {
          id: Math.floor(Math.random() * 1000),
          image: "https://img.freepik.com/premium-vector/business-man-face-portrait-icon_48369-5527.jpg?size=626&ext=jpg&uid=R109767327&ga=GA1.1.1257944628.1683352118&semt=ais",
          username: event.value.username,
          DOB: event.value.DOB,
          phone: event.value.phone,
          email: event.value.email,
          password: event.value.password,
          address: event.value.address
        };
        console.log(this.user)
        axios.post("https://advance-angular-form-validation-json.onrender.com/users", this.user)
        .then((res)=>{
          event.resetForm();
          alert('Registered succssfully ✔');
          this.router.navigate(["/login"]);
        }).catch((err)=> console.log(err))
      }else{
        alert("⚠ Password should contain a combination of at least one uppercase letter, one lowercase letter, one digit, and one special character.")
      }
    }
  }

  checkPasswordStrength(password: string): boolean {
    const re = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/
    return re.test(password);
  }
}
