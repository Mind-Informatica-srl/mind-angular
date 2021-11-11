import { GenericRepositoryInterface } from './generic-repository-interface';
import { OnDestroy, Directive } from '@angular/core';

import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DatasourceParam } from './datasource-param.model';

@Directive()
export class HttpStaticRepository<T>
  implements OnDestroy, GenericRepositoryInterface<T>
{
  public isLoadingData: boolean = false;
  protected _sub: Subscription = new Subscription();
  protected _loadDataSub?: Subscription;
  private _dataList$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  public dataList$: Observable<T[]> = this._dataList$.asObservable();

  constructor(
    protected httpClient: HttpClient,
    protected apiDatasourcePath: string
  ) {
    this.loadServerData();
  }

  getAll(dsParams: DatasourceParam[]): Observable<T[]> {
    return this.dataList$;
  }
  getOne(id: string | number, dsParams: DatasourceParam[]): Observable<T> {
    throw new Error('Method not implemented.');
  }
  insert(element: T): Observable<T> {
    throw new Error('Method not implemented.');
  }
  update(element: T): Observable<T> {
    throw new Error('Method not implemented.');
  }
  delete(element: T): Observable<any> {
    throw new Error('Method not implemented.');
  }

  protected prepareLoadParameters(): HttpParams {
    return new HttpParams();
  }

  /**
   * ricarica i dati dal server
   * se è in corso una richiesta, questa viene annullata e ne viene
   * fatta una nuova
   *
   */
  private loadServerData(): void {
    this.isLoadingData = true;
    if (this._loadDataSub) {
      this._loadDataSub.unsubscribe();
    }
    this._loadDataSub = new Subscription();
    const params = this.prepareLoadParameters();
    this._loadDataSub.add(
      this.httpClient.get<T[]>(this.apiDatasourcePath, { params }).subscribe(
        (res) => {
          this._dataList$.next(res);
          this.isLoadingData = false;
        },
        (err) => {
          console.error(err);
          this.isLoadingData = false;
        }
      )
    );
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
    if (this._loadDataSub) {
      this._loadDataSub.unsubscribe();
    }
  }
}
