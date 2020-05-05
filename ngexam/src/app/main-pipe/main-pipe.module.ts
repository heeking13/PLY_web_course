import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatLengthPipe, FormatTimePipe } from './public.pipe';
import { AnswerPipe, QuestionTypePipe } from './question.pipe';
import { UserPipe, UserSexPipe } from './user.pipe';


@NgModule({
  declarations: [FormatLengthPipe, FormatTimePipe, AnswerPipe, QuestionTypePipe, UserPipe, UserSexPipe],
  imports: [
    CommonModule
  ],
  exports: [FormatLengthPipe, FormatTimePipe, AnswerPipe, QuestionTypePipe, UserPipe, UserSexPipe]
})
export class MainPipeModule { }
