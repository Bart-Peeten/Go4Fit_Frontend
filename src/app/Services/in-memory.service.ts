import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryService implements InMemoryDbService {

  constructor() { }

  createDb() {
      const participant = [{id: 1, name: 'Bart Peeten'},
                           {id: 2, name: 'Tom Heynen'} ];
      return { participant: participant };
  }

  /* genId(participants: any[]) : number {
        return participants.length > 0 ? participants[participants.length - 1].id + 1 : 1;
  } */
}
