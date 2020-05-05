import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '../class/question-base';

@Component({
  selector: 'app-exam-form-question',
  templateUrl: './exam-form-question.component.html',
  styleUrls: ['./exam-form-question.component.scss']
})
export class ExamFormQuestionComponent implements OnInit {
  @Input() question: QuestionBase;
  @Input() form: FormGroup;
  checkboxArr: number[] = [];
  constructor() { }

  ngOnInit() {
  }

  setCheckBoxValue(element: HTMLFormElement, formControlName: string): void {
    if (!this.checkboxArr.includes(+element.value)) {
      this.checkboxArr.push(+element.value);
    } else {
      this.checkboxArr.splice(this.checkboxArr.findIndex(v => +v === +element.value), 1);
    }
    this.form.patchValue({
      [formControlName]: this.checkboxArr
    });
  }

}
