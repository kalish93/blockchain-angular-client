import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateDescriptionDialogComponent } from './candidate-description-dialog.component';

describe('CandidateDescriptionDialogComponent', () => {
  let component: CandidateDescriptionDialogComponent;
  let fixture: ComponentFixture<CandidateDescriptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidateDescriptionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CandidateDescriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
