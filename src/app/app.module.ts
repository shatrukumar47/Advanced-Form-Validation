import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { initFlowbite } from 'flowbite';
import { MyFormComponent } from './my-form/my-form.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginPaeComponent } from './login-pae/login-pae.component';
import { RouterModule , Routes} from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { isAuthGuard } from './AuthGuard/auth-guard';

const appRoutes: Routes = [
  {path: "", component: MyFormComponent},
  {path: "login", component: LoginPaeComponent},
  {path: "home", component: HomePageComponent, canActivate:[isAuthGuard]},
  {path: "user-profile", component: UserProfileComponent, canActivate:[isAuthGuard]},

]

@NgModule({
  declarations: [AppComponent, MyFormComponent, LoginPaeComponent, HomePageComponent, UserProfileComponent],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule implements OnInit {
  ngOnInit(): void {
    initFlowbite();
  }
}
