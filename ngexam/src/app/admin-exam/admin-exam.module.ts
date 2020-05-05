import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminExamComponent } from './admin-exam.component';
import { AdminExamRoutingModule } from './admin-exam-routing.module';
import { MainPipeModule } from '../main-pipe/main-pipe.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AdminExamComponent],
  imports: [
    CommonModule,
    AdminExamRoutingModule,
    MainPipeModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminExamModule { }
