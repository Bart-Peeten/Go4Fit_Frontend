import { Component, OnInit } from '@angular/core';
import {AgendaService} from '../../Services/agenda.service';
import {Participant} from '../../Domains/participant.model';
import {Observable} from 'rxjs';
import {DateService} from '../../Services/date.service';

@Component({
  selector: 'app-admin-agenda',
  templateUrl: './admin-agenda.component.html',
  styleUrls: ['./admin-agenda.component.css']
})
export class AdminAgendaComponent implements OnInit {
    private weekNumber: number;
    private firstDayOfWeekString: string;
    private dateOfWeek: Date;
    private lastdayOfWeekString: string;
    private trainingsDaysList: String[];
    private trainingsMoments: any[][];
    private trainingsTypes: any[][];
    private trainingDaysDatesList: any[];
    private participants: Observable<Participant[]>;
    newParticipant: String;
    private nextWeek: number = 1;
    private nextWeekDays: number = 7;

    constructor(private agendaService: AgendaService,
                private dateService: DateService ) {
    }

    ngOnInit() {
        this.currentWeek();
        this.fetchTrainingsDays();
        this.getParticipants();
        this.trainingsMoments = this.agendaService.getTrainingsMoments();
        this.trainingsTypes = this.agendaService.getTrainingsType();
    }

    getWeekNumber() {
        return this.dateService.getWeekNumber();
    }

    getNextWeekNumber() {
        this.weekNumber = this.dateService.getWeekNumberOfNextWeek(this.nextWeek);
        this.trainingDaysDatesList = this.dateService.getDatesofDaysOfNextWeek(this.nextWeekDays)
        this.getFirstDayOfNextWeekString();
        this.getLastDayOfNextWeekString();
        this.nextWeek += 1;
        this.nextWeekDays += 7;
    }

    private getFirstDayOfWeekString() {
        this.firstDayOfWeekString = 'Ma ' + this.dateService.getFirstDayOfWeek();
    }

    private getLastDayOfWeekString() {
        this.lastdayOfWeekString = 'Zo ' + this.dateService.getLastDayOfWeek();
    }

    private getFirstDayOfNextWeekString() {
        this.firstDayOfWeekString = 'Ma ' + this.dateService.getFirstDayOfNextWeek(this.nextWeekDays);
    }

    private getLastDayOfNextWeekString() {
        this.lastdayOfWeekString = 'Zo ' + this.dateService.getLastDayOfNextWeek(this.nextWeekDays);
    }

    private fetchTrainingsDays() {
        this.trainingsDaysList = this.agendaService.getTrainingsdays();
    }
    
    private getParticipants() {
        this.participants = this.agendaService.getParticipants();
    }

    removeParticipant() {
        this.agendaService.removeParticipant(this.newParticipant);
        this.getParticipants();
    }

    addNewParticipant() {
        console.log(this.newParticipant);
        this.agendaService.setParticipant(this.newParticipant)
            .subscribe(_ => this.getParticipants());
        this.newParticipant = '';
    }

    currentWeek() {
        this.trainingDaysDatesList = this.dateService.getTrainingsDays();
        this.weekNumber = this.getWeekNumber();
        this.getFirstDayOfWeekString();
        this.getLastDayOfWeekString();
    }
}
