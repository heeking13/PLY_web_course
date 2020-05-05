import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../class/config';
import { AddCourse, Course } from '../class/course';
import { Resdata } from '../class/resdata';
import { Observable } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { HttpErrorHandleService, HandleError } from './http-error-handle.service';
import { MessageService } from './message.service';
import { UserContextService } from './user-context.service';

interface AllocateExam {
  course_id: string;
  examList: Array<string>;
}

interface Page {
  pageIndex: number;
  pageSize: number;
  //searchValue?: string;
}

interface DeleteAllocate {
  courseId: string;
  examId: string;
}

@Injectable()
export class CourseService {
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
    this.handleError = this.httpErrorHandleService.createHandleError('CourseService');
  }

  getcourseList(pageData?: Page): Observable<Resdata> {
    return this.http.post<any>(`${this.config.url}/course/getcourseList`, pageData, this.httpOptions).pipe(
      mergeMap(resdata => this.log(resdata)),
      catchError(this.handleError('getcourseList', ''))
    );
  }

  createCourse(AddData: AddCourse): Observable<Resdata> {
    return this.http.post<any>(`${this.config.url}/course/createCourse`, AddData, this.httpOptions).pipe(
      mergeMap(resdata => this.log(resdata)),
      catchError(this.handleError('createCourse', ''))
    );
  }

  //edit course content
  updateCourse(Data: Course): Observable<Resdata> {
    return this.http.post<Resdata>(`${this.config.url}/course/updateCourse`, Data, this.httpOptions).pipe(
      mergeMap(resdata => this.log(resdata)),
      catchError(this.handleError('updateCourse', ''))
    );
  }

  //distribute exam
  allocateExam(data: AllocateExam): Observable<Resdata> {
    return this.http.post<any>(`${this.config.url}/course/allocateExam`, data, this.httpOptions).pipe(
      mergeMap(resdata => this.log(resdata)),
      catchError(this.handleError('allocateExam', ''))
    );
  }

  // delete course
  deleteCourse(cid: string): Observable<Resdata> {
    return this.http.post<Resdata>(`${this.config.url}/course/deleteCourse`, { courseId: cid }, this.httpOptions).pipe(
      mergeMap(resdata => this.log(resdata)),
      catchError(this.handleError('deleteCourse', ''))
    );
  }

  // delete distribute exam
  deleteAllocate(data: DeleteAllocate): Observable<Resdata> {
    return this.http.post<any>(`${this.config.url}/course/deleteAllocate`, data, this.httpOptions).pipe(
      mergeMap(resdata => this.log(resdata)),
      catchError(this.handleError('deleteAllocate', ''))
    );
  }

  private log(resdata: any) {
    return this.messageService.add(
      {
        data: resdata,
        log: {
          username: this.ucs.user ? this.ucs.user.username : 'The user are not log in',
          message: 'courseService.log',
          date: new Date().getTime()
        }
      }
    );
  }
}
