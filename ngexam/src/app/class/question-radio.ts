import { QuestionBase } from './question-base';
import { QuestionInterface } from '../interface/question-interface';

export class QuestionRadio extends QuestionBase {
    controlType = 0;

    constructor(public options: QuestionInterface) {
        super(options);
        this.questions = options.questions || [];
    }
}