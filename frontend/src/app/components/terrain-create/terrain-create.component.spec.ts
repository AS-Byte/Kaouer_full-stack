import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerrainCreateComponent } from './terrain-create.component';

describe('TerrainCreateComponent', () => {
  let component: TerrainCreateComponent;
  let fixture: ComponentFixture<TerrainCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerrainCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerrainCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should centre-create', () => {
    expect(component).toBeTruthy();
  });
});
