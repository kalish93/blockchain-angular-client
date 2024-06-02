import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class OperationStatusService {
  constructor(private snackBar: MatSnackBar, private ngZone: NgZone) {}

displayStatus(
  message: string,
  style = 'warning-snackbar',
  duration = 5000,
  ): void {
  this.ngZone.run(() => {
    const config = new MatSnackBarConfig();
    config.duration = duration;
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.panelClass = [style];

    this.snackBar.open(message, `Ok`, config);
  });
}
}
