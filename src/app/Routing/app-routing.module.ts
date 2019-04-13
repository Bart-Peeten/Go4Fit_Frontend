import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AgendaComponent} from '../Components/agenda/agenda.component';
import {ContactComponent} from '../Components/contact/contact.component';
import {PricesComponent} from '../Components/prices/prices.component';
import {PersonalComponent} from '../Components/personal/personal.component';
import {CircuitComponent} from '../Components/circuit/circuit.component';
import {HomeComponent} from '../Components/home/home.component';

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
        component: CircuitComponent
    },
    {
        path: 'personal',
        component: PersonalComponent
    },
    {
        path: 'prices',
        component: PricesComponent
    },
    {
        path: 'agenda',
        component: AgendaComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
    /*providers: [CanActivateViaAuthGuard, CanDeactivateConfirmGuard]*/
})
export class AppRoutingModule { }
