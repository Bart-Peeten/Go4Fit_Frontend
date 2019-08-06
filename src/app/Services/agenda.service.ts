import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Participant} from '../Domains/participant.model';
import {Reservation} from '../Domains/reservation.model';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AgendaService {
    private url: String = 'http://localhost:8080/api/'
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

    getParticipants() {
        const headers = new HttpHeaders({Authorization: 'Basic' +
                btoa(this.authService.getPassword() + ':' + this.authService.name)});
        return this.http.get<Participant[]>(this.url + 'reservation/names', {headers : headers});
    }

    addReservation(participantName: String, reservationDate: String, reservationTime: String) {
        let reservation = new Reservation(participantName, reservationDate, reservationTime);
        const headers = new HttpHeaders({Authorization: 'Basic' +
                btoa(this.authService.getPassword() + ':' + this.authService.name)});
        return this.http.post('/api/participant', reservation, {headers : headers});
    }

    removeReservation(participant: String, reservationDate: String, reservationTime: String) {
        let reservation = new Reservation(participant, reservationDate, reservationTime);
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body: reservation,
        };
        return this.http.delete('/api/participant/', options);
    }

    getNumberOfReservations(date: string, time: string) {
        const headers = new HttpHeaders({Authorization: 'Basic' +
                btoa(this.authService.getPassword() + ':' + this.authService.name)});

        let params = new HttpParams()
            .set('date', date)
            .set('time', time);

        let result = this.http.get(this.url + 'numberofreservations', {headers : headers, params : params});

        return result;
    }
}
