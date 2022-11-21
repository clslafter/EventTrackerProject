import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../models/address';
import { Store } from '../models/store';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

 // baseUrl = 'http://localhost:8087/';
  url = environment.baseUrl + 'api/addresses'

  constructor(private http: HttpClient) { }

  create(address: Address): Observable<Address> {
    return this.http.post<Address>(this.url, address).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
           () => new Error( 'AddressService.create(): error creating address: ' + err )
        );
      })
    );
  }

  destroy(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/' + id).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
           () => new Error( 'AddressService.destroy(): error deleting address: ' + err )
        );
      })
    );
  }
}
