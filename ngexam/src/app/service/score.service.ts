import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../class/config';
import { Resdata } from '../class/resdata';
import { Observable } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { HttpErrorHandleService, HandleError } from './http-error-handle.service';
import { MessageService } from './message.service';
import { UserContextService } from './user-context.service';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private handleError: HandleError;
  private token = 'woshitoken';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': this.token
    })
  };

  score = -1;
  point: 1;

  constructor(
    private http: HttpClient,
    private config: Config,
    private httpErrorHandleService: HttpErrorHandleService,
    private messageService: MessageService,
    private ucs: UserContextService
  ) {
    this.handleError = this.httpErrorHandleService.createHandleError('ScoreService');
  }

  mark(data): Observable<Resdata> {
    return this.http.post<any>(`${this.config.url}/score/mark`, data, this.httpOptions).pipe(
      mergeMap(resdata => this.log(resdata)),
      catchError(this.handleError('mark', ''))
    );
  }

  getScoreList(): Observable<Resdata> {
    return this.http.post<any>(`${this.config.url}/score/getScoreList`, {}, this.httpOptions).pipe(
      mergeMap(resdata => this.log(resdata)),
      catchError(this.handleError('getScoreList', ''))
    );
  }


  private log(resdata: any) {
    return this.messageService.add(
      {
        data: resdata,
        log: {
          username: this.ucs.user ? this.ucs.user.username : 'The user are not log in',
          message: 'ScoreService.log',
          date: new Date().getTime()
        }
      }
    );
  }
}
