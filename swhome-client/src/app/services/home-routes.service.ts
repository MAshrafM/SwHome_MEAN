import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class HomeRoutesService {

  constructor(private http: Http) { }
  
  getMyHome(){
    return this.http.get(`${environment.BASE_URL}/api/myhome`).pipe(
      map((res) => res.json())
    );
  }
}
