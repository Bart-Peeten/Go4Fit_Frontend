export class User {
    private _firstName: String;
    private _lastName: String;
    private _email: String;
    private _phone: String;
    private _password: String;
    private _enabled: number;
  private _role: String;


    constructor(firstname: String, lastName: String, email: String, phone: String, password: String, role?: String) {
        this._lastName = lastName;
        this._firstName = firstname;
        this._email = email;
        this._phone = phone;
        this._password = password;
        this._enabled = 1;
      this._role = role;
    }


  get firstName(): String {
    return this._firstName;
  }

  set firstName(value: String) {
    this._firstName = value;
  }

  get lastName(): String {
    return this._lastName;
  }

  set lastName(value: String) {
    this._lastName = value;
  }

  get email(): String {
    return this._email;
  }

  set email(value: String) {
    this._email = value;
  }

  get phone(): String {
    return this._phone;
  }

  set phone(value: String) {
    this._phone = value;
  }

  get password(): String {
    return this._password;
  }

  set password(value: String) {
    this._password = value;
  }

  get enabled(): number {
    return this._enabled;
  }

  set enabled(value: number) {
    this._enabled = value;
  }

  get role(): String {
    return this._role;
  }

  set role(value: String) {
    this._role = value;
  }
}
