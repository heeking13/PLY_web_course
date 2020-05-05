import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    // lazy routing  loading, when open the website, the first page is login page
    path: '',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'adminCourse',
    loadChildren: () => import('./course/course.module').then(m => m.CourseModule)
  },
  {
    path: 'adminExam',
    loadChildren: () => import('./admin-exam/admin-exam.module').then(m => m.AdminExamModule)
  },
  {
    path: 'adminQuestion',
    loadChildren: () => import('./admin-question/admin-question.module').then(m => m.AdminQuestionModule)
  },
  {
    path: 'adminScore',
    loadChildren: () => import('./admin-score/admin-score.module').then(m => m.AdminScoreModule)
  },
  {
    path: 'adminManage',
    loadChildren: () => import('./admin-manage/admin-manage.module').then(m => m.AdminManageModule)
  },
  {
    path: 'exam',
    loadChildren: () => import('./exam/exam.module').then(m => m.ExamModule)
  },
  {
    path: 'examMessage',
    loadChildren: () => import('./exam-message/exam-message.module').then(m => m.ExamMessageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
