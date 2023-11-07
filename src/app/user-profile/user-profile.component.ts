import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Form } from '../models';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  @ViewChild('userForm') userForm: any;

  isDisabled: boolean = true;
  url: any = '';

  user: Form = {
    id: 1,
    image: '',
    username: '',
    DOB: '',
    phone: '',
    email: '',
    password: '',
    address: '',
  };

  constructor(private toast: ToastrService, private router: Router) {}

  ngOnInit(): void {
    let id = localStorage.getItem('userId');
    let userId = Number(id);
    axios
      .get(
        `https://advance-angular-form-validation-json.onrender.com/users/${userId}`
      )
      .then((res) => {
        this.user = res.data;
        this.url = this.user.image;
      })
      .catch((err) => console.log(err));
  }

  onFileSelected(imageInput: any) {
    const file = imageInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const imageURL = event.target?.result;
      this.url = imageURL;
    };
  }

  onSubmit(event: NgForm) {
    this.user = { ...this.user, image: this.url };
    console.log(this.user)
    axios.patch(`https://advance-angular-form-validation-json.onrender.com/users/${this.user.id}`, this.user)
    .then((res)=>{
      this.user = res.data;
    }).catch((err)=> console.log(err))
  }

  handleEdit() {
    this.isDisabled = false;
  }

  checkPasswordStrength(password: string): boolean {
    const re = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
    return re.test(password);
  }
}
