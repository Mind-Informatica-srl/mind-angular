import { NgModule } from '@angular/core';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [MatDialogModule],
  exports: [ConfirmDialogComponent],
})
export class MindAngularLibModule {}
