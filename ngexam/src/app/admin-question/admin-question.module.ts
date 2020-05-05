import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminQuestionComponent } from './admin-question.component'
import { AdminQuestionRoutingModule } from './admin-question-routing.module';
import { MainPipeModule } from '../main-pipe/main-pipe.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AdminQuestionComponent],
  imports: [
    CommonModule,
    AdminQuestionRoutingModule,
    MainPipeModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminQuestionModule { }
