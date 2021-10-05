import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonPlanCardComponent } from './lesson-plan-card.component';

describe('LessonPlanCardComponent', () => {
  let component: LessonPlanCardComponent;
  let fixture: ComponentFixture<LessonPlanCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonPlanCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonPlanCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
