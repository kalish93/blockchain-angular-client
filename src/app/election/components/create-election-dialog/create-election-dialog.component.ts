import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ElectionFacade } from '../../facades/election.facade';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-create-election-dialog',
  templateUrl: './create-election-dialog.component.html',
  styleUrl: './create-election-dialog.component.scss',
})
export class CreateElectionDialogComponent {
  isVisible = false;
  electionForm: FormGroup;
  selectedFiles: Map<string, File> = new Map();
  candidateForm = this.fb.group({
    name: [''],
    description: [''],
  });

  constructor(
    private fb: FormBuilder,
    private electionFacade: ElectionFacade,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<CreateElectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { organizationId: string }
  ) {
    this.electionForm = this.fb.group({
      organizationId: [data.organizationId],
      title: [''],
      description: [],
      endTime: [''],
      endDate: [''],
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
    console.log('fff', this.electionForm.value);
  }
  removeCandidate(index: number): void {
    const candidateName = this.candidates.at(index).get('name')?.value;

    if (this.selectedFiles.has(candidateName)) {
      this.selectedFiles.delete(candidateName);
    }

    this.candidates.removeAt(index);
  }

  onFileSelected(event: Event, candidateName: string): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      const fileNameDisplay = document.querySelector('.file-upload-text');
      if (fileNameDisplay) {
        fileNameDisplay.textContent = fileList[0].name;
      }
      this.selectedFiles.set(candidateName, fileList[0]);
    }
  }

  submitElection(): void {
    if (this.electionForm.valid) {

    const endDate = new Date(this.electionForm.value.endDate);
    const endTime = this.electionForm.value.endTime;

    const [hours, minutes] = endTime.split(':').map(Number);

    endDate.setHours(hours);
    endDate.setMinutes(minutes);

    const endTimeUnix = endDate.getTime();
    const formData = new FormData();

      formData.append('title', this.electionForm.value.title);
      formData.append('description', this.electionForm.value.description);
      formData.append('endTime', endTimeUnix.toString());

      this.electionForm.value.candidates.forEach(
        (candidate: any, index: number) => {
          Object.entries(candidate).forEach(([key, value]) => {
            if (key !== 'imageUrl') {
              formData.append(`candidates[${index}][${key}]`, value as string);
            }
          });

          const file = this.selectedFiles.get(candidate.name);
          console.log(candidate.name, 'file', file);
          if (file) {
            formData.append(`candidates[${index}][image]`, file, file.name);
          }
        }
      );

      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });

      this.electionFacade.dispatchCreateElection(formData);
    } else {
      console.error('Form is not valid');
    }
  }
}
