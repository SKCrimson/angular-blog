import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestNecoComponent } from './test-neco.component';

describe('TestNecoComponent', () => {
  let component: TestNecoComponent;
  let fixture: ComponentFixture<TestNecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestNecoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestNecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
