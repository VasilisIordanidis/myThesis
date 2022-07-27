import { Intent } from 'src/app/models/Intent';

export class LogInIntent extends Intent {
  private username: string = '';
  private password: string = '';

  constructor(username: string, password: string) {
    super();
    this.username = username;
    this.password = password;
  }

  getUsername() {
    return this.username;
  }

  getPassword() {
    return this.password;
  }
}
