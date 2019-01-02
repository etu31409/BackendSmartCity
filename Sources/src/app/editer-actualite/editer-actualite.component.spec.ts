import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditerActualiteComponent } from './editer-actualite.component';

describe('EditerActualiteComponent', () => {
  let component: EditerActualiteComponent;
  let fixture: ComponentFixture<EditerActualiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditerActualiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditerActualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
