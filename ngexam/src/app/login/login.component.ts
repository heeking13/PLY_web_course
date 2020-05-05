import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { UserContextService } from '../service/user-context.service';
import { lengthValidator } from '../shared/length-validator.directive';
import { loginUser } from '../class/user';
import { Buffer } from 'buffer';
import { CookieService } from 'ngx-cookie-service';
import { NzMessageService } from 'ng-zorro-antd';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  //the type of submit data
  loginData: loginUser;

  submitForm(): void {
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }
    this.login();
  }

  constructor(private fb: FormBuilder,
    public userContextService: UserContextService,
    private userService: UserService,
    private authService: AuthService,
    private cookieService: CookieService,
    private nzMessageService: NzMessageService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [null, [Validators.required], [lengthValidator(/^[a-zA-Z\d]{5,20}$/)]],
      password: [null, [Validators.required], [lengthValidator(/^[a-zA-Z\d]{5,10}$/)]],
      remember: [true],
      auth: ['user']
    });
  }

  get userName() { return this.loginForm.get('userName'); }
  get password() { return this.loginForm.get('password'); }

  login(): void {
    this.loginData = this.getLoginData();
    console.log(this.loginData);
    this.userService.login(this.loginData).subscribe(res => {
      console.log(res);
      if (res.code == 0) {
        if (this.loginData.auth === 'admin') {
          res.userInfo.auth = 'admin';
          this.authService.isAdmin = true;
        } else {
          res.userInfo.auth = 'user';
        }
        if (this.loginData.remember) {

          const time = 48 * 60 * 60 * 1000; //set expire time
          const timer = new Date(new Date().getTime() + time);
          this.cookieService.set('userInfo', JSON.stringify(res.userInfo), timer);
        } else {
          this.cookieService.set('userInfo', JSON.stringify(res.userInfo));
        }
        this.userContextService = res.userInfo;
        location.reload();
      } else {
        this.nzMessageService.error(res.message ? res.message : 'Username or password are wrong');
      }
    });
  }

  getLoginData(): loginUser {
    const formModel = this.loginForm.value;
    const saveLoginData: loginUser = {
      username: formModel.userName as string,
      //for security
      password: Buffer.from(formModel.password).toString('base64') as string,
      auth: formModel.auth as string,
      remember: formModel.remember as boolean,

    };
    return saveLoginData;
  }

}
