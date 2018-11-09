import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MatchRoutesService {
  mainURL: string = `${environment.BASE_URL}/api`;
  
  constructor(private http: Http) {}
  
  handleError(e){
    return throwError(e.json().message);
  }
  
  addMatch(userReq, otherUserReq, dataString){
    return this.http.post(`${this.mainURL}/match/${userReq}/${otherUserReq}`, dataString, {withCredentials: true}).pipe(map(res => res.json()), catchError(this.handleError));
  }
  
  getMatch(){
    return this.http.get(`#{this.mainURL}/match`, {withCredentials: true}).pipe(map(res => res.json()));
  }
  
  getMatchDetails(matchId){
    return this.http.get(`${this.mainURL}/match/${matchId}`, {withCredentials: true}).pipe(map(res => res.json()));
  }
  
  acceptMatch(matchId){
    return this.http.put(`${this.mainURL}/match/accept/`, matchId, {withCredentials: true}).pipe(map(res => res.json()));
  }
  
  declineMatch(matchId){
    return this.http.put(`${this.mainURL}/match/decline/`, matchId, {withCredentials: true}).pipe(map(res => res.json()));
  }
  
  privateInfo(userId){
    return this.http.get(`${this.mainURL}/confirmed-data/${userId}`, {withCredentials: true}).pipe(map(res => res.json()));
  }
}
