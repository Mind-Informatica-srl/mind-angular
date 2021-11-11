import { Component, HostListener, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageType } from '../../services/user-message.service';

export interface ConfirmDialogData {
  title: string;
  message: string;
  action: MessageType;
  showNegativeButton: boolean;
  confirmButtonText?: string;
  negativeButtonText?: string;
}

@Component({
  selector: 'lib-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  //se c'è solo il pulsante ok, all'invio si chiude il dialog
  @HostListener('document:keydown.enter', ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    if (!this.data.showNegativeButton) {
      event.preventDefault();
      this.dialogRef.close();
    }
  }
}
