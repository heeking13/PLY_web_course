import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AddCourse, Course } from '../class/course';
import { AddExam, Exam } from '../class/exam';
import { CourseService } from '../service/course.service';
import { ExamService } from '../service/exam.service';
import { PageService } from '../service/page.service';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  providers: [CourseService, PageService]
})

export class CourseComponent implements OnInit {

  addCourse: AddCourse;
  courseList: Course[] = [];
  addExam: AddExam;
  selectCourseValue: string;
  selectCourseList: Course[] = [];

  //distribute exam
  listOfOption: Array<Exam> = [];
  listOfSelectedValue: Array<string>;

  constructor(
    private fb: FormBuilder,
    private nzMessageService: NzMessageService,
    private courseService: CourseService,
    private examService: ExamService,
    private nzModalService: NzModalService,
    public pageService: PageService
  ) { }

  createForm: FormGroup;
  createExamForm: FormGroup;

  //tips boxs attribute
  isVisible = false;
  isOkLoading = false;

  //tips boxs attribute
  isExamVisible = false;
  isExamOkLoading = false;

  //distribute exam tips box attribute
  allocateModalisVisible = false;
  allocateModalisOkLoading = false;

  //read data status
  tableLoading = false;

  //couser form  relevant
  courseModalTitle: string;
  selectCourse: Course;

  @ViewChild('pass') pass: ElementRef;
  @ViewChild('fail') fail: ElementRef;

  ngOnInit(): void {
    this.getcourseList();
    this.getExamList();
    this.getSelectCourseList();
    //add course new forms
    this.createForm = this.fb.group({
      courseName: [null, [Validators.required]],
      courseInfo: [null],
    });
    //add new exam forms\
    this.createExamForm = this.fb.group({
      examName: [null, [Validators.required]],
      examInfo: [null],
      state: [0]
    });
  }

  //validation necessary
  get courseName() { return this.createForm.get('courseName'); }
  get courseInfo() { return this.createForm.get('courseInfo'); }
  get examName() { return this.createExamForm.get('examName'); }
  get examInfo() { return this.createExamForm.get('examInfo'); }

  //show detailed of course
  showCourseInfo(Info): void {
    this.nzModalService.info({
      nzTitle: 'Course Description',
      nzContent: `<p>${Info}</p>`
    });
  }

  getcourseList(reset: boolean = false): void {
    this.tableLoading = true;
    if (reset) {
      //????
    }
    this.courseService.getcourseList({ pageIndex: this.pageService.pageIndex, pageSize: this.pageService.pageSize }).subscribe(res => {
      //console.log(res);
      this.courseList = res.userInfo.map((value, key) => {
        value.expand = false;
        return value;
      });
      this.tableLoading = false;
      this.pageService.total = res.total;
      console.log(this.courseList);
    });
  }

  //allocate exam and show list
  getSelectCourseList(): void {
    this.courseService.getcourseList().subscribe(res => {
      this.selectCourseList = res.userInfo;
      this.selectCourseValue = this.selectCourseList[0]._id;
    });
  }

  //create course
  createCourse(): void {
    this.addCourse = this.getAddCourse();
    this.courseService.createCourse(this.addCourse).subscribe(res => {
      console.log(res);
      if (res.code === 0) {
        this.isVisible = false;
        this.isOkLoading = false;
        this.createForm.reset();
        this.getcourseList();
        this.getSelectCourseList();
        this.nzMessageService.success('Add new course');
      } else {
        this.isOkLoading = false;
        this.nzMessageService.error('Add new course failed');
      }

    });
  }

  //get all exam
  getExamList(): void {
    this.examService.getExamList().subscribe(res => {
      this.listOfOption = res.userInfo;
    });
  }

  //GET FORM DATA
  getAddCourse(): AddCourse {
    const FormModel = this.createForm.value;
    const saveCourseData: AddCourse = {
      courseName: FormModel.courseName as string,
      courseInfo: FormModel.courseInfo as string,
      date: new Date().getTime()
    };
    return saveCourseData;
  }

