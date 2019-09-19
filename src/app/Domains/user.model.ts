export class User {
  firstName: String;
  lastName: String;
  email: string;
  phone: String;
  password: String;
  enabled: number;
  role: String;
  removedReservation: boolean;


  // tslint:disable-next-line:max-line-length
  constructor(lastname: String, firstname: String, email: string, phone: String, password: String, role?: String, removedReservation?: boolean) {
    this.lastName = lastname;
    this.firstName = firstname;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.enabled = 1;
    this.role = role;
    this.removedReservation = removedReservation;
  }

  getRole() {
    return this.role;
  }

  getFirstName() {
    return this.firstName;
  }

  getLastName() {
    return this.lastName;
  }

  getEmail() {
    return this.email;
  }

  getRemovedReservation() {
    return this.removedReservation;
  }
}
