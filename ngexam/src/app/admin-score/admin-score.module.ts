import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AdminScoreRoutingModule } from './admin-score-routing.module';
import { AdminScoreComponent } from './admin-score.component';
import { MainPipeModule } from '../main-pipe/main-pipe.module'

@NgModule({
  declarations: [AdminScoreComponent],
  imports: [
    CommonModule,
    AdminScoreRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    MainPipeModule
  ]
})
export class AdminScoreModule { }
