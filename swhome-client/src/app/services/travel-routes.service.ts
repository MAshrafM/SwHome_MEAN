import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TravelRoutesService {
  mainURL: string = `${environment.BASE_URL}/api`;
  
  constructor(private http: Http) { }
  
  handleError(e){
    return throwError(e.json().message);
  }
  
  addTravel(travelRequest){
    return this.http.post(`${this.mainURL}/travel`, travelRequest, {withCredentials: true}).pipe(
      map(res => res.json()), catchError(this.handleError)
    );
  }
  
  getTravel(){
    return this.http.get(`${this.mainURL}/travel`, {withCredentials: true}).pipe(
      map(res => res.json()), catchError(this.handleError)
    );
  }
}
