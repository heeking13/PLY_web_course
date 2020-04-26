import { Component } from '@angular/core';
import { UserContextService } from './service/user-context.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'exam';
  constructor(public userContextService: UserContextService) {
    this.userContextService.loginMessage();
  }
}
