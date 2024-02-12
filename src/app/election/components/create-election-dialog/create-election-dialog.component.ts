import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ElectionFacade } from '../../facades/election.facade';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-create-election-dialog',
  templateUrl: './create-election-dialog.component.html',
  styleUrl: './create-election-dialog.component.scss',
})
export class CreateElectionDialogComponent {
  isVisible = false;
  electionForm: FormGroup;
  candidateForm = this.fb.group({
    name: [''],
    description: [''],
    image: [''],
  });

  constructor(
    private fb: FormBuilder,
    private electionFacade: ElectionFacade,
    private dialog: MatDialog
  ) {
    this.electionForm = this.fb.group({
      title: [''],
      description: [''],
      candidates: this.fb.array([]),
    });
  }

  get candidates(): FormArray {
    return this.electionForm.get('candidates') as FormArray;
  }

  getCandidateFormGroup(index: number): FormGroup {
    return this.candidates.at(index) as FormGroup;
  }

  addCandidate(): void {
    const newCandidate = this.fb.group({
      name: this.candidateForm.get('name')?.value,
      description: this.candidateForm.get('description')?.value,
      imageUrl: this.candidateForm.get('image')?.value,
    });

    this.candidates.push(newCandidate);

    this.candidateForm.reset();

    this.isVisible = false;
  }

  createCandidate() {
    this.isVisible = true;
    console.log('fff', this.electionForm.value)
  }
  removeCandidate(index: number): void {
    this.candidates.removeAt(index);
  }

  submitElection(): void {
    if (this.electionForm.valid) {
      const formData = this.electionForm.value;

      console.log(formData);
      console.log(typeof formData.candidates[0].image);
      this.electionFacade.dispatchCreateElection(formData);
    } else {
      console.error('Form is not valid');
    }
    this.dialog.closeAll();
  }
}
