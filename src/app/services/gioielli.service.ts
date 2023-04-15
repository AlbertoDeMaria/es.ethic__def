import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Gioiello } from '../interface/gioiello';

@Injectable({
  providedIn: 'root'
})

export class GioielliService {
  constructor(private http: HttpClient) { }

  getGioielli(): Observable<Gioiello[]> {
    return this.http.get<any[]>('https://albertodemaria.github.io/jsonDB/Esethic_database.json')
      .pipe(
        map((data: any[]) => {
          return data.map(({ id, nome, codice, edizione, materiale, lavorazione, size, price_no_iva, price_iva, tipologia, description, nome_eng, desc_eng }) => {
            return { id, nome, codice, edizione, materiale, lavorazione, size, price_no_iva, price_iva, tipologia, description, nome_eng, desc_eng };
          });
        })
      );
  }

  getGioielloById(id: string): Observable<Gioiello> {
    return this.getGioielli().pipe(
      map((gioielli: Gioiello[]) => gioielli.find(gioiello => gioiello.id == id)),
      map((gioiello: Gioiello | undefined) => gioiello || {} as Gioiello)
    );
  }


}
