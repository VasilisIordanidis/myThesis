import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionListDialogComponent } from './attraction-list-dialog.component';

describe('AttractionListDialogComponent', () => {
  let component: AttractionListDialogComponent;
  let fixture: ComponentFixture<AttractionListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttractionListDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttractionListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
