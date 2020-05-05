export class Exam {
    _id: string;
    examName: string;
    examInfo?: string;
    state: number;
    date: number;
}
export class AddExam {
    examName: string;
    examInfo?: string;
    state: number;
    date: number;
}

export class SetExamState {
    mapOfCheckedId: Array<string>;
    state: number;
}