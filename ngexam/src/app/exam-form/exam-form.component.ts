import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionBase } from '../class/question-base';
import { FormGroup } from '@angular/forms';
import { QuestionControlService } from '../service/question-control.service';
import { UserContextService } from '../service/user-context.service';
import { QuestionFormData } from '../class/question';
import { ScoreService } from '../service/score.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.scss'],
  providers: [QuestionControlService]
})
export class ExamFormComponent implements OnInit, OnChanges {

  @Input() questionList: QuestionBase[];
  @Input() examName: string;
  questionData: QuestionFormData;

  form: FormGroup;
  constructor(
    private router: Router,
    private qcs: QuestionControlService,
    private usc: UserContextService,
    private scoreService: ScoreService,
    private nzmsg: NzMessageService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.questionList);
    if (this.questionList) {
      this.form = this.qcs.toFormGroup(this.questionList);
      console.log(this.form);
    }
  }

  onSubmit(): void {

    console.log(this.form.value);
    if (!Object.values(this.form.value).every(val => val !== 0)) {
      this.nzmsg.warning('You have quesstion that do not answer!');
      return;
    }
    this.score();
  }

  score(): void {
    this.questionData = this.getQuestionData();
    this.scoreService.mark(this.questionData).subscribe(res => {
      console.log(res);
      if (res.code === 0) {
        this.scoreService.score = res.score;
        this.router.navigate(['examMessage']);
      } else {
        this.nzmsg.error('something wrong, please try again！');
      }
    });
  }

  getQuestionData(): QuestionFormData {
    const questionData: QuestionFormData = {
      examName: this.examName as string,
      userName: this.usc.user ? this.usc.user.username : 'tourist' as string,
      questions: this.form.value as Array<any>,
      date: new Date().getTime() as number
    };
    return questionData;
  }
}