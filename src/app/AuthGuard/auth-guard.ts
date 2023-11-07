import {Injectable, inject} from "@angular/core";
import {ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn, Router} from "@angular/router";
import { AuthServiceService } from "../service/auth-service.service";

@Injectable({
    providedIn: "root"
})

class AuthGuard{
    constructor(private authServices: AuthServiceService, private router: Router){}
    canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot): boolean{
        if(this.authServices.isLoggedIn()){
            return true;
        }

        this.router.navigate(["/login"]);
        return false;
    }
}

export const  isAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean =>{
    return inject(AuthGuard).canActivate(route, state);
}
