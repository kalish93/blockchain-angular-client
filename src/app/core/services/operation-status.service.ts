import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class OperationStatusService {
  constructor(private snackBar: MatSnackBar) {}

  displayStatus(
    message: string,
    style = 'warning-snackbar',
    duration = 5000,
  ): void {
    this.snackBar.open(message, `Ok`, {
      duration: duration,
      panelClass: [style],
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      politeness: 'assertive',
    });
  }
}
