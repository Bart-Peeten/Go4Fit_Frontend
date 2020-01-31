export class User {
  firstName: String;
  lastName: String;
  email: string;
  phone: String;
  password: String;
  password_confirmation: string;
  enabled: number;
  role: String;


  // tslint:disable-next-line:max-line-length
  constructor(lastname: String, firstname: String, email: string, phone: String, password: String, password_confirmation: string, role?: String) {
    this.lastName = lastname;
    this.firstName = firstname;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.password_confirmation = password_confirmation;
    this.enabled = 1;
    this.role = role;
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
}
