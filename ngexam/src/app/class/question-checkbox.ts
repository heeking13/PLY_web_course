import { QuestionBase } from './question-base';
import { QuestionInterface } from '../interface/question-interface';
import { OnInit } from '@angular/core';


export class QuestionCheckbox extends QuestionBase {
    controlType = 1;

    constructor(public options: QuestionInterface) {
        super(options);
        this.questions = options.questions || [];
    }
}
