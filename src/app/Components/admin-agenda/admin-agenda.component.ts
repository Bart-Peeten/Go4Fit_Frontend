import {Component, OnInit} from '@angular/core';
import {AgendaService} from '../../Services/agenda.service';
import {DateService} from '../../Services/date.service';
import {Reservation} from '../../Domains/reservation.model';

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
    private trainingsTimes: any[][];
    private trainingsTypes: any[][];
    private trainingDaysDatesList: any[];
    private participants: String[][] = [];
    newFirstName: string;
    private nextWeek = 1;
    private nextWeekDays = 7;
    private reservationDay: string;
    private reservationTime: string;
    private reservationDate: string;
    private htmlIndex = 0;
    private newLastName: string;
    private isClicked = false;
    private closeResult: string;

    constructor(private agendaService: AgendaService,
                private dateService: DateService) {
    }

    ngOnInit() {
        this.currentWeek();
        this.fetchTrainingsDays();
        this.getParticipants();
        this.trainingsTimes = this.agendaService.getTrainingsMoments();
        this.trainingsTypes = this.agendaService.getTrainingsType();
        this.getDataOfGivenWeek();
    }

    getWeekNumber() {
        return this.dateService.getWeekNumber();
    }

    getNextWeekNumber() {
        this.weekNumber = this.dateService.getWeekNumberOfNextWeek(this.nextWeek);
        this.trainingDaysDatesList = this.dateService.getDatesofDaysOfNextWeek(this.nextWeekDays);
        this.getFirstDayOfNextWeekString();
        this.getLastDayOfNextWeekString();
        this.nextWeek += 1;
        this.nextWeekDays += 7;
        this.getDataOfGivenWeek();
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
        // this.participants = this.agendaService.getParticipants();
    }

    currentWeek() {
        this.trainingDaysDatesList = this.dateService.getTrainingsDays();
        this.weekNumber = this.getWeekNumber();
        this.getFirstDayOfWeekString();
        this.getLastDayOfWeekString();
        this.getDataOfGivenWeek();
        this.nextWeek = 1;
        this.nextWeekDays = 7;
    }

    onTrainingDayClick(trainingDay: string, date: string) {
        this.reservationDay = trainingDay;
        this.reservationDate = date;
        this.isClicked = true;
        console.log('DE GESELECTEERDE DATUM: ' + date);
    }

    onTrainingMomentClick(trainingMoment: string, trainingDay: string, date: string) {
        this.reservationTime = trainingMoment;
        this.reservationDay = trainingDay;
        this.reservationDate = date;
        console.log('DE GESELECTEERDE DATUM: ' + date);
    }

    addNewParticipantWhenOnlyNameIsAvailable() {
        console.log(this.newFirstName);
        // Make sure the first and lastname starts with capital letter.
        const firstName = this.newFirstName.charAt(0).toUpperCase() + this.newFirstName.slice(1);
        const lastName = this.newLastName.charAt(0).toUpperCase() + this.newLastName.slice(1);

        this.agendaService.addReservationWithOnlyFullName(firstName, lastName, this.reservationDate, this.reservationTime)
            .subscribe(_ => this.getDataOfGivenWeek());
        this.newFirstName = '';
        this.newLastName = '';
        this.isClicked = false;
    }

    removeParticipant() {
        console.log(this.newFirstName);
        // Make sure the first and lastname starts with capital letter.
        const firstName = this.newFirstName.charAt(0).toUpperCase() + this.newFirstName.slice(1);
        const lastName = this.newLastName.charAt(0).toUpperCase() + this.newLastName.slice(1);

        this.agendaService.removeReservation(firstName, lastName, this.reservationDate, this.reservationTime)
            .subscribe(_ => this.getDataOfGivenWeek());
        this.newFirstName = '';
        this.newLastName = '';
        this.isClicked = false;
    }

    private getDataOfGivenWeek() {
        this.agendaService.getDataForGivenWeek(this.trainingDaysDatesList).subscribe(result => this.participants = result);
    }

    private fetchUsersFromData(result: Reservation[]) {
        if (result != null) {
            result.forEach(item => {
                    const users: Array<String> = [];
                    item.users.forEach(user => {
                        console.log('De huidige user is: ' + user);
                        const fullname = user.firstName + ' ' + user.lastName;
                        if (fullname != null) {
                            users.push(fullname);
                        } else {
                            users.push(' ');
                        }
                    });
                    console.log(users);
                    this.participants.push(users);
                }
            );
        }
        console.log('De lijst van participants ziet er als volgt uit: ' + this.participants[2]);
        console.log(this.participants.length);
    }

    getIndex(i: number, x: number) {
        console.log('Het inkomende nummer i is: ' + i);
        console.log('Het inkomende nummer x is: ' + x);
        console.log('this.htmlIndex is: ' + this.htmlIndex);
        if ((i + x) === 0) {
            this.htmlIndex = 0;
            return 0;
        } else {
            const indexx = this.htmlIndex + 1;
            this.htmlIndex += 1;

            return indexx;
        }
    }
}
