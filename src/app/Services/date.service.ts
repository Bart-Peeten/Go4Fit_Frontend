import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateService {

    constructor() { }

    getDateOfToday() {
        let now = moment().format('LLLL');
        return now;
    }

    getWeekNumber() {
          console.log(moment().week());
          return moment().week();
    }

    getWeekNumberOfNextWeek(nextWeek: number) {
        let t = moment().add(nextWeek, 'weeks').format('DD-MM-YYYY');
        return moment(t, 'DD-MM-YYYY').week();
    }

    getFirstDayOfWeek() {
        return moment().day(1).format('DD-MMM');
    }

    getLastDayOfWeek() {
        return moment().day(8).format('DD-MMM');
    }

    getFirstDayOfNextWeek(nextWeek: number) {
        return moment().day(1 + nextWeek).format('DD-MMM');
    }

    getLastDayOfNextWeek(nextWeek: number) {
        return moment().day(7 + nextWeek).format('DD-MMM');
    }

    getTrainingsDays() {
          let trainingsDays = [];
          let tuesday = moment().day(2).format('DD-MM-YYYY');
          let wednesday = moment().day(3).format('DD-MM-YYYY');
          let thursday = moment().day(4).format('DD-MM-YYYY');
          let saturday = moment().day(6).format('DD-MM-YYYY');
          let sunday = moment().day(7).format('DD-MM-YYYY');
          trainingsDays.push(tuesday, wednesday, thursday, saturday, sunday);

          return trainingsDays;
    }

    getDatesofDaysOfNextWeek(nextWeek: number) {
        let trainingsDays = [];
        let tuesday = moment().day(2 + nextWeek).format('DD-MM-YYYY');
        let wednesday = moment().day(3 + nextWeek).format('DD-MM-YYYY');
        let thursday = moment().day(4 + nextWeek).format('DD-MM-YYYY');
        let saturday = moment().day(6 + nextWeek).format('DD-MM-YYYY');
        let sunday = moment().day(7 + nextWeek).format('DD-MM-YYYY');
        trainingsDays.push(tuesday, wednesday, thursday, saturday, sunday);

        return trainingsDays;
    }
}
