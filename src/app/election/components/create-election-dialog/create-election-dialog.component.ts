import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ElectionFacade } from '../../facades/election.facade';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ElectionCategory } from '../../models/election.model';

@Component({
  selector: 'app-create-election-dialog',
  templateUrl: './create-election-dialog.component.html',
  styleUrl: './create-election-dialog.component.scss',
})
export class CreateElectionDialogComponent {
  isVisible = false;
  electionForm: FormGroup;
  selectedFiles: Map<string, File> = new Map();
  electionImage: File | null = null;
  electionImageUrl: string | null = null;
  candidateForm = this.fb.group({
    name: [''],
    description: [''],
  });
  categories = ElectionCategory

  constructor(
    private fb: FormBuilder,
    private electionFacade: ElectionFacade,
    private dialogRef: MatDialogRef<CreateElectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { organizationId: string }
  ) {
    this.electionForm = this.fb.group({
      organizationId: [data.organizationId],
      title: [''],
      description: [],
      endTime: [''],
      endDate: [''],
      category: [ElectionCategory.OTHERS],
      candidates: this.fb.array([]),
    });
  }

  dateFilter = (date: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date ? date >= today : false;
  };

  get candidates(): FormArray {
    return this.electionForm.get('candidates') as FormArray;
  }

  getCandidateFormGroup(index: number): FormGroup {
    return this.candidates.at(index) as FormGroup;
  }

  addCandidate(): void {
    const candidateName = this.candidateForm.get('name')?.value;
    const candidateDescription = this.candidateForm.get('description')?.value;
    const file = this.selectedFiles.get(candidateName as any);

    const imageUrl = file ? URL.createObjectURL(file) : '';

    const newCandidate = this.fb.group({
      name: [candidateName],
      description: [candidateDescription],
      imageUrl: [imageUrl],
    });

    this.candidates.push(newCandidate);

    this.candidateForm.reset();
    this.isVisible = false;
  }

  createCandidate() {
    this.isVisible = true;
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

  onUpload(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;

    if (fileList && fileList.length > 0) {
      this.electionImage = fileList[0]; // Save election image to a separate variable
      this.electionImageUrl = URL.createObjectURL(this.electionImage); // Create a URL for the image
    } else {
      this.electionImage = null;
      this.electionImageUrl = null;
    }
  }

  submitElection(): void {
    if (this.electionForm.valid) {
      const endDate = new Date(this.electionForm.value.endDate);
      const endTime = this.electionForm.value.endTime;

      // Split the time into hours and minutes
      const [hours, minutes] = endTime.split(':').map(Number);

      // Set the hours and minutes on the endDate object
      endDate.setHours(hours);
      endDate.setMinutes(minutes);

      // Get the Unix timestamp in milliseconds
      const endTimeUnix = endDate.getTime();
      const formData = new FormData();

      formData.append('title', this.electionForm.value.title);
      formData.append('description', this.electionForm.value.description);
      formData.append('endTime', endTimeUnix.toString());
      formData.append('organizationId', this.electionForm.value.organizationId);
      formData.append('category', this.electionForm.value.category);

      this.electionForm.value.candidates.forEach(
        (candidate: any, index: number) => {
          Object.entries(candidate).forEach(([key, value]) => {
            if (key !== 'imageUrl') {
              formData.append(`candidates[${index}][${key}]`, value as string);
            }
          });

          const file = this.selectedFiles.get(candidate.name);
          if (file) {
            formData.append(`candidates[${index}][image]`, file, file.name);
          }
        }
      );

      formData.forEach((value, key) => {});

      this.electionFacade.dispatchCreateElection(formData);
      this.dialogRef.close();
    }
  }

  transformEnum(value: string): string {
    return value
      .toLowerCase()                        // Convert to lowercase
      .replace(/_/g, ' ')                   // Replace underscores with spaces
      .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize first letter of each word
  }
}
