import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomeRoutesService } from '../services/home-routes.service';
import { TravelRoutesService } from '../services/travel-routes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [HomeRoutesService, TravelRoutesService]
})
export class DashboardComponent implements OnInit {
  homes:any=[]
  travels:any=[];
  
  constructor(private home: HomeRoutesService, private travel: TravelRoutesService) { }

  ngOnInit() {
    this.home.getMyHome().subscribe((homes) => {
      this.homes = homes;
    });
    
    this.travel.getTravel().subscribe((travels) => {
      this.travels = travels;
    });
  }
}
