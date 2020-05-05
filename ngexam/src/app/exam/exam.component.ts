import { Component, OnInit } from '@angular/core';
import { CourseService } from '../service/course.service';
import { ExamService } from '../service/exam.service';
import { QuestionService } from '../service/question.service';
import { Exam } from '../class/exam';
import { QuestionRadio } from '../class/question-radio';
import { QuestionCheckbox } from '../class/question-checkbox';
import { QuestionBase } from '../class/question-base';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
  providers: [CourseService]
})
export class ExamComponent implements OnInit {

  constructor(
    private courseService: CourseService,
    private examService: ExamService,
    private questionService: QuestionService
  ) { }

  nzOptions: any[] | null = null;
  values: any[] | null = null;

  // the exam which choose
  selectExam: Exam;
  examTitle = 'Online Exam';

  questionList: QuestionBase[];

  ngOnInit(): void {
    this.getcourseList();
  }

  getcourseList(): void {
    this.courseService.getcourseList().subscribe(res => {
      console.log(res.userInfo);
      this.nzOptions = res.userInfo.map(v => {
        if (v.populateExam.length > 0) {
          return {
            value: v._id,
            label: v.courseName,
            children: v.populateExam.map(value => {
              return {
                value: value._id,
                label: value.examName,
                isLeaf: true
              };
            })
          };
        } else {
          return {
            value: v._id,
            label: v.courseName,
            disabled: true
          };
        }
      });
    });
  }

  // get the exam information
  getOneExam(id: string): void {
    this.examService.getOneExam(id).subscribe(res => {
      this.examTitle = res.examName;
      this.selectExam = res;
      this.getQuestionList(this.selectExam._id);
    });
  }

  onChanges(values: any): void {
    this.getOneExam(values[1]);
  }

  // get the exam sheet list
  getQuestionList(examId): void {
    console.log(examId);
    this.questionService.getQuestionList(examId).subscribe(res => {
      console.log(res);
      this.questionList = res.userInfo.map(v => {
        if (v.type === 0) {
          return new QuestionRadio({
            id: v._id,
            questionName: v.questionName,
            questions: [
              { key: v.question0, value: 3 },
              { key: v.question1, value: 5 },
              { key: v.question2, value: 11 },
              { key: v.question3, value: 21 }
            ].filter(r => r.key)
          });
        } else {
          return new QuestionCheckbox({
            id: v._id,
            questionName: v.questionName,
            questions: [
              { key: v.question0, value: 3 },
              { key: v.question1, value: 5 },
              { key: v.question2, value: 11 },
              { key: v.question3, value: 21 }
            ].filter(c => c.key)
          });
        }
      });
    });
  }

}
