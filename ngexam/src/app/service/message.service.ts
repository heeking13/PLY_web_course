import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../class/config';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private token = 'pass';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': this.token
    })
  };

  constructor(
    private http: HttpClient,
    private config: Config) { }

  add(resdata: any): Observable<any> {
    return this.http.post<any>(`${this.config.url}/log/message`, resdata, this.httpOptions);
  }

  err(errmsg: string): void {
    console.log(errmsg);
  }

  getOneDataLog(resdata: any): Observable<any> {
    return this.http.post<any>(`${this.config.url}/log/getOneDataLog`, resdata, this.httpOptions);
  }
}
