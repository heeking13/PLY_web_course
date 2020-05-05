import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../class/config';
import { AddExam, SetExamState, Exam } from '../class/exam';
import { Resdata } from '../class/resdata';
import { Observable } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { HttpErrorHandleService, HandleError } from './http-error-handle.service';
import { MessageService } from './message.service';
import { UserContextService } from './user-context.service';

interface Page {
  pageIndex: number;
  pageSize: number;
  //searchValue?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExamService {

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
    this.handleError = this.httpErrorHandleService.createHandleError('ExamService');
  }

  getExamList(page?: Page): Observable<Resdata> {
    return this.http.post<any>(`${this.config.url}/exam/getExamList`, page, this.httpOptions).pipe(
      mergeMap(resdata => this.log(resdata)),
      catchError(this.handleError('getExamList', ''))
    );
  }

  createExam(AddData: AddExam): Observable<Resdata> {
    return this.http.post<any>(`${this.config.url}/exam/createExam`, AddData, this.httpOptions).pipe(
      mergeMap(resdata => this.log(resdata)),
      catchError(this.handleError('createExam', ''))
    );
  }

  //get one exam data for transfer exam id
  getOneExam(examId: string): Observable<Exam> {
    return this.http.post<Exam>(`${this.config.url}/exam/getOneExam`, { id: examId }, this.httpOptions).pipe(
      mergeMap(resdata => this.getOneDataLog(resdata)),
      catchError(this.handleError('getOneExam', ''))
    );
  }

  //edit review status
  approved(data: SetExamState): Observable<Resdata> {
    return this.http.post<any>(`${this.config.url}/exam/approved`, data, this.httpOptions).pipe(
      mergeMap(resdata => this.log(resdata)),
      catchError(this.handleError('approved', ''))
    );
  }

  // delete exam
  deleteExam(cid: string): Observable<Resdata> {
    return this.http.post<Resdata>(`${this.config.url}/exam/deleteExam`, { examId: cid }, this.httpOptions).pipe(
      mergeMap(resdata => this.log(resdata)),
      catchError(this.handleError('deleteExam', ''))
    );
  }

  private log(resdata: any) {
    return this.messageService.add(
      {
        data: resdata,
        log: {
          username: this.ucs.user.username ? this.ucs.user.username : 'The user are not log in',
          message: 'ExamService.log',
          date: new Date().getTime()
        }
      }
    );
  }

  private getOneDataLog(resdata: any) {
    return this.messageService.getOneDataLog(
      {
        data: resdata,
        log: {
          username: this.ucs.user ? this.ucs.user.username : 'The user are not log in',
          message: 'ExamService.log',
          date: new Date().getTime()
        }
      }
    );
  }
}
