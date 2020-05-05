import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamFormQuestionComponent } from './exam-form-question.component';

describe('ExamFormQuestionComponent', () => {
  let component: ExamFormQuestionComponent;
  let fixture: ComponentFixture<ExamFormQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamFormQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamFormQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
