

export class QuestionBase {
    id: string;
    questionName: string;
    controlType: number;
    questions: { key: string, value: number }[] = [];
    constructor(options: {
        id?: string;
        questionName?: string;
    } = {}) {
        this.id = options.id || '';
        this.questionName = options.questionName || '';
    }
}

