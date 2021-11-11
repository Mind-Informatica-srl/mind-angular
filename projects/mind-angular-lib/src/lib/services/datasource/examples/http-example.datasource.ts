import { GenericDataSource } from '../generic-datasource';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpRepository } from '../http-repository';
import { InfoMessageService } from '../../info-message.service';
import { MatDialog } from '@angular/material/dialog';

interface HttpInterfaceExample {
  ID: number;
  Value: string;
}

@Injectable({
  providedIn: 'root',
})
export class AziendeDatasource extends GenericDataSource<HttpInterfaceExample> {
  constructor(
    http: HttpClient,
    infoMessageService: InfoMessageService,
    dialog: MatDialog
  ) {
    super(
      new HttpRepository<HttpInterfaceExample>(http, 'http://example.com/test'),
      infoMessageService,
      dialog
    );
  }
}
