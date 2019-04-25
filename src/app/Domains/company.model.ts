export class Company {
    name: String;
    street: String;
    city: String;
    postalCode: String;
    phoneNumber: String;
    email: String;


    constructor(name: String, street: String, city: String, postalCode: String, phoneNumber: String, email:String) {
        this.name = name;
        this.street = street;
        this.city = city;
        this.postalCode = postalCode;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
}
