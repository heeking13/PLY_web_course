import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { QuestionBase } from '../class/question-base';

@Injectable()
export class QuestionControlService {

  constructor() { }

  toFormGroup(questions: QuestionBase[]) {
    const group: any = {};
    questions.forEach(question => {
      group[question.id] = new FormControl(0);
    });
    return new FormGroup(group);
  }
}
