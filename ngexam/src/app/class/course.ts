export class Course {
    _id: string;
    courseName: string;
    courseInfo: string;
    date: number;
    populateExam: Array<any>;

}
export class AddCourse {
    courseName: string;
    courseInfo: string;
    date: number;
}