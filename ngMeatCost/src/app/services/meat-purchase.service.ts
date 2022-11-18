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

}
