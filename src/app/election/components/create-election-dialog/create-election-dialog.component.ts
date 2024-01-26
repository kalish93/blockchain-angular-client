import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ElectionFacade } from '../../facades/election.facade';

@Component({
  selector: 'app-create-election-dialog',
  templateUrl: './create-election-dialog.component.html',
  styleUrl: './create-election-dialog.component.scss',
})
export class CreateElectionDialogComponent {
  electionForm: FormGroup;

  constructor(private fb: FormBuilder, private electionFacade: ElectionFacade) {
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
    const candidateForm = this.fb.group({
      name: [''],
      description: [''],
      image: [undefined],
    });

    this.candidates.push(candidateForm);
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
  }
}
