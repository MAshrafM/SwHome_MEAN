import { Component, OnInit } from '@angular/core';
import { AuthRoutesService} from '../../services/auth-routes.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formInfo: any = {
    username: "",
    password: ""
  };
  
  user: any = false;
  error: string;
  
  constructor(private auth: AuthRoutesService, private router: Router) { }

  ngOnInit() {
    this.auth.isLoggedIn().subscribe(user => this.successCb(user));
  }
  
  login(){
    this.auth.login(this.formInfo).subscribe(user => this.successCb(user), err => this.errorCb(err));
  }
  
  logout(){
    this.auth.logout().subscribe(() => this.successCb(null), err => this.errorCb(err));
  }
  
  errorCb(err){
    this.error = err;
    this.user = null;
  }
  
  successCb(user){
    this.user = user;
    this.error = null;
    this.router.navigate('/dashboard');
  }

}
