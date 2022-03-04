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

  /**
   * Restituisce lista di oggetti di tipo T
   *
   * @param dsParams DatasourceParam[] = []
   * @returns Observable<T[]>
   */
  getAll(dsParams: DatasourceParam[] = []): Observable<T[]> {
    const params: HttpParams = this.convertToHttpParams(dsParams);
    return this.http.get<T[]>(this.apiUrl, { params });
  }

  /**
   * Restituisce elemento di tipo T
   *
   * @param id string | number
   * @param dsParams  DatasourceParam[] = []
   * @returns Observable<T>
   */
  getOne(id: string | number, dsParams: DatasourceParam[] = []): Observable<T> {
    const params: HttpParams = this.convertToHttpParams(dsParams);
    return this.http.get<T>(`${this.apiUrl}/${id}`, { params });
  }

  /**
   * Chiama il server per operazione di insert (post)
   *
   * @param element T
   * @param dsParams  DatasourceParam[] = []
   * @returns
   */
  insert(element: T, dsParams: DatasourceParam[] = []): Observable<T> {
    const params: HttpParams = this.convertToHttpParams(dsParams);
    return this.http.post<T>(this.apiUrl, element, { params });
  }

  /**
   * Chiama il server per operazione di update (PUT)
   *
   * @param element T
   * @param dsParams DatasourceParam[] = []
   * @returns
   */
  update(element: T, dsParams: DatasourceParam[] = []): Observable<T> {
    const id = this.idExtractor(element);
    const params: HttpParams = this.convertToHttpParams(dsParams);
    return this.http.put<T>(`${this.apiUrl}/${id}`, JSON.stringify(element), {
      params,
    });
  }

  /**
   * Chiama il server per operazione di delete (DELETE)
   *
   * @param element T
   * @param dsParams DatasourceParam[] = []
   * @returns Observable<any>
   */
  delete(element: T, dsParams: DatasourceParam[] = []): Observable<any> {
    const params: HttpParams = this.convertToHttpParams(dsParams);
    const id = this.idExtractor(element);
    return this.http.delete(`${this.apiUrl}/${id}`, { params });
  }

  /**
   * Metodo per chiamare la stampa
   *
   * @param subPath string
   * @param responseType any = 'blob'
   * @param dsParams DatasourceParam[] = []
   * @returns Observable<any>
   */
  print(
    subPath: string = '',
    responseType: any = 'blob',
    dsParams?: DatasourceParam[]
  ): Observable<any> {
    return this.genericGet(subPath, responseType, dsParams);
  }

  /**
   * Metodo per fare una richiesta GET generica
   *
   * @param subPath string = ''
   * @param responseType any = 'json'
   * @param dsParams DatasourceParam[]
   * @returns Observable<any>
   */
  genericGet(
    subPath: string = '',
    responseType: any = 'json',
    dsParams?: DatasourceParam[]
  ): Observable<any> {
    let url = this.apiUrl;
    if (subPath && subPath !== '') {
      url += `${url}/${subPath}`;
    }
    const params: HttpParams = this.convertToHttpParams(dsParams);
    return this.http.get(`${url}`, {
      params: params,
      responseType: responseType,
    });
  }

  /**
   * Converte array di DatasourceParam in HttpParams
   *
   * @param dsParams DatasourceParam[] = []
   * @returns HttpParams
   */
  protected convertToHttpParams(dsParams: DatasourceParam[] = []): HttpParams {
    let params: HttpParams = new HttpParams();
    for (let i = 0; i < dsParams.length; i++) {
      const p = dsParams[i];
      params = params.set(p.key, p.value);
    }
    return params;
  }
}
