import {Component, OnInit} from '@angular/core';
import {AgendaService} from '../../Services/agenda.service';
import {DateService} from '../../Services/date.service';
import {AuthService} from '../../Services/auth.service';
import * as moment from 'moment';
import {ErrorHandlerService} from '../../Services/error-handler.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  weekNumber: number;
  firstDayOfWeekString: string;
  dateOfWeek: Date;
  lastdayOfWeekString: string;
  trainingsDaysList: String[];
  private trainingsTimes: any[];
  private trainingsTypes: any[][];
  private trainingDaysDatesList: any[];
  private nextWeek = 1;
  private nextWeekDays = 7;
  private isOccupied: boolean;
  private participantName: String;
  private reservationDay: String;
  private reservationTime: string;
  private reservationDate: string;
  private numberOfReservations: number[] = [];
  private isReserved: boolean[] = [false];
  private isAllowedToDeleteReservation: boolean;
  mayOpenModal = true;

  constructor(private agendaService: AgendaService,
              private dateService: DateService,
              public  authService: AuthService,
              private errorHandler: ErrorHandlerService) {
  }

  ngOnInit() {
    this.currentWeek();
    this.fetchTrainingsDays();
    this.trainingsTimes = this.agendaService.getTrainingsMoments();
    this.trainingsTypes = this.agendaService.getTrainingsType();
  }

  getWeekNumber() {
    return this.dateService.getWeekNumber();
  }

  currentWeek() {
    this.trainingDaysDatesList = this.dateService.getTrainingsDays();
    // console.log('De datums van deze week: ');
    // console.log(this.trainingDaysDatesList);
    this.weekNumber = this.getWeekNumber();
    this.getFirstDayOfWeekString();
    this.getLastDayOfWeekString();
    this.getDataOfGivenWeek();
    // Here data for this week will be fetched.

    this.nextWeek = 1;
    this.nextWeekDays = 7;
  }

  getNextWeekData() {
    this.weekNumber = this.dateService.getWeekNumberOfNextWeek(this.nextWeek);
    this.trainingDaysDatesList = this.dateService.getDatesofDaysOfNextWeek(this.nextWeekDays);
    this.getFirstDayOfNextWeekString();
    this.getLastDayOfNextWeekString();
    // this.getNumberOfReservations();
    // console.log('De datums van deze week: ');
    // console.log(this.trainingDaysDatesList);

    // Here data for next weeks will be fetched.
    this.agendaService.getDataForGivenWeek(this.trainingDaysDatesList);
    this.getDataOfGivenWeek();
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

  private getNumberOfReservations(i: number, x: number) {
    const index = this.getIndex(i, x);
    // console.log('De lijst isReserved is: ' + this.isReserved);
    if (this.isReserved[index] === false) {
      const free = 10 - this.numberOfReservations[index];
      // console.log('Het aantal bezoekers is: ' + this.numberOfReservations);
      const freeString = free === 1 ? 'Nog ' + free + ' plaats vrij' : 'Nog ' + free + ' plaatsen vrij';
      this.isOccupied = free === 0;

      return free === 0 ? 'VOLZET' : freeString;
    } else {
      return 'Je bent ingeschreven.';
    }
  }

  getNumberOfReservationsForCrossTraining(i: number, x: number) {
    const index = this.getIndex(i, x);
    // console.log('De lijst isReserved is: ' + this.isReserved);
    if (this.isReserved[index] === false) {
      const free = 6 - this.numberOfReservations[index];
      const freeString = free === 1 ? 'Nog ' + free + ' plaats vrij' : 'Nog ' + free + ' plaatsen vrij';
      this.isOccupied = free === 0;

      return free <= 0 ? 'VOLZET' : freeString;
    } else {
      return 'Je bent ingeschreven.';
    }
  }

  onTrainingMomentClick(trainingMoment, trainingDay: String, date) {
    this.reservationTime = trainingMoment;
    this.reservationDay = trainingDay;
    this.reservationDate = date;
    this.participantName = this.authService.name;
  }

  confirmReservation() {
    // console.log(this.reservationDate + ' : ' + this.reservationTime + ' : ' + this.participantName);
    const time = this.reservationTime.substring(0, 2);
    const formatTime = this.dateService.getFullTime(time);
    const formatReservationDate = this.dateService.formatDate(this.reservationDate);
    console.log('Formated date en tijd is: ' + formatTime + ' : ' + formatReservationDate);
    this.agendaService.addReservation(this.participantName,
      formatReservationDate,
      formatTime)
      .subscribe(_ => this.getDataOfGivenWeek());
  }

  private getDataOfGivenWeek() {
    this.agendaService.getNumberOfReservationsForGivenWeek(this.trainingDaysDatesList)
      .subscribe(result => this.numberOfReservations = result);
    this.agendaService.getIsParticipantReservedForGivenWeek(this.trainingDaysDatesList)
      .subscribe(isReserved => this.isReserved = isReserved);
  }

  removeReservation() {
    const time = this.reservationTime.substring(0, 2);
    const formatTime = this.dateService.getFullTime(time);
    const formatReservationDate = this.dateService.formatDate(this.reservationDate);
    // console.log('Formatted date en tijd in deleteReservation is: ' + formatTime + ' : ' + formatReservationDate);

    const isAllowed = this.isInTimeRangeToDeleteReservation(formatTime, formatReservationDate);
    // console.log('isAllowed heeft als waarde: ' + isAllowed);
    if (isAllowed != null) {
      this.agendaService.removeReservation(this.authService.firstname,
        this.authService.lastname,
        formatReservationDate,
        formatTime,
        isAllowed)
        .subscribe(_ => {
            this.getDataOfGivenWeek();
          },
          error => {
            // console.log(error.message);
            const errorMessage = this.errorHandler.getErrorMessage(error);
            window.confirm(errorMessage);
          });
    }
  }

  gatherDataForModal(i: number, x: number) {
    const index = this.getIndex(i, x);
    this.isAllowedToDeleteReservation = this.isReserved[index];
    // console.log('isAllowedToMakeReservation is: ' + this.isAllowedToDeleteReservation);
    // console.log('isReserved ziet er als volgt uit: ' + this.isReserved);
  }

  private isInTimeRangeToDeleteReservation(reservationTime: string, reservationDate: string): boolean {
    let isAllowed = false;
    const nowTime = this.dateService.getNowTime();
    const dayOfMonth = this.dateService.getDayOfMonth();
    if (reservationDate.substring(8, 10) === dayOfMonth) {
      // console.log('De datums zijn gelijk!!');
      // If the dates are the same check if it takes 6h before start of training
      console.log(Number(reservationTime.substring(0, 2)));
      console.log(Number(nowTime));
      console.log('Tijd tot verwijderen is: ' + (Number(reservationTime.substring(0, 2)) - Number(nowTime)));
      if ((Number(reservationTime.substring(0, 2)) - Number(nowTime)) > 6) {
        isAllowed = true;
      } else {
        // tslint:disable-next-line:max-line-length
        if (window.confirm('Verwijderen van de reservatie is binnen de 6h voor de start van de training, bij bevestigen wordt er een beurt aangerekend.')) {
          isAllowed = false;
        } else {
          isAllowed = null;
        }
      }
    } else {
      // console.log('De datums zijn NIET gelijk!!');
      isAllowed = true;
    }

    return isAllowed;
  }

  getIndex(i: number, x: number) {
    if (i === 0 && x === 0) {
      return 0;
    }
    if (i === 0 && x === 1) {
      return 1;
    }
    if (i === 1 && x === 0) {
      return 2;
    }
    if (i === 1 && x === 1) {
      return 3;
    }
    if (i === 1 && x === 2) {
      return 4;
    }
    if (i === 2 && x === 0) {
      return 5;
    }
    if (i === 3 && x === 0) {
      return 6;
    }
    if (i === 3 && x === 1) {
      return 7;
    }
    if (i === 3 && x === 2) {
      return 8;
    }
  }
}
