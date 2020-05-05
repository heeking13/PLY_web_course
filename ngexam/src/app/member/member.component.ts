import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../service/user.service';
import { UserContextService } from '../service/user-context.service';
import { lengthValidator } from '../shared/length-validator.directive';
import { Buffer } from 'buffer';
import { NzMessageService } from 'ng-zorro-antd';
import { User, UpdateUser } from '../class/user';


@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  memberForm: FormGroup;
  user: User;
  updateUser: UpdateUser;
  //get gender
  @ViewChild('boy') boy: ElementRef;
  @ViewChild('girl') girl: ElementRef;


  constructor(
    private fb: FormBuilder,
    public userContextService: UserContextService,
    private userService: UserService,
    private nzMessageService: NzMessageService) { }

  ngOnInit(): void {
    this.memberForm = this.fb.group({
      username: [{ value: null, disabled: true }],
      password: [null, [Validators.required], [lengthValidator(/^[a-zA-Z\d]{5,10}$/)]],
      info: [null, [Validators.maxLength(300)]],
      sex: [null],
      remember: [true],
      auth: [{ value: null, disabled: true }],
      checkPassword: ['', [this.confirmValidator]]
    });
    this.getOneUserById(this.userContextService.user._id, this.userContextService.user.auth);
  }

  get password() { return this.memberForm.get('password'); }
  get info() { return this.memberForm.get('info'); }

  submitForm(): void {
    for (const i in this.memberForm.controls) {
      this.memberForm.controls[i].markAsDirty();
      this.memberForm.controls[i].updateValueAndValidity();
    }
    this.editUser();
  }

  updateConfirmValidator(): void {
    /**wait for refresh value */
    Promise.resolve().then(() => this.memberForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.memberForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }

  //get the data and fill in forms
  getOneUserById(id: string, auth: string) {
    this.userService.getOneUserById(id, auth).subscribe(res => {
      //check if there is error
      if (res.code === 0) {
        this.user = res.userInfo;
        this.memberForm.patchValue({
          username: this.user.username,
          password: Buffer.from(this.user.password, 'base64').toString(),//sercurity
          sex: this.user.sex,
          info: this.user.info,
          auth: this.userContextService.user.auth
        });
        this.user.sex === 1 ? this.boy.nativeElement.checked = true : this.girl.nativeElement.checked = true;
      } else {
        this.nzMessageService.error(res.message ? res.message : 'Get User information failed');
      }
    });
  }

  editUser(): void {
    this.updateUser = this.getUserData();
    this.userService.editUser(this.updateUser).subscribe(res => {
      console.log(res);
      if (res.code === 0) {
        this.memberForm.reset();
        this.memberForm.patchValue({
          username: res.userInfo.username,
          password: Buffer.from(res.userInfo.password, 'base64').toString(),//sercurity
          sex: res.userInfo.sex,
          info: res.userInfo.info,
          auth: this.userContextService.user.auth
        });
        res.userInfo.sex === 1 ? this.boy.nativeElement.checked = true : this.girl.nativeElement.checked = true;
        this.nzMessageService.success('User information edit successfully');
      } else {
        this.nzMessageService.error(res.message ? res.message : 'User information edit failed');
      }
    });
  }

  getUserData(): UpdateUser {
    const formModel = this.memberForm.value;
    const saveUserData: UpdateUser = {
      _id: this.userContextService.user._id as string,
      sex: Number(formModel.sex) as number,
      auth: this.userContextService.user.auth as string,
      password: Buffer.from(formModel.password).toString('base64')
    };
    if (formModel.info) { saveUserData.info = formModel.info; }
    return saveUserData;
  }
}
