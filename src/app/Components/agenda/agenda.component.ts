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
    private trainingsTimes: any[][];
    private trainingsTypes: any[][];
    private trainingDaysDatesList: any[];
    private participants: Observable<Participant[]>;
    private nextWeek = 1;
    private nextWeekDays = 7;
    private isOccupied: boolean;
    private participantName: String;
    private reservationDay: String;
    private reservationTime: string;
    private reservationDate: string;
    private bezettingsString: string;

    constructor(private agendaService: AgendaService,
                private dateService: DateService,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.currentWeek();
        this.fetchTrainingsDays();
        this.getParticipants();
        this.getNumberOfReservations();
        this.trainingsTimes = this.agendaService.getTrainingsMoments();
        this.trainingsTypes = this.agendaService.getTrainingsType();
    }

    getWeekNumber() {
        return this.dateService.getWeekNumber();
    }

    getNextWeekData() {
        this.weekNumber = this.dateService.getWeekNumberOfNextWeek(this.nextWeek);
        this.trainingDaysDatesList = this.dateService.getDatesofDaysOfNextWeek(this.nextWeekDays);
        this.getFirstDayOfNextWeekString();
        this.getLastDayOfNextWeekString();
        // this.getNumberOfReservations();
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
        let numberReserved = null;
        this.agendaService.getNumberOfReservations(this.reservationDate,
            this.reservationTime)
            .subscribe(result => numberReserved = result);
        const free = 10 - numberReserved;
        console.log('Het aantal bezoekers is: ' + numberReserved);
        const freeString = 'Nog ' + free + ' plaatsen vrij';
        this.isOccupied = free === 0;

        this.bezettingsString =  free === 0 ? 'VOLZET' : freeString;
    }

    onTrainingDayClick(trainingDay: String, date: string) {
        this.reservationDay = trainingDay;
        this.reservationDate = date;
    }

    onTrainingMomentClick(trainingMoment) {
        this.reservationTime = trainingMoment;
        this.participantName = this.authService.name;
    }

    confirmReservation() {
        console.log(this.reservationDate + ' : ' + this.reservationTime + ' : ' + this.participantName);
      const time = this.reservationTime.substring(0, 2);
      const formatTime = this.dateService.getFullTime(time);
      const formatReservationDate = this.dateService.formatDate(this.reservationDate);
      console.log('Formated date en tijd is: ' + formatTime + ' : ' + formatReservationDate);
        this.agendaService.addReservation(this.participantName,
          formatReservationDate,
          formatTime)
            .subscribe(_ => this.getParticipants());
    }
}
