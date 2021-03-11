import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsMovementsComponent } from './teams-movements.component';

describe('TeamsMovementsComponent', () => {
  let component: TeamsMovementsComponent;
  let fixture: ComponentFixture<TeamsMovementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsMovementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
