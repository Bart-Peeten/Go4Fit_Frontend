import {Component, OnInit} from '@angular/core';
import {AgendaService} from '../../Services/agenda.service';
import {Participant} from '../../Domains/participant.model';
import {Observable} from 'rxjs';
import {DateService} from '../../Services/date.service';
import {Reservation} from '../../Domains/reservation.model';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import index from '@angular/cli/lib/cli';

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
  newParticipant: String;
  private nextWeek = 1;
  private nextWeekDays = 7;
  private reservationDay: string;
  private reservationTime: string;
  private reservationDate: string;
  private htmlIndex = 0;

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
  }

  onTrainingDayClick(trainingDay: string, date: string) {
    this.reservationDay = trainingDay;
    this.reservationDate = date;
    console.log('DE GESELECTEERDE DATUM: ' + date);
  }

  onTrainingMomentClick(trainingMoment: string) {
    this.reservationTime = trainingMoment;
  }

  addNewParticipant() {
    console.log(this.newParticipant);
    this.agendaService.addReservation(this.newParticipant, this.reservationDate, this.reservationTime)
      .subscribe(_ => this.getParticipants());
    this.newParticipant = '';
  }

  removeParticipant() {
    this.agendaService.removeReservation(this.newParticipant, this.reservationDate, this.reservationTime)
      .subscribe(_ => this.getParticipants());
  }

  private getDataOfGivenWeek() {
    this.agendaService.getDataForGivenWeek(this.trainingDaysDatesList).subscribe(result => this.fetchUsersFromData(result));
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
