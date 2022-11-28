import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDiagnosticoComponent } from './form-diagnostico.component';

describe('FormDiagnosticoComponent', () => {
  let component: FormDiagnosticoComponent;
  let fixture: ComponentFixture<FormDiagnosticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDiagnosticoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDiagnosticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
