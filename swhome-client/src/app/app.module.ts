import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms'

// Services
import { AuthRoutesService } from './services/auth-routes.service';
import { AppRoutingModule } from './app-routing.module';
// Components
import { AppComponent } from './app.component';
import { AddHomeComponent } from './add-home/add-home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AddTravelComponent } from './add-travel/add-travel.component';
import { EditTravelComponent } from './edit-travel/edit-travel.component';
import { ResultsComponent } from './results/results.component';
import { MatchesComponent } from './matches/matches.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AddHomeComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    AddTravelComponent,
    EditTravelComponent,
    ResultsComponent,
    MatchesComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [AuthRoutesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
