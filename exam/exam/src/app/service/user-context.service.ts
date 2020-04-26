import { Injectable } from '@angular/core';
import { UserInfo } from '../class/user';

@Injectable({
  providedIn: 'root'
})
export class UserContextService {
  //store user information
  user: UserInfo;
  constructor() { }

  //check if the user is in web
  loginMessage(): void {
    // this.user = {
    //   id: '00123',
    //   username: 'heqing',
    //   token: 'abc'
    // };
  }
}
