import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { enviroment } from '../../enviroments/enviroment'

@Injectable({
  providedIn: 'root'
})
export class HomeRoutesService {

  constructor(private http: HttpClient) { }
  
  getMyHome(){
    return this.http.get(`${enviroment.BASE_URL}/aoi/myhome`);
  }
}
