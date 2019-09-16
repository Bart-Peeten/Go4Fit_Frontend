import {Component, OnInit} from '@angular/core';
import {AgendaService} from '../../Services/agenda.service';
import {DateService} from '../../Services/date.service';
import {AuthService} from '../../Services/auth.service';

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
  private trainingsTimes: any[][];
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
  private isReserved: boolean[];
  private isAllowedToMakeReservation = true;
  mayOpenModal: boolean = true;

  constructor(private agendaService: AgendaService,
              private dateService: DateService,
              private authService: AuthService) {
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
    // console.log('Formated date en tijd is: ' + formatTime + ' : ' + formatReservationDate);
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

  deleteReservation() {
    const time = this.reservationTime.substring(0, 2);
    const formatTime = this.dateService.getFullTime(time);
    const formatReservationDate = this.dateService.formatDate(this.reservationDate);

    this.agendaService.removeReservation(this.authService.firstname,
                                         this.authService.lastname,
                                          formatReservationDate,
                                          formatTime)
      .subscribe(_ => this.getDataOfGivenWeek(),
          error => console.log(error.message));

  }

  gatherDataForModal(i: number, x: number) {
    let index = this.getIndex(i, x);
    if (this.getNumberOfReservations(i, x) === 'VOLZET' ||
      this.getNumberOfReservations(i, x) === 'Je bent ingeschreven.') {
      this.mayOpenModal = false;
    } else {
      this.mayOpenModal = true;
    }
  }

  private getIndex(i: number, x: number) {
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
