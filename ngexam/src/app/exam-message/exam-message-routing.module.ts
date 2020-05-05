import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExamMessageComponent } from './exam-message.component';
const routes: Routes = [{
  path: '',
  component: ExamMessageComponent
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamMessageRoutingModule { }
