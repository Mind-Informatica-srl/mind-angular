import { GenericRepositoryInterface } from './generic-repository-interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Directive } from '@angular/core';
import { DatasourceParam } from './datasource-param.model';

/**
 * Repository che si occupa di comunicare con il server
 */
@Directive()
export class HttpRepository<T> implements GenericRepositoryInterface<T> {
  constructor(
    protected http: HttpClient,
    protected apiUrl: string,
    protected idExtractor: (arg0: any) => any = (element) => element.ID
  ) {}

  getAll(dsParams: DatasourceParam[] = []): Observable<T[]> {
    const params: HttpParams = this.convertToHttpParams(dsParams);
    return this.http.get<T[]>(this.apiUrl, { params });
  }

  getOne(id: string | number, dsParams: DatasourceParam[] = []): Observable<T> {
    const params: HttpParams = this.convertToHttpParams(dsParams);
    return this.http.get<T>(`${this.apiUrl}/${id}`, { params });
  }

  insert(element: T): Observable<T> {
    return this.http.post<T>(this.apiUrl, element);
  }

  update(element: T): Observable<T> {
    const id = this.idExtractor(element);
    return this.http.put<T>(`${this.apiUrl}/${id}`, JSON.stringify(element));
  }

  delete(element: T): Observable<any> {
    const id = this.idExtractor(element);
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  private convertToHttpParams(dsParams: DatasourceParam[] = []): HttpParams {
    let params: HttpParams = new HttpParams();
    for (let i = 0; i < dsParams.length; i++) {
      const p = dsParams[i];
      params = params.set(p.key, p.value);
    }
    return params;
  }
}
