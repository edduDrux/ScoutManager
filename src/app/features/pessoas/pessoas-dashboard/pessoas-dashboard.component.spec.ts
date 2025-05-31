import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoasDashboardComponent } from './pessoas-dashboard.component';

describe('PessoasDashboardComponent', () => {
  let component: PessoasDashboardComponent;
  let fixture: ComponentFixture<PessoasDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PessoasDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PessoasDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
