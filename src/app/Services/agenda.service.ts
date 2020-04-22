import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Participant} from '../Domains/participant.model';
import {Reservation} from '../Domains/reservation.model';
import {AuthService} from './auth.service';
import {User} from '../Domains/user.model';
import {DateService} from './date.service';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  private CIRCUITTRAINING = 'circuittraining';
  private CROSSTRAINING = 'crosstraining';
  private url: String = environment.url;
  private trainingDays: Array<String> = ['Dinsdag', 'Woensdag', 'Donderdag', 'Zondag'];
  private trainingsType: any[][] = [[this.CIRCUITTRAINING, this.CIRCUITTRAINING],
    [this.CIRCUITTRAINING, this.CIRCUITTRAINING, this.CIRCUITTRAINING],
    [this.CROSSTRAINING],
    [this.CIRCUITTRAINING, this.CIRCUITTRAINING, this.CIRCUITTRAINING]];
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

  getParticipants(date: string, time: string) {
    const params = new HttpParams()
      .set('date', date)
      .set('time', time);

    return this.http.get<Participant[]>(this.url + 'reservation/names', {headers: this.authService.getHeaders(), params: params});
  }

  addReservation(participantName: String, date: string, time: string) {
    const email = this.authService.getEmail();
    const data = {
      'date': date,
      'time': time,
      'email': email
    };

    // console.log('De parameters verzonden naar reservation zijn:');
    // console.log(date + ' ' + time + ' ' + email);

    return this.http.post<Reservation>(this.url + 'v1/reservation', JSON.stringify(data), {headers: this.authService.getHeaders()});
  }

  addReservationWithOnlyFullName(firstName: string, lastName: string, reservationDate: string, reservationTime: string) {
    const formatDate = this.dateService.formatDate(reservationDate);
    const formatTime = this.dateService.getFullTime(reservationTime);

    const data = {
      'firstname': firstName,
      'lastname': lastName,
      'date': formatDate,
      'time': formatTime
    };

    // console.log(this.url + 'reservation/onlyname' + params);
    return this.http.post<Reservation>(this.url + 'v1/reservationwithonlyfullname',
      JSON.stringify(data),
      {headers: this.authService.getHeaders()});
  }

  removeReservation(firstName: string, lastName: string, reservationDate: string, reservationTime: string, isAllowed: boolean) {
    const formatTime = this.dateService.getFullTime(reservationTime);
    const options = {
      headers: this.authService.getHeaders(),
      body: null,
      params: new HttpParams()
        .set('firstname', firstName)
        .set('lastname', lastName)
        .set('date', reservationDate)
        .set('time', formatTime)
        .set('isAllowed', isAllowed.toString())
    };
    // console.log('WE GAAN EEN RESERVATIE VERWIJDEREN!!');
    // console.log('De datum is: ' + reservationDate);
    // console.log(this.url + 'reservation/delete' + options.params);
    return this.http.delete(this.url + 'v1/deletereservation', options);
  }

  getDataForGivenWeek(trainingDaysDatesList: any[]) {
    const params = this.prepareParams(trainingDaysDatesList);
    // console.log('De params voor de GET requst: ' + params);

    return this.http.get<String[][]>(this.url + 'v1/weekusers', {params: params});
  }

  getCancellationsForGivenWeek(trainingDaysDatesList: any[]) {
    const params = this.prepareParams(trainingDaysDatesList);
    // console.log('De params voor de GET request in CANCELLATION: ' + params);

    return this.http.get<String[][]>(this.url + 'v1/cancellations', {params: params});

  }

  getNumberOfReservationsForGivenWeek(trainingDaysDatesList: any[]) {
    let formatDatesList: any[] = [];
    formatDatesList = this.formatDates(trainingDaysDatesList);
    // console.log('De lijst die naar de API wordt gestuurd is: ' + formatDatesList);

    const params = new HttpParams()
      .append('tuesday', formatDatesList[0])
      .append('wednesday', formatDatesList[1])
      .append('thursday', formatDatesList[2])
      .append('sunday', formatDatesList[3]);

    // console.log('De params voor de GET requst: ' + params);

    return this.http.get<number[]>(this.url + 'v1/weekreservaties', {params: params});
  }


  getIsParticipantReservedForGivenWeek(trainingDaysDatesList: any[]) {
    let formatDatesList: any[] = [];
    formatDatesList = this.formatDates(trainingDaysDatesList);

    const params = new HttpParams()
      .set('firstname', this.authService.firstname.toString())
      .set('name', this.authService.lastname.toString())
      .append('tuesday', formatDatesList[0])
      .append('wednesday', formatDatesList[1])
      .append('thursday', formatDatesList[2])
      .append('sunday', formatDatesList[3]);

    // console.log('De params voor de GET request: ' + params);

    return this.http.get<boolean[]>(this.url + 'v1/isParticipantReserved', {params: params});
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

  private prepareParams(trainingDaysDatesList: any[]) {
    let formatDatesList: any[] = [];
    formatDatesList = this.formatDates(trainingDaysDatesList);
    console.log('De lijst die naar de API wordt gestuurd is: ' + formatDatesList);

    const params = new HttpParams()
      .append('tuesday', formatDatesList[0])
      .append('wednesday', formatDatesList[1])
      .append('thursday', formatDatesList[2])
      .append('sunday', formatDatesList[3]);
    return params;
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
    // console.log('De geformateerde tijd lijst is: ', formatTimesList);
    return [];
  }
}
