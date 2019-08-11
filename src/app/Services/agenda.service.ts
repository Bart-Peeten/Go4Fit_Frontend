import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Participant} from '../Domains/participant.model';
import {Reservation} from '../Domains/reservation.model';
import {AuthService} from './auth.service';
import {User} from '../Domains/user.model';
import {DateService} from './date.service';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  private url: String = 'http://localhost:8080/api/';
  private trainingDays: Array<String> = ['Dinsdag', 'Woensdag', 'Donderdag', 'Zondag'];
  private trainingsType: any[][] = [['circuit training', 'circuit training'],
    ['circuit training', 'circuit training', 'circuit training'],
    ['cross training'],
    ['circuit training', 'circuit training', 'circuit training']];
  private trainingsMoments: any[][] = [['19h - 20h', '20h - 21h'],
    ['9h - 10h', '19h - 20h', '20h - 21h'],
    ['19h - 20h'],
    ['8h - 9h', '9h - 10h', '10h - 11h']];

  constructor(private http: HttpClient,
              private authService: AuthService,
              private dateService: DateService) {
  }

  getTrainingsMoments() {
    return this.trainingsMoments;
  }

  getTrainingsdays() {
    return this.trainingDays;
  }

  getTrainingsType() {
    return this.trainingsType;
  }

  getHeaders() {
    const securityToken = this.authService.getUserName() + ':' + this.authService.getPassword();
    console.log('Security token is: ' + securityToken);
    const headers = new HttpHeaders().set('Authorization', 'Basic ' +
      btoa(securityToken));

    return headers;
  }

  getParticipants(date: string, time: string) {
    const params = new HttpParams()
      .set('date', date)
      .set('time', time);

    return this.http.get<Participant[]>(this.url + 'reservation/names', {headers: this.getHeaders(), params: params});
  }

  addReservation(participantName: String, reservationDate: string, reservationTime: String) {
    const loggedInUser: User[] = [];
    loggedInUser.push(this.authService.loggedInUser);
    const reservation = new Reservation(loggedInUser, reservationDate, reservationTime);

    return this.http.post<Reservation>(this.url + 'reservation/', reservation, {headers: this.getHeaders()});
  }

  addReservationWithOnlyFullName(firstName: string, lastName: string, reservationDate: string, reservationTime: string) {
    const formatDate = this.dateService.formatDate(reservationDate);
    const formatTime = this.dateService.getFullTime(reservationTime);

    const params = new HttpParams().set('firstname', firstName)
      .set('lastname', lastName)
      .set('date', formatDate)
      .set('time', formatTime);

    console.log(this.url + 'reservation/onlyname' + params);
    return this.http.post<Reservation>(this.url + 'reservation/onlyname', params, {headers: this.getHeaders()});
  }

  removeReservation(firstName: string, lastName: string, reservationDate: string, reservationTime: string) {
    const formatDate = this.dateService.formatDate(reservationDate);
    const formatTime = this.dateService.getFullTime(reservationTime);
    const options = {
      headers: this.getHeaders(),
      body: null,
      params: new HttpParams()
        .set('firstname', firstName)
        .set('lastname', lastName)
        .set('date', formatDate)
        .set('time', formatTime)
    };
    console.log(this.url + 'reservation/delete' + options);
    return this.http.delete(this.url + 'reservation/delete', options);
  }

  getDataForGivenWeek(trainingDaysDatesList: any[]) {
    let formatDatesList: any[] = [];
    formatDatesList = this.formatDates(trainingDaysDatesList);
    console.log('De lijst die naar de API wordt gestuurd is: ' + formatDatesList);

    const params = new HttpParams()
      .append('datesOfWeek', formatDatesList[0])
      .append('datesOfWeek', formatDatesList[1])
      .append('datesOfWeek', formatDatesList[2])
      .append('datesOfWeek', formatDatesList[3]);

    console.log('De params voor de GET requst: ' + params);

    return this.http.get<String[][]>(this.url + 'reservation/weekusers', {params: params});
  }

  getNumberOfReservationsForGivenWeek(trainingDaysDatesList: any[]) {
    let formatDatesList: any[] = [];
    formatDatesList = this.formatDates(trainingDaysDatesList);
    console.log('De lijst die naar de API wordt gestuurd is: ' + formatDatesList);

    const params = new HttpParams()
      .append('datesOfWeek', formatDatesList[0])
      .append('datesOfWeek', formatDatesList[1])
      .append('datesOfWeek', formatDatesList[2])
      .append('datesOfWeek', formatDatesList[3]);

    console.log('De params voor de GET requst: ' + params);

    return this.http.get<number[]>(this.url + 'reservation/weekreservaties', {params: params});
  }

  getNumberOfReservations(date: string, time: string) {
    const headers = new HttpHeaders({
      Authorization: 'Basic' +
        btoa(this.authService.getPassword() + ':' + this.authService.name)
    });

    const params = new HttpParams()
      .set('date', date)
      .set('time', time);

    const result = this.http.get(this.url + 'numberofreservations', {headers: headers, params: params});

    return result;
  }

  private formatDates(trainingDaysDatesList: any[]) {
    const formatDatesList: any[] = [];
    for (const item of trainingDaysDatesList) {
      const formatDate = this.dateService.formatDate(item);
      formatDatesList.push(formatDate);
    }
    return formatDatesList;
  }

  private formatTimes() {
    let tmpFormatTimesList: Array<string> = [];
    const formatTimesList: string[][] = [];
    let i = 0;
    for (const item of this.trainingsMoments) {
      for (const time of item) {
        const result = this.dateService.getFullTime(time);
        console.log('de geformateerde tijd is: ', result);
        tmpFormatTimesList.push(result);
        i++;
      }
      formatTimesList.push(tmpFormatTimesList);
      tmpFormatTimesList = [];
    }
    console.log('De geformateerde tijd lijst is: ', formatTimesList);
    return [];
  }
}
