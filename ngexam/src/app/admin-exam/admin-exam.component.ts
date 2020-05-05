import { Component, OnInit } from '@angular/core';
import { Exam } from '../class/exam';
import { Router } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ExamService } from '../service/exam.service';
import { PageService } from '../service/page.service';

@Component({
  selector: 'app-admin-exam',
  templateUrl: './admin-exam.component.html',
  styleUrls: ['./admin-exam.component.scss'],
  providers: [PageService]
})
export class AdminExamComponent implements OnInit {

  tableLoading: boolean;
  examList: Exam[] = [];

  constructor(
    private router: Router,
    private examService: ExamService,
    public pageService: PageService,
    private nzMessageService: NzMessageService,
    private nzModalService: NzModalService
  ) { }

  ngOnInit(): void {
    this.getExamList();
  }

  //show exam info
  showExamInfo(Info): void {
    this.nzModalService.info({
      nzTitle: 'Exam Description',
      nzContent: `<p>${Info}</p>`
    });
  }

  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: any[] = [];
  listOfAllData: any[] = [];
  mapOfCheckedId: { [key: string]: boolean } = {};

  getExamList(reset: boolean = false): void {
    this.tableLoading = true;
    if (reset) {
      //????
    }
    this.examService.getExamList({ pageIndex: this.pageService.pageIndex, pageSize: this.pageService.pageSize }).subscribe(res => {
      console.log(res);
      this.examList = res.userInfo;
      this.pageService.total = res.total;
      this.tableLoading = false;
    });
  }

  currentPageDataChange($event: Array<{ id: number; name: string; age: number; address: string }>): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData.every(item => this.mapOfCheckedId[item._id]);
    this.isIndeterminate =
      this.listOfDisplayData.some(item => this.mapOfCheckedId[item._id]) && !this.isAllDisplayDataChecked;
  }

  checkAll(value: boolean): void {
    this.listOfDisplayData.forEach(item => (this.mapOfCheckedId[item._id] = value));
    this.refreshStatus();
  }

  //edit review status
  approved(examState: number): void {
    console.log(Object.keys(this.mapOfCheckedId).filter(item => {
      if (this.mapOfCheckedId[item]) {
        return item;
      }
    }));
    this.examService.approved({
      mapOfCheckedId: Object.keys(this.mapOfCheckedId).filter(item => {
        if (this.mapOfCheckedId[item]) {
          return item;
        }
      }), state: examState
    }).subscribe(res => {
      if (res.code === 0) {
        this.nzMessageService.success('review success');
        this.mapOfCheckedId = {};
        this.getExamList();
      } else {
        this.nzMessageService.error('review failed');
      }
    });
  }

  //manage exam sheet
  goQuestion(examId: string): void {
    this.router.navigate(['adminQuestion', { id: examId }]);
  }

  // delete exam
  deleteExam(cid): void {
    this.examService.deleteExam(cid).subscribe(res => {
      if (res.code === 0) {
        this.pageService.pageIndex = 1;
        this.getExamList();
        this.nzMessageService.success('Delete exam sucessfully！');
      } else {
        //this.isOkLoading = false;
        this.nzMessageService.success('Delete exam Failed！');
      }
    });
  }
}

