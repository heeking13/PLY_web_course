import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminScoreComponent } from './admin-score.component';

describe('AdminScoreComponent', () => {
  let component: AdminScoreComponent;
  let fixture: ComponentFixture<AdminScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
