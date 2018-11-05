import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';

// Services
import { AuthRoutesService } from './services/auth-routes.service';
import { HomeRoutesService } from './service/home-routes.service';
import { AppRoutingModule } from './app-routing.module';
import { NgxPagesScrollModule } from 'ngx-page-scroll';
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
    FormsModule,
    FileUploadModule,
    NgxPagesScrollModule,
  ],
  providers: [AuthRoutesService, HomeRoutesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
