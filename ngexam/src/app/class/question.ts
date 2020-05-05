export class Question {
    examId: string;
    answer: Array<number>;
    question0: string;
    question1: string;
    question2: string;
    question3: string;
    questionName: string;
    questionInfo: string;
    type: number;
    date: number;
}

export class QuestionFormData {
    examName: string;
    userName: string;
    questions: Array<any>;
    date: number;
}