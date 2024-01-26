import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-election-dialog',
  templateUrl: './create-election-dialog.component.html',
  styleUrl: './create-election-dialog.component.scss',
})
export class CreateElectionDialogComponent {
  electionForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
      image: [null],
    });

    this.candidates.push(candidateForm);
  }

  submitElection(){
    
  }
}
