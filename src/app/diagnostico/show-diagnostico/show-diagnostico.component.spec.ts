import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDiagnosticoComponent } from './show-diagnostico.component';

describe('ShowDiagnosticoComponent', () => {
  let component: ShowDiagnosticoComponent;
  let fixture: ComponentFixture<ShowDiagnosticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDiagnosticoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowDiagnosticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
