import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrl: './candidate-form.component.scss',
})
export class CandidateFormComponent {
  @Input() form!: FormGroup;
  isDragOver = false;
  selectedFile: File | null = null;

  constructor() {}

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    if (event.dataTransfer?.files) {
      const file = event.dataTransfer.files[0];
      this.form.patchValue({ image: file });
      this.form.get('image')?.updateValueAndValidity();
    }
    if (event.dataTransfer?.files) {
      const file = event.dataTransfer.files[0];
      this.selectedFile = file;
    }
  }

  onFileSelect(event: any): void {
    const input = event.target;
    if (input.files) {
      const file = input.files[0];
      console.log('iurhsughfgfgg', file);
      this.form.patchValue({ image: file });
      console.log('iurhsughfgfgg', this.form.get('image')?.value);
      this.form.get('image')?.updateValueAndValidity();
    }
    if (input.files) {
      const file = input.files[0];
      this.selectedFile = file;
    }
  }

  removeFile(): void {
    this.form.patchValue({ image: null });
    this.form.get('image')?.updateValueAndValidity();
  }
}
