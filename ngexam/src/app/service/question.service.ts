import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../class/config';
import { Question } from '../class/question';
import { Resdata } from '../class/resdata';
import { Observable } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { HttpErrorHandleService, HandleError } from './http-error-handle.service';
import { MessageService } from './message.service';
import { UserContextService } from './user-context.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private handleError: HandleError;
  private token = 'woshitoken';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': this.token
    })
  };

  constructor(
    private ucs: UserContextService,
    private http: HttpClient,
    private config: Config,
    private httpErrorHandleService: HttpErrorHandleService,
    private messageService: MessageService
  ) {
    this.handleError = this.httpErrorHandleService.createHandleError('QuestionService');
  }

  getQuestionList(examId: string, searchField?: Array<number>, isadmin?: number): Observable<Resdata> {
    return this.http.post<any>(`${this.config.url}/question/getQuestionList`,
      { eid: examId, searchType: searchField, isAdmin: isadmin }, this.httpOptions).pipe(
        mergeMap(resdata => this.log(resdata)),
        catchError(this.handleError('getQuestionList', ''))
      );
  }

  createQuestion(AddData: Question): Observable<Resdata> {
    return this.http.post<Resdata>(`${this.config.url}/question/createQuestion`, AddData, this.httpOptions).pipe(
      mergeMap(resdata => this.log(resdata)),
      catchError(this.handleError('questionCourse', ''))
    );
  }

  private log(resdata: any) {
    return this.messageService.add(
      {
        data: resdata,
        log: {
          username: this.ucs.user ? this.ucs.user.username : 'The user are not log in',
          message: 'questionService.log',
          date: new Date().getTime()
        }
      }
    );
  }
}
