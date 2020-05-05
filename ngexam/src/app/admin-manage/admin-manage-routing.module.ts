import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminManageComponent } from './admin-manage.component';
import { AuthGuardService } from '../service/auth-guard.service';

const routes: Routes = [{
  path: '',
  component: AdminManageComponent,
  canActivate: [AuthGuardService]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminManageRoutingModule { }
