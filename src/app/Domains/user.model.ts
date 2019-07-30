export class User {
    lastName: String;
    firstname: String;
    email: String;
    phone: String;
    password: String;


    constructor(lastName: String, firstname: String, email: String, phone: String, password: String) {
        this.lastName = lastName;
        this.firstname = firstname;
        this.email = email;
        this.phone = phone;
        this.password = password;
    }
}
