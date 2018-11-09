import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomeRoutesService } from '../services/home-routes.service';
import { TravelRoutesService } from '../services/travel-routes.service';
import { MatchRoutesService } from '../services/match-routes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [HomeRoutesService, TravelRoutesService]
})
export class DashboardComponent implements OnInit {
  homes: any = []
  travels: any = [];
  matches: any = [];
  userId: any = [];
  
  constructor(private home: HomeRoutesService, private travel: TravelRoutesService, private match: MatchRoutesService) { }

  ngOnInit() {
    this.home.getMyHome().subscribe((homes) => {
      this.userId = homes[0].owner;
      this.homes = homes;
    });
    
    this.travel.getTravel().subscribe((travels) => {
      this.travels = travels;
    });
    
    this.match.getMatch().subscribe((matches) => {
      this.matches = matches;
    });
  }
  
  deleteTravel(travelId){
    this.travel.deleteTravel(travelId).subscribe(() => {
      this.travel.getTravel().subscribe((travels) => {
        this.travels = travels;
      });
    });
  }
}
