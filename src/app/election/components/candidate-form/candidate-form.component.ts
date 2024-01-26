import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrl: './candidate-form.component.scss',
})
export class CandidateFormComponent {
  @Input() form = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    image: new FormControl(null),
  });

  constructor() {}
}
