import {User} from './user.model';

export class Reservation {
    users: User[];
    date: String;
    time: String;


    constructor(users: User[], date: String, time: String) {
        this.users = users;
        this.date = date;
        this.time = time;
    }
}
