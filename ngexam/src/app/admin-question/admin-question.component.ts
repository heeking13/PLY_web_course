import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ExamService } from '../service/exam.service';
import { QuestionService } from '../service/question.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Question } from '../class/question';
import { Exam } from '../class/exam';
import { PageService } from '../service/page.service';


@Component({
  selector: 'app-admin-question',
  templateUrl: './admin-question.component.html',
  styleUrls: ['./admin-question.component.scss'],
  providers: [PageService]
})
export class AdminQuestionComponent implements OnInit {
  //recieve exam id
  examId: string;
  exam$: Observable<Exam>;

  //add new exam sheet
  addQuestion: Question;

  //tips box attribute
  isVisible = false;
  isOkLoading = false;

  //filter attribute
  listOftype = [{ text: 'single', value: 0 }, { text: 'multiple', value: 1 }];
  searchType: Array<number>;

  //add new exam sheet form
  validateForm: FormGroup;
  listOfControl: Array<{ id: number; controlInstance: string }> = [];

  //answer array
  answerArr: Array<{ label: string; value: number }> = [];
  answerArrInit: Array<{ label: string; value: number }> =
    [{ label: 'A', value: 3 }, { label: 'B', value: 5 }, { label: 'C', value: 11 }, { label: 'D', value: 21 }];
  //remove label
  removeArr: Array<number> = [];

  // read data
  questionList: Question[] = [];
  tableLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private examService: ExamService,
    private questionService: QuestionService,
    private nzMessageService: NzMessageService,
    private fb: FormBuilder,
    public pageService: PageService,
    private nzModalService: NzModalService
  ) { }

  ngOnInit() {
    this.exam$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.examId = params.get('id');
        this.getQuestionList();
        return this.examService.getOneExam(params.get('id'));
      })
    );

    this.validateForm = this.fb.group({
      questionName: [null, [Validators.required]],
      questionInfo: [null, [Validators.maxLength(300)]],
      answer: [null],
      type: [0]
    });
    this.addField();
  }

  get questionName() { return this.validateForm.get('questionName'); }
  get questionInfo() { return this.validateForm.get('questionInfo'); }

  // get list data
  getQuestionList(searchField?: Array<number>): void {
    this.tableLoading = true;
    this.questionService.getQuestionList(this.examId, searchField, 1).subscribe(res => {
      this.tableLoading = false;
      this.questionList = res.userInfo;
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    let id;
    let control;
    if (this.removeArr.length > 0) {
      id = this.removeArr[0];
      this.removeArr.splice(0, 1);
    } else {
      id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;
    }
    control = {
      id,
      controlInstance: `question${id}`
    };
    const index = this.listOfControl.push(control);
    console.log(this.listOfControl[this.listOfControl.length - 1]);
    this.validateForm.addControl(this.listOfControl[index - 1].controlInstance, new FormControl(null, Validators.required));
    this.answerArr.push(this.answerArrInit[id]);
  }

  removeField(i: { id: number; controlInstance: string }, e: MouseEvent, item: { label: string; value: number }): void {
    e.preventDefault();
    if (this.listOfControl.length > 1) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      console.log(this.listOfControl);
      this.validateForm.removeControl(i.controlInstance);
      this.answerArr.splice(index, 1);
      if (this.validateForm.value.answer) {
        this.validateForm.patchValue({
          answer: this.validateForm.value.answer.filter(value => value !== item.value)
        })
      }
      this.removeArr.push(i.id);
    }
  }

  submitForm(): void {
    if (+this.validateForm.value.type === 0 && this.validateForm.value.answer.length > 1) {
      this.nzMessageService.error('Single question cannot have multiple answer!');
      return;
    }

    this.isOkLoading = true;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm.value);
    this.createQuestion();
  }

  createQuestion(): void {
    this.addQuestion = this.getAddQuestion();
    this.questionService.createQuestion(this.addQuestion).subscribe(res => {
      console.log(res);
      if (res.code === 0) {
        this.isVisible = false;
        this.isOkLoading = false;
        this.validateForm.reset();
        this.getQuestionList();
        this.nzMessageService.success('Add exam sheet success！');
      } else {
        this.isOkLoading = false;
        this.nzMessageService.error('Add exam sheet failed！');
      }
    });
  }

  getAddQuestion(): Question {
    const formModel = this.validateForm.value;
    const saveQuestionData: Question = {
      examId: this.examId as string,
      answer: formModel.answer as Array<number>,
      question0: formModel.question0 as string,
      question1: formModel.question1 as string,
      question2: formModel.question2 as string,
      question3: formModel.question3 as string,
      questionName: formModel.questionName as string,
      questionInfo: formModel.questionInfo as string,
      type: formModel.type as number,
      date: new Date().getTime() as number
    };
    return saveQuestionData;
  }

  showInfo(Info): void {
    this.nzModalService.info({
      nzTitle: 'Exam sheet Description',
      nzContent: `<p>${Info}</p>`
    });
  }

  // filter
  filyerType(searchType: Array<number>): void {
    this.searchType = searchType;
    console.log(this.searchType);
    this.getQuestionList(this.searchType);
  }
}
