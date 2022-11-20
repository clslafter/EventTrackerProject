import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { MeatPurchase } from '../models/meat-purchase';
import { Store } from '../models/store';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  baseUrl = 'http://localhost:8087/';
  url = this.baseUrl + 'api/stores'

  constructor(private http: HttpClient) { }

  index(): Observable <Store[]> {
    return this.http.get<Store[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('StoreService.index(): error retrieving store list: ' + err)
        );
      })
    );
  }

  create(store: Store): Observable<Store> {
    return this.http.post<Store>(this.url, store).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
           () => new Error( 'StoreService.create(): error creating store: ' + err )
        );
      })
    );
  }

  destroy(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/' + id).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
           () => new Error( 'StoreService.destroy(): error deleting store: ' + err )
        );
      })
    );
  }



}
