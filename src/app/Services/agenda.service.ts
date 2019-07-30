import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Participant} from '../Domains/participant.model';
import {Reservation} from '../Domains/reservation.model';

@Injectable({
    providedIn: 'root'
})
export class AgendaService {
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

    constructor(private http: HttpClient) {
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
        return this.http.get<Participant[]>('/api/participant');
    }

    addReservation(participantName: String, reservationDate: String, reservationTime: String) {
        let reservation = new Reservation(participantName, reservationDate, reservationTime);
        return this.http.post('/api/participant', reservation);
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

    getNumberOfReservations(date: String) {
        return Math.floor(Math.random() * (10 - 0 + 1)) + 0;
    }
}
