import { MatDialog } from '@angular/material/dialog';
import { Observable, of, throwError } from 'rxjs';
import { Directive } from '@angular/core';
import { catchError, tap, first, switchMap } from 'rxjs/operators';
import { InfoMessageService, MessageType } from '../info-message.service';
import { DatasourceParam } from './datasource-param.model';
import { GenericRepositoryInterface } from './generic-repository-interface';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Directive()
export class GenericDataSource<T> {
  constructor(
    protected repository: GenericRepositoryInterface<T>,
    protected infoMessageService: InfoMessageService,
    public dialog: MatDialog
  ) {}

  /**
   * Richiede lista di dati al server.
   * E' possibile aggiungere parametri alla request tramite params
   *
   * @param params DatasourceParam[] = []
   * @returns Observable<T[]>
   */
  getAll(params: DatasourceParam[] = []): Observable<T[]> {
    return this.repository.getAll(params).pipe(
      catchError((err) => {
        return this.onError(err);
      })
    );
  }

  /**
   * Esegue operazione per recuperare i dati di una risorsa in base al suo id.
   * E' possibile aggiungere parametri alla request tramite params
   *
   * @param id string | number
   * @param params DatasourceParam[] = []
   * @returns Observable<T>
   */
  getOne(id: string | number, params: DatasourceParam[] = []): Observable<T> {
    return this.repository.getOne(id, params).pipe(
      catchError((err) => {
        return this.onError(err);
      })
    );
  }

  /**
   * Esegue operazione di insert.
   * E' possibile aggiungere parametri alla request tramite params
   *
   * @param element T
   * @param params DatasourceParam[] = []
   * @returns Observable<T>
   */
  insert(element: T, params: DatasourceParam[] = []): Observable<T> {
    return this.repository
      .insert(element, params)
      .pipe(
        catchError((err) => {
          return this.onError(element, err);
        })
      )
      .pipe(
        tap((_) => {
          this.addOkMessage(
            'Elemento inserito con successo',
            MessageType.Insert
          );
        })
      );
  }

  /**
   * Esegue chiamata per aggiornare una risorsa.
   * E' possibile aggiungere parametri alla request tramite params
   *
   * @param element T
   * @param params DatasourceParam[] = []
   * @returns Observable<T>
   */
  update(element: T, params: DatasourceParam[] = []): Observable<T> {
    return this.repository
      .update(element, params)
      .pipe(
        catchError((err) => {
          return this.onError(element, err);
        })
      )
      .pipe(
        tap((_) => {
          this.addOkMessage(
            'Modifica effettuata con successo',
            MessageType.Update
          );
        })
      );
  }

  /**
   * Avvia richiesta per cancellazione.
   * E' possibile aggiungere parametri alla request tramite params
   *
   * prima viene chiesta conferma all'utente
   *
   * @param element
   * @param params
   * @returns Observable<any>
   */
  delete(element: T, params: DatasourceParam[] = []): Observable<any> {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Richiesta eliminazione',
        message: "Vuoi eliminare l'elemento selezionato?",
        action: 'DELETE',
        showNegativeButton: true,
      },
    });
    return dialogRef.afterClosed().pipe(
      switchMap((confirm) => {
        if (confirm) {
          return this.repository
            .delete(element, params)
            .pipe(
              catchError((err) => {
                return this.onError(element, err);
              })
            )
            .pipe(
              tap((_) => {
                this.addOkMessage(
                  'Elemento cancellato con successo',
                  MessageType.Delete
                );
              })
            );
        } else {
          return of(false);
        }
      }),
      first()
    );
  }

  /**
   * invia all'utente messaggio di errore
   *
   * @param msg string
   * @param type MessageType
   */
  addOkMessage(msg: string, type: MessageType): void {
    this.infoMessageService.message({
      message: msg,
      messageType: type,
    });
  }

  /**
   * Intercetta l'errore per mostrarlo all'utente
   *
   * @param err any
   * @param element T
   * @returns Observable<never>
   */
  protected onError(err: any, element?: T): Observable<never> {
    this.infoMessageService.message({
      element: element,
      error: err,
      message: typeof err == 'string' ? err : 'Errore',
      messageType: MessageType.Error,
    });
    GenericDataSource.handleError(err);
    return throwError(err);
  }

  /**
   * Gestisce l'errore
   *
   * @param error any
   * @returns Observable<never>
   */
  public static handleError(error: any): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Qualcosa è andato storto; riprovare più tardi.');
  }
}
