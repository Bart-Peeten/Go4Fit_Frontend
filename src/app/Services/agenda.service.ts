import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Participant} from '../Domains/participant.model';

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
        return this.http.get<Participant[]>('/api/participant')
  }

  setParticipant(newParticipant: String) {
      let id = null;
      let name = newParticipant;
      let newParticipantObject = new Participant(id, name);
      return this.http.post('/api/participant', newParticipantObject);

    }

  removeParticipant(newParticipant: String) {
      let users = this.getParticipants();
      let id = null;
      id = this.extracted(users, newParticipant, id);
      console.log('Het te verwijderen id is: ' + id);
      this.http.delete(`'/api/participant/'${id}`);
    }

    getNumberOfReservations() {
        return Math.floor(Math.random() * (10 - 0 + 1)) + 0;
    }

    private extracted(users, newParticipant: String, id: any) {
        users.forEach(item => {
            item.forEach(data => {
                console.log('data.name is: ' + data.name);
                console.log('te verwijderen naam is: ' + newParticipant);
                if (data.name == newParticipant) {
                    id = data.id;
                }
            });
        });
        return id;
    }
}
