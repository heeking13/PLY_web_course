import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ExamRoutingModule } from './exam-routing.module';
import { ExamComponent } from './exam.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExamFormComponent } from '../exam-form/exam-form.component';
import { ExamFormQuestionComponent } from '../exam-form-question/exam-form-question.component';


@NgModule({
  declarations: [ExamComponent, ExamFormComponent, ExamFormQuestionComponent],
  imports: [
    CommonModule,
    ExamRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ExamModule { }
