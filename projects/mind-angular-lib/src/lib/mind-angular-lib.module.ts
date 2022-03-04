import { NgModule } from '@angular/core';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [MatDialogModule, CommonModule],
  exports: [ConfirmDialogComponent],
})
export class MindAngularLibModule {}
