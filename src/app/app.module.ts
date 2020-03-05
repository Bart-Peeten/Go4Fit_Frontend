import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NavbarComponent} from './Components/navbar/navbar.component';
import {AgendaComponent} from './Components/agenda/agenda.component';
import {HomeComponent} from './Components/home/home.component';
import {CircuitComponent} from './Components/circuit/circuit.component';
import {PersonalComponent} from './Components/personal/personal.component';
import {PricesComponent} from './Components/prices/prices.component';
import {ContactComponent} from './Components/contact/contact.component';
import {AppRoutingModule} from './Routing/app-routing.module';
import {ReservationComponent} from './Components/reservation/reservation.component';
import {LoginComponent} from './Components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './Services/auth.service';
import {SignUpComponent} from './Components/signUp/sign-up.component';
import {AdminAgendaComponent} from './Components/admin-agenda/admin-agenda.component';
import {HttpClientModule} from '@angular/common/http';
import {SignUpAdminComponent} from './Components/sign-up-admin/sign-up-admin.component';
import {httpInterceptProviders} from './Services/Http_Interceptors';
import {LoaderComponent} from './Components/shared/loader/loader.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {LoaderService} from './Services/loader-service.service';

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
    SignUpComponent,
    AdminAgendaComponent,
    SignUpAdminComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule
    // InMemoryWebApiModule.forRoot(InMemoryService, { delay: 1000 })
  ],
  providers: [
    AuthService,
    LoaderService,
    httpInterceptProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
