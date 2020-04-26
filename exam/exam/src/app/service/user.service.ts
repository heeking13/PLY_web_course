import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../class/config'
import { loginUser } from '../class/user';
import { Resdata } from '../class/resdata'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private token = '?';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': this.token
    })
  };
  constructor(private http: HttpClient, private config: Config) { }
  login(loginData: loginUser): Observable<Resdata> {
    const url = loginData.auth === 'admin' ? `${this.config.url}/admin` : `${this.config.url}/user`;
    return this.http.post<any>(`${url}/login`, loginData, this.httpOptions);
  }
}
