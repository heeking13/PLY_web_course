import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainPipeModule } from '../main-pipe/main-pipe.module';
import { AdminManageRoutingModule } from './admin-manage-routing.module';
import { AdminManageComponent } from './admin-manage.component';


@NgModule({
  declarations: [AdminManageComponent],
  imports: [
    CommonModule,
    AdminManageRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    MainPipeModule
  ]
})
export class AdminManageModule { }
