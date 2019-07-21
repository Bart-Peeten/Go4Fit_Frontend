import {Component, OnInit} from '@angular/core';
import {DatePipe, formatDate} from '@angular/common';
import {AgendaService} from '../../Services/agenda.service';

@Component({
    selector: 'app-agenda',
    templateUrl: './agenda.component.html',
    styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
    private weekNumber: number;
    private firstDayOfWeekString: string;
    private dateOfWeek: Date;
    private dayInThisWeek: number;
    private lastdayOfWeekString: string;
    private firstDayOfWeek: number;
    private trainingsDaysList: String[];
    private trainingsMoments: any[][];
    private trainingsTypes: any[][];

    constructor(private agendaService: AgendaService) {
    }

    ngOnInit() {
        this.weekNumber = this.getWeekNumber();
        this.getFirstDayOfWeek();
        this.getLastDayOfWeek();
        this.fetchTrainingsDays();
        this.trainingsMoments = this.agendaService.getTrainingsMoments();
        this.trainingsTypes = this.agendaService.getTrainingsType();
        console.log(this.trainingsTypes[0][0]);
    }

    getWeekNumber() {
        return (Date.now());
    }

    getNextWeekNumber() {
        /* const t = new Date(formatDate(this.weekNumber, 'dd/MM/yyyy', 'en-UTC')); */
        const t = new Date(this.weekNumber);
        this.weekNumber = t.setDate(t.getDate() + 7);
        console.log(this.weekNumber);
        this.getFirstDayOfWeek();
        this.getLastDayOfWeek();
    }

    getFirstDayOfWeek() {
        this.dayInThisWeek = new Date(this.weekNumber).getDay();
        this.dateOfWeek = new Date(this.weekNumber);
        this.firstDayOfWeek = this.dateOfWeek.setDate(this.dateOfWeek.getDate() - (this.dayInThisWeek - 1));
        this.firstDayOfWeekString = 'Ma ' + new Date(this.firstDayOfWeek).getDate();
    }

    getLastDayOfWeek() {
        console.log(this.firstDayOfWeek);
        const lastDayOfWeek = new Date(this.firstDayOfWeek).getDate() + 6;
        this.lastdayOfWeekString = 'Zo ' + lastDayOfWeek;
    }

    private fetchTrainingsDays() {
        this.trainingsDaysList = this.agendaService.getTrainingsdays();
    }
}
