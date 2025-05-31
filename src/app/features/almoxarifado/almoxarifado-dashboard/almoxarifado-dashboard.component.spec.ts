import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmoxarifadoDashboardComponent } from './almoxarifado-dashboard.component';

describe('AlmoxarifadoDashboardComponent', () => {
  let component: AlmoxarifadoDashboardComponent;
  let fixture: ComponentFixture<AlmoxarifadoDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlmoxarifadoDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlmoxarifadoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
