import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConsumorestService {

  constructor(private http: HttpClient ) { }

  getUsuariosRest(){
    return this.http.get('http://localhost:3001/api/usuario/');
  }
}
