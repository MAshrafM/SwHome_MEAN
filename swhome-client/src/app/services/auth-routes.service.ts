import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../enviroments/enviroment'

@Injectable({
  providedIn: 'root'
})
export class AuthRoutesService {

  constructor(private http: HttpClient) { }
  
  login(){
    return this.http.get(`${enviroment.BASE_URL}/api/login`);
  }
}