  // edit course content
  updateCourse(): void {
    Object.assign(this.selectCourse, this.getAddCourse());
    this.courseService.updateCourse(this.selectCourse).subscribe(res => {
      if (res.code === 0) {
        this.isVisible = false;
        this.isOkLoading = false;
        this.selectCourse = null;
        this.createForm.reset();
        this.getcourseList();
        this.nzMessageService.success('Edit course sucessfully');
      } else {
        this.isOkLoading = false;
        this.nzMessageService.error('Edit course failed');
      }
    })
  }

  // delete course
  deleteCourse(cid): void {
    this.courseService.deleteCourse(cid).subscribe(res => {
      if (res.code === 0) {
        this.pageService.pageIndex = 1;
        this.getcourseList();
        this.nzMessageService.success('Delete course sucessfully！');
      } else {
        this.isOkLoading = false;
        this.nzMessageService.success('Delete course Failed！');
      }
    });
  }

  //delete allocate exam
  deleteAllocate(cid, eid): void {
    console.log(cid, eid);
    this.courseService.deleteAllocate({ courseId: cid, examId: eid }).subscribe(res => {
      if (res.code === 0) {
        this.getcourseList();
        this.nzMessageService.success('delete allocate exam sucessfully！');
      } else {
        this.isOkLoading = false;
        this.nzMessageService.error('delete allocate exam failed！');
      }

    });
  }

  //tips box
  showModal(course?: Course): void {
    this.selectCourse = null;
    this.createForm.reset();
    if (course) {
      this.courseModalTitle = "Edit course";
      this.selectCourse = course;
      this.createForm.patchValue({
        courseName: this.selectCourse.courseName,
        courseInfo: this.selectCourse.courseInfo
      });
    } else {
      this.courseModalTitle = "Add course";
    }
    this.isVisible = true;
    console.log(this.selectCourse);
  }

  //submit course
  submitForm(): void {
    this.isOkLoading = true;
    for (const i in this.createForm.controls) {
      this.createForm.controls[i].markAsDirty();
      this.createForm.controls[i].updateValueAndValidity();
    }
    if (this.selectCourse) {
      this.updateCourse();
    } else {
      this.createCourse();
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  //submit exam data
  createExam(): void {
    this.addExam = this.getAddExam();
    this.examService.createExam(this.addExam).subscribe(res => {
      console.log(res);
      if (res.code === 0) {
        this.isExamVisible = false;
        this.isExamOkLoading = false;
        this.createExamForm.reset();
        this.getcourseList();
        //refresh the exam list
        this.getExamList();
        this.nzMessageService.success('Add new exam success');
      } else {
        this.isExamOkLoading = false;
        this.nzMessageService.error('Add new exam failed');
      }
    });
  }

  getAddExam(): AddExam {
    const formModel = this.createExamForm.value;
    const saveExamData: AddExam = {
      examName: formModel.examName as string,
      examInfo: formModel.examInfo as string,
      state: Number(formModel.state) as number,
      date: new Date().getTime()
    };
    return saveExamData;
  }

  //exam tips box
  showExamModal(): void {
    this.isExamVisible = true;
    this.fail.nativeElement.checked = true;
  }

  //submit exam
  submitExamForm(): void {
    //this.isExamOkLoading = true;
    for (const i in this.createExamForm.controls) {
      this.createExamForm.controls[i].markAsDirty();
      this.createExamForm.controls[i].updateValueAndValidity();
    }
    this.createExam();
  }

  handleExamCancel(): void {
    this.isExamVisible = false;
    this.createExamForm.reset();
  }

  //distribute exam
  allocateShowModal(): void {
    this.allocateModalisVisible = true;
  }

  allocateHandleOk(): void {
    console.log(this.selectCourseValue);
    console.log(this.listOfSelectedValue);
    this.courseService.allocateExam({ course_id: this.selectCourseValue, examList: this.listOfSelectedValue }).subscribe(res => {
      console.log(res);
      if (res.code === 0) {
        this.getcourseList();
        this.nzMessageService.success('Distribute exam success');
      } else {
        this.nzMessageService.error('Distribute exam failed');
      }
      this.allocateModalisVisible = false;
    });
  }

  allocateCancel(): void {
    this.allocateModalisVisible = false;
  }
}
