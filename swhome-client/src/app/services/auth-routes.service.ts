import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment'

@Injectable({
  providedIn: 'root'
})
export class AuthRoutesService {
  mainURL: string = `${enviroment.BASE_URL}/api`;
  
  constructor(private http: Http) { }
  
  handleError(e){
    return throwError(e.json().message);
  }
  
  signup(user){
    return this.http.post(`${this.mainURL}/signup`, user).pipe(
      map(res => res.json()),
      catchError(this.handleError);
    )
  }
  
  login(){
    return this.http.get(`${this.mainURL}/login`, user, {withCredentials: true}).pipe(
      map(res => res.json()),
      catchError(this.handleError);
    );
  }
  
  isLoggedIn(){
    return this.http.get(`${this.mainURL}/private`, {withCredentials: true}).pipe(
      map(res => res.json()),
      catchError(this.handleError);
    );
  }
  
  logout(){
    return this.http.post(`${this.mainURL}/logout`, {}, {withCredentials: true}).pipe(
      map(res => res.json()),
      catchError(this.handleError);
    );
  }
}
