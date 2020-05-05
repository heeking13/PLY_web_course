import { Injectable } from '@angular/core';
import { UserInfo } from '../class/user';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service'
@Injectable({
  providedIn: 'root'
})
export class UserContextService {
  //store user information
  user: UserInfo;

  constructor(private cookieService: CookieService, private authService: AuthService) { }

  //check if the user is in web
  loginMessage(): void {
    if (this.cookieService.check('userInfo') && this.cookieService.get('userInfo') !== 'undefined') {
      this.user = JSON.parse(this.cookieService.get('userInfo'));
      if (this.user.auth === 'admin') {
        this.authService.isAdmin = true;
      }
    }
  }
  logout(): void {
    this.cookieService.delete('userInfo');
    this.user = null;
    location.reload();
  }
}
