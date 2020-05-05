import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamMessageComponent } from './exam-message.component';
import { ExamMessageRoutingModule } from './exam-message-routing.module';


@NgModule({
  declarations: [ExamMessageComponent],
  imports: [
    CommonModule,
    ExamMessageRoutingModule
  ]
})
export class ExamMessageModule { }
