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
  private htmlIndex = 0;
  private isReserved: boolean[];
  private canOpenModalValue = false;

  constructor(private agendaService: AgendaService,
              private dateService: DateService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.canOpenModalValue = true;
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
    console.log('De datums van deze week: ');
    console.log(this.trainingDaysDatesList);
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
    console.log('De datums van deze week: ');
    console.log(this.trainingDaysDatesList);

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
    console.log('De lijst isReserved is: ' + this.isReserved);
    if (this.isReserved[index] === false) {
      const free = 10 - this.numberOfReservations[index];
      console.log('Het aantal bezoekers is: ' + this.numberOfReservations);
      const freeString = free === 1 ? 'Nog ' + free + ' plaats vrij' : 'Nog ' + free + ' plaatsen vrij';
      this.isOccupied = free === 0;
      this.canOpenModalValue = true;

      return free === 0 ? 'VOLZET' : freeString;
    } else {
      this.canOpenModalValue = false;
      return 'Je bent ingeschreven.';
    }
  }

  getNumberOfReservationsForCrossTraining(i: number, x: number) {
    const index = this.getIndex(i, x);
    console.log('De lijst isReserved is: ' + this.isReserved);
    if (this.isReserved[index] === false) {
      const free = 6 - this.numberOfReservations[index];
      const freeString = free === 1 ? 'Nog ' + free + ' plaats vrij' : 'Nog ' + free + ' plaatsen vrij';
      this.isOccupied = free === 0;
      this.canOpenModalValue = true;

      return free <= 0 ? 'VOLZET' : freeString;
    } else {
      this.canOpenModalValue = false;
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
    console.log(this.reservationDate + ' : ' + this.reservationTime + ' : ' + this.participantName);
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

  private getIndex(i: number, x: number) {
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
