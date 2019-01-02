import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHoraireComponent } from './edit-horaire.component';

describe('EditHoraireComponent', () => {
  let component: EditHoraireComponent;
  let fixture: ComponentFixture<EditHoraireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHoraireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHoraireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
