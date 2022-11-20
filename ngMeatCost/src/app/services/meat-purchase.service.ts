import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { MeatPurchase } from '../models/meat-purchase';

@Injectable({
  providedIn: 'root'
})
export class MeatPurchaseService {

  baseUrl = 'http://localhost:8087/';
  url = this.baseUrl + 'api/purchases'

  constructor(private http: HttpClient) { }

  index(): Observable <MeatPurchase[]> {
    return this.http.get<MeatPurchase[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('MeatPurchaseService.index(): error retrieving purchase list: ' + err)
        );
      })
    );
  }

  create(purchase: MeatPurchase): Observable<MeatPurchase> {
    return this.http.post<MeatPurchase>(this.url, purchase).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
           () => new Error( 'MeatPurchaseService.create(): error creating purchase: ' + err )
        );
      })
    );
  }

  update(purchase: MeatPurchase): Observable<MeatPurchase> {
    return this.http.put<MeatPurchase>(this.url + '/' + purchase.id, purchase).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
           () => new Error( 'MeatPurchaseService.updatey(): error updating purchase: ' + err )
        );
      })
    );
    }

    destroy(id: number): Observable<void> {
      return this.http.delete<void>(this.url + '/' + id).pipe(
        catchError((err: any) => {
          console.error(err);
          return throwError(
             () => new Error( 'MeatPurchaseService.destroy(): error deleting puurchase: ' + err )
          );
        })
      );
    }

    show(purchaseId: number): Observable <MeatPurchase> {
      return this.http.get<MeatPurchase>(this.url + '/' + purchaseId).pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () => new Error('MeatPurchaseService.index(): error retrieving purchase: ' + err)
          );
        })
      );
    }

}
