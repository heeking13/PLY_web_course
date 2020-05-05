import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../service/score.service'
import { Score } from '../class/score'
import { PageService } from '../service/page.service'
@Component({
  selector: 'app-admin-score',
  templateUrl: './admin-score.component.html',
  styleUrls: ['./admin-score.component.scss'],
  providers: [PageService]
})
export class AdminScoreComponent implements OnInit {
  scoreList: Score[];
  tableLoadingtrue: boolean;
  constructor(
    private scoreService: ScoreService,
    public pageService: PageService
  ) { }

  ngOnInit(): void {
    this.getScoreList();
  }


  //get score list from backend
  getScoreList(): void {
    this.tableLoadingtrue = true;
    this.scoreService.getScoreList().subscribe(res => {
      console.log(res);
      if (res.code === 0) {
        this.scoreList = res.userInfo;
        this.tableLoadingtrue = false;
      } else {
        console.log('query score list failed');
      }
    });
  }
}
