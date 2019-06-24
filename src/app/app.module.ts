import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { AgendaComponent } from './Components/agenda/agenda.component';
import { HomeComponent } from './Components/home/home.component';
import { CircuitComponent } from './Components/circuit/circuit.component';
import { PersonalComponent } from './Components/personal/personal.component';
import { PricesComponent } from './Components/prices/prices.component';
import { ContactComponent } from './Components/contact/contact.component';
import {AppRoutingModule} from './Routing/app-routing.module';
import { ReservationComponent } from './Components/reservation/reservation.component';
import { LoginComponent } from './Components/login/login.component';
import {FormsModule} from '@angular/forms';
import {AuthService} from './Services/auth.service';
import { SigninComponent } from './Components/signin/signin.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AgendaComponent,
    HomeComponent,
    CircuitComponent,
    PersonalComponent,
    PricesComponent,
    ContactComponent,
    ReservationComponent,
    LoginComponent,
    SigninComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
    providers: [AuthService],
    bootstrap: [AppComponent]
})
export class AppModule { }
