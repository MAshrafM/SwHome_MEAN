import { Component, OnInit } from '@angular/core';
import { AuthRoutesService } from "../services/auth-routes.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: any = false;
  error: string;
  
  constructor(private auth: AuthRoutesService, private router: Router) { }

  ngOnInit() {
    this.auth.isLoggedIn().subscribe(user => this.successCb(user));
  }
  
  logout(){
    this.auth.logout().subscribe(() => {
      this.successCb(null);
      this.router.navigate(["/#"]);
      },(err) => this.errorCb(err)
    );
  }
  
  errorCb(err) {
    this.error = err;
    this.user = null;
  }
  
  successCb(user) {
    this.user = user;
    this.router.navigate(["/dashboard"]);
    this.error = null;
  }
}
