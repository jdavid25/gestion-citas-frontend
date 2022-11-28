import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConsultorioComponent } from './list-consultorio.component';

describe('ListConsultorioComponent', () => {
  let component: ListConsultorioComponent;
  let fixture: ComponentFixture<ListConsultorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListConsultorioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListConsultorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
