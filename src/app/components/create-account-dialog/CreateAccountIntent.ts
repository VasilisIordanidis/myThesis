import { Intent } from 'src/app/models/Intent';

export class CreateAccountIntent extends Intent {
  private firstName: string = '';
  private lastName: string = '';
  private email: string = '';
  private username: string = '';
  private password: string = '';
  //private id: string = '';

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string
    //id: string
  ) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.username = username;
    this.password = password;
    //this.id = id;
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

  getUserName() {
    return this.username;
  }

  getPassword() {
    return this.password;
  }

  // getId() {
  //   return this.id;
  // }
}
