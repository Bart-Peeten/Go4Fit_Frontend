import {Injectable} from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() {
  }

  getDateOfToday() {
    const now = moment().format('LLLL');
    return now;
  }

  getDayOfMonth() {
    return moment().format('DD');
  }

  getNowTime() {
    return moment().format('HH');
  }

  getWeekNumber() {
    console.log(moment().week());
    return moment().startOf('isoWeek').week();
  }

  getWeekNumberOfNextWeek(nextWeek: number) {
    let t = moment().startOf('isoWeek').add(nextWeek, 'weeks').format('DD-MM-YYYY');
    return moment(t, 'DD-MM-YYYY').week();
  }

  getFirstDayOfWeek() {
    return moment().startOf('isoWeek').day(1).format('DD-MMM');
  }

  getLastDayOfWeek() {
    return moment().startOf('isoWeek').day(7).format('DD-MMM');
  }

  getFirstDayOfNextWeek(nextWeek: number) {
    return moment().startOf('isoWeek').day(1 + nextWeek).format('DD-MMM');
  }

  getLastDayOfNextWeek(nextWeek: number) {
    return moment().startOf('isoWeek').day(7 + nextWeek).format('DD-MMM');
  }

  getTrainingsDays() {
    let trainingsDays = [];
    let tuesday = moment().startOf('isoWeek').day(2).format('DD-MM-YYYY');
    let wednesday = moment().startOf('isoWeek').day(3).format('DD-MM-YYYY');
    let thursday = moment().startOf('isoWeek').day(4).format('DD-MM-YYYY');
    let sunday = moment().startOf('isoWeek').day(7).format('DD-MM-YYYY');
    trainingsDays.push(tuesday, wednesday, thursday, sunday);

    return trainingsDays;
  }

  getDatesofDaysOfNextWeek(nextWeek: number) {
    let trainingsDays = [];
    let tuesday = moment().startOf('isoWeek').day(2 + nextWeek).format('DD-MM-YYYY');
    let wednesday = moment().startOf('isoWeek').day(3 + nextWeek).format('DD-MM-YYYY');
    let thursday = moment().startOf('isoWeek').day(4 + nextWeek).format('DD-MM-YYYY');
    let sunday = moment().startOf('isoWeek').day(7 + nextWeek).format('DD-MM-YYYY');
    trainingsDays.push(tuesday, wednesday, thursday, sunday);

    return trainingsDays;
  }

  formatDate(date: string) {
    /* console.log('Date to format is: ' + date);
    console.log('geformateerde date is: ' + date.substring(0, 2));
    console.log('geformateerde date is: ' + date.substring(3, 5));
    console.log('geformateerde date is: ' + date.substring(6, 10));
    console.log(date.substring(6, 10) + '-' + date.substring(3, 5) + '-' + date.substring(0, 2)); */
    return date.substring(6, 10) + '-' + date.substring(3, 5) + '-' + date.substring(0, 2);
  }

  getFullTime(time: string) {
    const strip = time.substring(0, 2);
    if (strip.charAt(1) === 'h') {
      return '0' + strip.charAt(0) + ':00';
    } else {
      return strip + ':00';
    }
  }
}
