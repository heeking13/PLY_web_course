import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../class/config';
import { loginUser, UpdateUser, AddUser } from '../class/user';
import { Resdata } from '../class/resdata'
import { Observable } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { HttpErrorHandleService, HandleError } from './http-error-handle.service';
import { MessageService } from './message.service';
import { UserContextService } from './user-context.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private handleError: HandleError;
  private token = 'pass';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': this.token
    })
  };

  constructor(
    private http: HttpClient,
    private config: Config,
    private httpErrorHandleService: HttpErrorHandleService,
    private messageService: MessageService,
    private ucs: UserContextService
  ) {
    this.handleError = this.httpErrorHandleService.createHandleError('UseService');
  }

  login(loginData: loginUser): Observable<Resdata> {
    const url = loginData.auth === 'admin' ? `${this.config.url}/admin` : `${this.config.url}/user`;
    return this.http.post<any>(`${url}/login`, loginData, this.httpOptions).pipe(
      mergeMap(resdata => this.log(resdata)),
      catchError(this.handleError('checklogin', ''))
    );
  }

  getOneUserById(Id: string, auth: string): Observable<Resdata> {
    const url = auth === 'admin' ? `${this.config.url}/admin` : `${this.config.url}/user`;
    return this.http.post<any>(`${url}/getOneUserById`, { id: Id }, this.httpOptions).pipe(
      mergeMap(resdata => this.log(resdata)),
      catchError(this.handleError('getOneUserById', ''))
    );
  }

  editUser(Data: UpdateUser): Observable<Resdata> {
    const url = Data.auth === 'admin' ? `${this.config.url}/admin` : `${this.config.url}/user`;
    return this.http.post<any>(`${url}/editUser`, Data, this.httpOptions).pipe(
      mergeMap(resdata => this.log(resdata)),
      catchError(this.handleError('editUser', ''))
    );
  }

  getAdminList(): Observable<Resdata> {
    return this.http.post<any>(`${this.config.url}/admin/getAdminList`, {}, this.httpOptions).pipe(
      mergeMap(resdata => this.log(resdata)),
      catchError(this.handleError('getAdminList', ''))
    );
  }

  getStudentList(): Observable<Resdata> {
    return this.http.post<any>(`${this.config.url}/user/getStudentList`, {}, this.httpOptions).pipe(
      mergeMap(resdata => this.log(resdata)),
      catchError(this.handleError('getStudentList', ''))
    );
  }

  //add admin
  addAdmin(Data: AddUser): Observable<Resdata> {
    return this.http.post<any>(`${this.config.url}/admin/addAdmin`, Data, this.httpOptions).pipe(
      mergeMap(resdata => this.log(resdata)),
      catchError(this.handleError('addAdmin', ''))
    );
  }

  //add student
  addStudent(Data: AddUser): Observable<Resdata> {
    return this.http.post<any>(`${this.config.url}/user/addStudent`, Data, this.httpOptions).pipe(
      mergeMap(resdata => this.log(resdata)),
      catchError(this.handleError('addStudent', ''))
    );
  }

  private log(resdata: any) {
    const obj = {
      data: resdata,
      log: {
        username: 'Not Login User',
        message: 'userService.log',
        date: new Date().getTime()
      }
    };
    if (resdata.userInfo.username) {
      obj.log.username = resdata.userInfo.username;
    } else if (this.ucs.user.username) {
      obj.log.username = this.ucs.user.username;
    }
    return this.messageService.add(obj);
  }
}
