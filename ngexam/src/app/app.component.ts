import { Component } from '@angular/core';
import { UserContextService } from './service/user-context.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Online Exam';
  constructor(public userContextService: UserContextService) {
    this.userContextService.loginMessage();
  }
  logout(): void {
    this.userContextService.logout();
  }
}
