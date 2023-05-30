import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DipomexServiceService {
  public dipomexUrl;
  private apiKey = '4a473b802bc072d1f507d661e9ac7bc54fbff325';
  constructor(private dipmex: HttpClient) {
    this.dipomexUrl = '/dipomex/v1/codigo_postal';
  }

  //* Metodos

  getByPostalCode = (postalCode: string) => {
    //Creamos el header con lo que debe llevar, el api key
    const headers = new HttpHeaders().set('APIKEY', this.apiKey);
    return this.dipmex.get(`${this.dipomexUrl}?cp=${postalCode}`, { headers });
  };
}
