import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LojaDashboardComponent } from './loja-dashboard.component';

describe('LojaDashboardComponent', () => {
  let component: LojaDashboardComponent;
  let fixture: ComponentFixture<LojaDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LojaDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LojaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
