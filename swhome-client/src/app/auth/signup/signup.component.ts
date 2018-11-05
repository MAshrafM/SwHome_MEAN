import { Component, OnInit } from '@angular/core';
import { AuthRoutesService} from '../../services/auth-routes.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  formInfo: any = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
  };
  
  user: any = false;
  error: string;
  privateData: any = '';
  
  constructor(private auth: AuthRoutesService) { }

  ngOnInit() {
  }
  
  signup(){
    this.auth.signup(this.formInfo).subscribe((user) => this.successCb(user), (err) => this.errorCb(err));
  }
  
  errorCb(err){
    this.error = err;
    this.user = null;
  }
  
  successCb(user){
    this.user = user;
    this.error = null;
  }
}
