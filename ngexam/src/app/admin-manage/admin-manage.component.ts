import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { UserService } from '../service/user.service';
import { User, AddUser } from '../class/user'
import { Buffer } from 'buffer';
import { lengthValidator } from '../shared/length-validator.directive';
import { NzMessageService } from 'ng-zorro-antd';
import { PageService } from '../service/page.service';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-admin-manage',
  templateUrl: './admin-manage.component.html',
  styleUrls: ['./admin-manage.component.scss'],
  providers: [PageService]
})
export class AdminManageComponent implements OnInit {
  isOkLoading = false;
  tableLoading: boolean;
  @ViewChild('boy') boy: ElementRef;
  addUser: AddUser;

  //teacher form
  createForm: FormGroup;
  user: User;
  adminList: User[] = [];

  //student form
  studentForm: FormGroup;
  student: User;
  studentList: User[] = [];

  //teacher modal
  isVisible = false;

  //students modal
  isStudentVisible = false;

  constructor(
    public pageService: PageService,
    private fb: FormBuilder,
    private userService: UserService,
    private nzMessageService: NzMessageService
  ) { }

  ngOnInit(): void {
    //teacher form
    this.createForm = this.fb.group({
      username: [null, [Validators.required], [lengthValidator(/^[a-zA-Z\d]{5,20}$/)]],
      password: [null, [Validators.required], [lengthValidator(/^[a-zA-Z\d]{5,10}$/)]],
      info: [null, [Validators.maxLength(300)]],
      sex: [1],
      remember: [true],
      auth: [{ value: null }],
      checkPassword: ['', [this.confirmValidator]]
    });

    //student form
    this.studentForm = this.fb.group({
      username: [null, [Validators.required], [lengthValidator(/^[a-zA-Z\d]{5,20}$/)]],
      password: [null, [Validators.required], [lengthValidator(/^[a-zA-Z\d]{5,10}$/)]],
      info: [null, [Validators.maxLength(300)]],
      sex: [1],
      remember: [true],
      auth: [{ value: null }],
      checkPassword: ['', [this.confirmStudentValidator]]
    });

    this.getAdminList();
    this.getStudentList();
  }

  //teacher
  get username() { return this.createForm.get('username'); }
  get password() { return this.createForm.get('password'); }
  get info() { return this.createForm.get('info'); }

  //student
  get studentusername() { return this.studentForm.get('username'); }
  get studentpassword() { return this.studentForm.get('password'); }
  get studentinfo() { return this.studentForm.get('info'); }

  //teacher modal
  showModal(auth: number): void {
    if (auth === 0) {
      this.createForm.patchValue({
        auth: 'admin'
      });
    }
    this.isVisible = true;
    this.boy.nativeElement.checked = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  //students modal
  showStudentModal(auth: number): void {
    if (auth === 1) {
      this.studentForm.patchValue({
        auth: 'user'
      });
    }
    this.isStudentVisible = true;
    this.boy.nativeElement.checked = true;
  }

  handleStudentOk(): void {
    console.log('Button ok clicked!');
    this.isStudentVisible = false;
  }

  handleStudentCancel(): void {
    console.log('Button cancel clicked!');
    this.isStudentVisible = false;
  }

  //teacher
  //teacher password confirmation
  updateConfirmValidator(): void {
    /**wait for refresh value */
    Promise.resolve().then(() => this.createForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.createForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }

  addAdmin(): void {
    this.addUser = this.getAdminData();
    console.log(this.addUser);
    this.userService.addAdmin(this.addUser).subscribe(res => {
      if (res.code === 0) {
        this.createForm.reset();
        this.isVisible = false;
        this.getAdminList();
        this.isOkLoading = false;
        this.nzMessageService.success('Add Teacher Successfully');
      } else {
        this.nzMessageService.error('Add Teacher Failed');
      }
    });
  }

  getAdminData(): AddUser {
    const formModel = this.createForm.value;
    const saveUserData: AddUser = {
      sex: Number(formModel.sex) as number,
      auth: formModel.auth as string,
      password: Buffer.from(formModel.password).toString('base64') as string,
      username: formModel.username as string,
      date: new Date().getTime() as number,
      info: formModel.info as string
    };
    if (formModel.info) { saveUserData.info = formModel.info; }
    return saveUserData;
  }

  getAdminList(): void {
    this.userService.getAdminList().subscribe(res => {
      console.log(res);
      this.adminList = res.userInfo;
    });
  }

  submitForm(): void {
    this.isOkLoading = true;
    for (const i in this.createForm.controls) {
      this.createForm.controls[i].markAsDirty();
      this.createForm.controls[i].updateValueAndValidity();
    }
    console.log(this.createForm.value);
    this.addAdmin();
  }

  //students
  //student password confirmation
  updateStudentConfirmValidator(): void {
    /**wait for refresh value */
    Promise.resolve().then(() => this.studentForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmStudentValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.studentForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }

  getStudentList(): void {
    this.userService.getStudentList().subscribe(res => {
      console.log(res);
      this.studentList = res.userInfo;
    });
  }

  addStudent(): void {
    this.addUser = this.getStudentData();
    console.log(this.addUser);
    this.userService.addStudent(this.addUser).subscribe(res => {
      if (res.code === 0) {
        this.studentForm.reset();
        this.isStudentVisible = false;
        this.isOkLoading = false;
        this.getStudentList();
        this.nzMessageService.success('Add Student Successfully');
      } else {
        this.nzMessageService.error('Add Student Failed');
      }
    });
  }

  getStudentData(): AddUser {
    const formModel = this.studentForm.value;
    const saveUserData: AddUser = {
      sex: Number(formModel.sex) as number,
      auth: formModel.auth as string,
      password: Buffer.from(formModel.password).toString('base64') as string,
      username: formModel.username as string,
      date: new Date().getTime() as number,
      info: formModel.info as string
    };
    if (formModel.info) { saveUserData.info = formModel.info; }
    return saveUserData;
  }

  studentSubmitForm(): void {
    this.isOkLoading = true;
    for (const i in this.studentForm.controls) {
      this.createForm.controls[i].markAsDirty();
      this.createForm.controls[i].updateValueAndValidity();
    }
    console.log(this.studentForm.value);
    this.addStudent();
  }

}
