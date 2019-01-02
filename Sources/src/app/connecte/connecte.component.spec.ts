import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnecteComponent } from './connecte.component';

describe('ConnecteComponent', () => {
  let component: ConnecteComponent;
  let fixture: ComponentFixture<ConnecteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnecteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnecteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
