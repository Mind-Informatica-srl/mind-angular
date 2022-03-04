import { Observable } from 'rxjs';
import { DatasourceParam } from './datasource-param.model';

/**
 * Interfaccia generica di un repository per la gestione dei dati
 */
export interface GenericRepositoryInterface<T> {
  getAll(dsParams: DatasourceParam[]): Observable<T[]>;
  getOne(id: string | number, dsParams: DatasourceParam[]): Observable<T>;
  insert(element: T, dsParams: DatasourceParam[]): Observable<T>;
  update(element: T, dsParams: DatasourceParam[]): Observable<T>;
  delete(element: T, dsParams: DatasourceParam[]): Observable<any>;
}
