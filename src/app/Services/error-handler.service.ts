import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() {
  }

  getErrorMessage(error: any): string {
    switch (error.status) {
      case 400:
        return 'Er is iets serieus mis gegaan.\nAls het probleem blijft voordoen gelieve de eigenaar te contacteren.';
      case 401:
        return 'Inloggen ging niet goed.\nE-mail of paswoord is niet correct.';
      case 404:
        return 'Pagina wordt niet gevonden.\nProbeer later nog een keer\nof contacteer de eigenaar.';
    }
  }
}
