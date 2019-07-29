import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DatePipe, formatDate} from '@angular/common';
import {AgendaService} from '../../Services/agenda.service';
import {Observable} from 'rxjs';
import {Participant} from '../../Domains/participant.model';
import {DateService} from '../../Services/date.service';
import {AuthService} from '../../Services/auth.service';

@Component({
    selector: 'app-agenda',
    templateUrl: './agenda.component.html',
    styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
    private weekNumber: number;
    private firstDayOfWeekString: string;
    private dateOfWeek: Date;
    private lastdayOfWeekString: string;
    private trainingsDaysList: String[];
    private trainingsMoments: any[][];
    private trainingsTypes: any[][];
    private trainingDaysDatesList: any[];
    private participants: Observable<Participant[]>;
    private nextWeek: number = 1;
    private nextWeekDays: number = 7;
    private isOccupied: boolean;
    private participantName: String;
    private reservationDay: String;
    private reservationDate: String;

    @Input() participantName1: String;
    @Input() reservationDay1: String;
    @Input() reservationDate1: String;



    constructor(private agendaService: AgendaService,
                private dateService: DateService,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.currentWeek();
        this.fetchTrainingsDays();
        this.getParticipants();;
        this.getNumberOfReservations()
        this.trainingsMoments = this.agendaService.getTrainingsMoments();
        this.trainingsTypes = this.agendaService.getTrainingsType();
    }

    getWeekNumber() {
        return this.dateService.getWeekNumber();
    }

    getNextWeekData() {
        this.weekNumber = this.dateService.getWeekNumberOfNextWeek(this.nextWeek);
        this.trainingDaysDatesList = this.dateService.getDatesofDaysOfNextWeek(this.nextWeekDays)
        this.getFirstDayOfNextWeekString();
        this.getLastDayOfNextWeekString();
        this.getNumberOfReservations();
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

    private currentWeek() {
        this.trainingDaysDatesList = this.dateService.getTrainingsDays();
        this.weekNumber = this.getWeekNumber();
        this.getFirstDayOfWeekString();
        this.getLastDayOfWeekString();
    }

    private getNumberOfReservations() {
        let numberReserved = this.agendaService.getNumberOfReservations();
        let free = 10 - numberReserved;
        let freeString = "Nog " + free + " plaatsen vrij";
        this.isOccupied = free == 0;

        return free == 0 ? "VOLZET" : freeString;
    }

    confirmReservation(moment: any, date: any) {
        this.reservationDay = moment;
        this.reservationDate = date;
        this.participantName = this.authService.name;
        console.log(this.reservationDay + " : " + this.reservationDate + " : " + this.participantName)
    }

    onTrainingDayClick(trainingDay) {
        console.log(trainingDay);
    }

    onTrainingMomentClick(trainingMoment) {
        console.log(trainingMoment);
    }
}
