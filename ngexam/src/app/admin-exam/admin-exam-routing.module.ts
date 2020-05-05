import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminExamComponent } from './admin-exam.component';
import { AuthGuardService } from '../service/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: AdminExamComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminExamRoutingModule { }
