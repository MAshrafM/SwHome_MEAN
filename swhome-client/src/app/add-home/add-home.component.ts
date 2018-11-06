import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../environments/environment'

const URL = `${environment.BASE_URL}/api/myhome`;

@Component({
  selector: 'app-add-home',
  templateUrl: './add-home.component.html',
  styleUrls: ['./add-home.component.scss']
})
export class AddHomeComponent implements OnInit {
  uploader: FileUploader = new FileUploader({
    url: URL, itemAlias: 'file'
  });
  
  address = {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  };
  
  newHome = {
    home: '',
    setting: '',
    landscape: '',
    bedrooms: '',
    beds: '',
    baths: '',
    description: ''
  };
  
  feedback: string;
  
  constructor() { }

  ngOnInit() {
    this.uploader.onSuccessItem = (item, res) => {
      this.feedback = JSON.parse(res).message;
    };
    
    this.uploader.onErrorItem = (item, res, status, headers) => {
      this.feedback = JSON.parse(res).message;
    };
  }
  
  submit(){
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('home', this.newHome.home);
      form.append('setting', this.newHome.setting);
      form.append('landscape', this.newHome.landscape);
      form.append('bedrooms', this.newHome.bedrooms);
      form.append('beds', this.newHome.beds);
      form.append('baths', this.newHome.baths);
      form.append('address', JSON.stringify(this.address));
      form.append('description', this.newHome.description);
    };
    
    this.uploader.uploadAll();
  }

}
