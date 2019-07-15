import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AgendaComponent} from '../Components/agenda/agenda.component';
import {ContactComponent} from '../Components/contact/contact.component';
import {PricesComponent} from '../Components/prices/prices.component';
import {PersonalComponent} from '../Components/personal/personal.component';
import {CircuitComponent} from '../Components/circuit/circuit.component';
import {HomeComponent} from '../Components/home/home.component';
import {CannotActivateGuard} from '../RouteGuards/cannot_activator.service';
import {LoginComponent} from '../Components/login/login.component';
import {SigninComponent} from '../Components/signin/signin.component';
import {AuthActivatorService} from '../RouteGuards/auth-activator.service';
import {AdminAgendaComponent} from '../Components/admin-agenda/admin-agenda.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'circuit',
        component: CircuitComponent,
        canActivate: [CannotActivateGuard]
    },
    {
        path: 'personal',
        component: PersonalComponent,
        canActivate: [CannotActivateGuard]
    },
    {
        path: 'prices',
        component: PricesComponent
    },
    {
        path: 'agenda',
        component: AgendaComponent,
        canActivate: [AuthActivatorService]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signin',
        component: SigninComponent
    },
    {
        path: 'admin_agenda',
        component: AdminAgendaComponent
    },
    {
        path: 'contact',
        component: ContactComponent,
        canActivate: [CannotActivateGuard]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CannotActivateGuard]
})
export class AppRoutingModule { }
