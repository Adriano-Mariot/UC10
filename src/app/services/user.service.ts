import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    //INJETAR DEPENDENCIA DO MODULO HTTPCLIENT
    private httpClient: HttpClient
  ) {}

    urlLogin = "http://localhost:3000/signin"

  // post login

  logarUser(usuario: User): Observable<any> {

    return this.httpClient.post(this.urlLogin, JSON.stringify(usuario), {
      headers: new HttpHeaders({ "Content-type": "application/json" }), observe: 'response'

    })
  }

}
