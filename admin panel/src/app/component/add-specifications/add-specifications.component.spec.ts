import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpecificationsComponent } from './add-specifications.component';

describe('AddSpecificationsComponent', () => {
  let component: AddSpecificationsComponent;
  let fixture: ComponentFixture<AddSpecificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSpecificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSpecificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
