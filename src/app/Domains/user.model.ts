export class User {
  firstname: String;
  name: String;
  email: string;
  telephone: String;
  password: String;
  password_confirmation: string;
  enabled: number;
  private _role: String;


  // tslint:disable-next-line:max-line-length
  constructor(lastname: String, firstname: String, email: string, phone: String, password: String, password_confirmation: string, role?: String) {
    this.name = lastname;
    this.firstname = firstname;
    this.email = email;
    this.telephone = phone;
    this.password = password;
    this.password_confirmation = password_confirmation;
    this.enabled = 1;
    this._role = role;
  }

  getRole() {
    return this._role;
  }

  getFirstName() {
    return this.firstname;
  }

  getLastName() {
    return this.name;
  }

  getEmail() {
    return this.email;
  }

  set role(value: String) {
    this._role = value;
  }
}
