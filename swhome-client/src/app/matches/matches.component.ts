import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { TravelRoutesService } from "../services/travel-routes.service";
import { MatchRoutesService } from "../services/match-routes.service";

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {
  otherTravelId: any;
  matchId: any;
  travelReq: any;
  travelHome: any;
  contactInfo: any;
  matchReq: any;
  matchLength: number;
  userId: string;
  
  constructor(private route: ActivatedRoute, private travel: TravelRoutesService, private match: MatchRoutesService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.otherTravelId = params["travel"];
      this.matchId = params["connection"]
    });
  
  
    this.travel.travelDetail(this.otherTravelId).subscribe((travelDetail) =>{
      this.travelReq = travelDetail;
      this.travelHome = travelDetail.userHome;
    });
    
    this.match.getMatchDetails(this.matchId).subscribe((matchReq) => {
      this.matchReq = matchReq;
      this.matchLength = Object.keys(this.matchReq).length;
      
      if(this.matchReq.user1 == this.travelReq.user){
        this.userId = this.matchReq.user2;
      } else {
        this.userId = this.matchReq.user1;
      }
      
      if(this.matchLength == 11){
        this.privateInfo(this.travelReq.user);
      }
    });
  }
  
  acceptMatch(x = {matchId: this.matchId}){
    this.match.acceptMatch(x).subscribe(() => {
      if(this.matchLength == 11){
        this.privateInfo(this.travelReq.user);
      }
    });
  }
  
  declineMatch(x = {matchId: this.matchId}){
    this.match.declineMatch(x).subscribe();
    this.router.navigate(["/dashboard"]);
  }
  
  privateInfo(userId){
    this.match.privateInfo(userId).subscribe((userInfo) => {
      this.contactInfo = userInfo[0];
    });
  }

}
