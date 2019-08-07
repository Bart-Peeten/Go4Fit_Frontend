import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Participant} from '../Domains/participant.model';
import {Reservation} from '../Domains/reservation.model';
import {AuthService} from './auth.service';
import {User} from '../Domains/user.model';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  private url: String = 'http://localhost:8080/api/';
  private trainingDays: Array<String> = ['Dinsdag', 'Woensdag', 'Donderdag', 'Zaterdag', 'Zondag'];
  private trainingsType: any[][] = [['circuit training', 'circuit training'],
    ['circuit training', 'circuit training', 'circuit training', 'circuit training'],
    ['cross training'],
    ['cross training'],
    ['circuit training', 'circuit training', 'circuit training']];
  private trainingsMoments: any[][] = [['19h - 20h', '20h - 21h'],
    ['9h - 10h', '10h - 11h', '19h - 20h', '20h - 21h'],
    ['19h - 20h'],
    ['9h - 10h'],
    ['8h - 9h', '9h - 10h', '10h - 11h']];

  constructor(private http: HttpClient,
              private authService: AuthService) {
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

    return this.http.get<Participant[]>(this.url + 'reservation/names', {headers: this.getHeaders()});
  }

  addReservation(participantName: String, reservationDate: string, reservationTime: String) {
    const loggedInUser: User[] = [];
    loggedInUser.push(this.authService.loggedInUser);
    const reservation = new Reservation(loggedInUser, reservationDate, reservationTime);

    return this.http.post<Reservation>(this.url + 'reservation/', reservation, {headers: this.getHeaders()});
  }

  removeReservation(participant: String, reservationDate: String, reservationTime: String) {
    const loggedInUser: User[] = [];
    loggedInUser.push(this.authService.loggedInUser);
    const reservation = new Reservation(loggedInUser, reservationDate, reservationTime);
    const options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      body: reservation,
    };
    return this.http.delete('/api/participant/', options);
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
}
