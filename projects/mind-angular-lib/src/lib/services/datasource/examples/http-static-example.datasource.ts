import { GenericDataSource } from '../generic-datasource';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpStaticRepository } from '../http-static-repository';
import { InfoMessageService } from '../../user-message.service';
import { MatDialog } from '@angular/material/dialog';

interface HttpStaticInterfaceExample {
  ID: number;
  Value: string;
}

@Injectable({
  providedIn: 'root',
})
export class CerDatasource extends GenericDataSource<HttpStaticInterfaceExample> {
  constructor(
    http: HttpClient,
    infoMessageService: InfoMessageService,
    dialog: MatDialog
  ) {
    super(
      new HttpStaticRepository<HttpStaticInterfaceExample>(
        http,
        'http://example.com/interfacename'
      ),
      infoMessageService,
      dialog
    );
  }
}
