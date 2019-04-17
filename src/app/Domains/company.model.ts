export class Company {
    name: String;
    street: String;
    city: String;
    postalCode: String;
    phoneNumber: String;


    constructor(name: String, street: String, city: String, postalCode: String, phoneNumber: String) {
        this.name = name;
        this.street = street;
        this.city = city;
        this.postalCode = postalCode;
        this.phoneNumber = phoneNumber;
    }
}
