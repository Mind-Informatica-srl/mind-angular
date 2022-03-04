import { NgModule } from '@angular/core';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [MatDialogModule, CommonModule, MatButtonModule],
  exports: [ConfirmDialogComponent],
})
export class MindAngularLibModule {}
