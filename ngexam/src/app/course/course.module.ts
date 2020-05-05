import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainPipeModule } from '../main-pipe/main-pipe.module';


@NgModule({
  declarations: [CourseComponent],
  imports: [
    CommonModule,
    CourseRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    MainPipeModule
  ]
})
export class CourseModule { }
