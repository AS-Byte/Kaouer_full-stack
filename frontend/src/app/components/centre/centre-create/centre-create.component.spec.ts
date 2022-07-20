import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentreCreateComponent } from './centre-create.component';

describe('CentreCreateComponent', () => {
  let component: CentreCreateComponent;
  let fixture: ComponentFixture<CentreCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentreCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CentreCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
