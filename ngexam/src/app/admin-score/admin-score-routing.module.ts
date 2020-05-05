import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminScoreComponent } from './admin-score.component'
import { AuthGuardService } from '../service/auth-guard.service'
const routes: Routes = [{
  path: '',
  component: AdminScoreComponent,
  canActivate: [AuthGuardService]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminScoreRoutingModule { }
