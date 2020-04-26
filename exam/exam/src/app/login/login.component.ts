import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { UserContextService } from '../service/user-context.service';
import { lengthValidator } from '../shared/length-validator.directive';
import { loginUser } from '../class/user';
import { Buffer } from 'buffer';

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

  constructor(private fb: FormBuilder, public userContextService: UserContextService, private userService: UserService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [null, [Validators.required], [lengthValidator(/^[a-zA-Z\d]+$/)]],
      password: [null, [Validators.required], [lengthValidator(/^[a-zA-Z\d]+$/)]],
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
