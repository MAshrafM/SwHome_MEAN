import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TravelRoutesService } from '../services/travel-routes.service';

@Component({
  selector: 'app-edit-travel',
  templateUrl: './edit-travel.component.html',
  styleUrls: ['./edit-travel.component.scss']
})
export class EditTravelComponent implements OnInit {
  formInfo: any = {
    beginDate: Date,
    endDate: Date,
    home: '',
    setting: '',
    landscape: ''
  };
  travelId: any;
  constructor(private route: ActivatedRoute, private travel: TravelRoutesService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.travelId = params["id"];
    });
    
    this.travel.travelDetail(this.travelId).subscribe((results) => {
      this.formInfo = {
        beginDate: results.beginDate.substr(0, 10),
        endDate: results.endDate.substr(0, 10),
        home: results.home,
        setting: results.setting,
        landscape: results.landscape
      };
    });
  }
  
  editTravel(){
    this.formInfo.beginDate += 'T00:00:00';
    this.formInfo.endDate += 'T00:00:00';
    this.travel.editTravel(this.formInfo, this.travelId).subscribe();
  }
}
