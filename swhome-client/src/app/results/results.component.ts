import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TravelRoutesService } from '../services/travel-routes.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  results: any;
  otherTravelId: any;
  
  travelId: any = {};
  userTravelReq: any;
  match: boolean;
  
  constructor(private route: ActivatedRoute, private travel: TravelRoutesService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.travelId.id = params['id'];
    });
    
    this.getDetails();
    
    this.travel.getResults(this.travelId.id).subscribe((results) => {
      this.results = results
    });
  }
  
  getDetails(){
    this.travel.travelDetail(this.travelId.id).subscribe((userReq) => {
      this.userTravelReq = userReq;
    });
  }

  like(otherTravelId){
    this.travel.like(this.travelId, otherTravelId).subscribe(() => {

      this.travel.getResults(this.travelId.id).subscribe((results) => {
        this.results = results;
        this.getDetails();
      });
    });
  }
  
  dislike(otherTravelId){
    this.travel.dislike(this.travelId, otherTravelId).subscribe(() => {
      this.travel.getResults(this.travelId.id).subscribe((results) => {
        this.results = results;
      });
    });
  }
}
