import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScoreService } from '../service/score.service';

@Component({
  selector: 'app-exam-message',
  templateUrl: './exam-message.component.html',
  styleUrls: ['./exam-message.component.scss']
})
export class ExamMessageComponent implements OnInit {
  score: number;
  constructor(
    private scoreService: ScoreService,
    private router: Router
  ) { }

  ngOnInit() {

    if (this.scoreService.score >= 0) {
      this.score = this.scoreService.score * 1;
    } else {
      this.router.navigate(['exam']);
    }
  }

}
