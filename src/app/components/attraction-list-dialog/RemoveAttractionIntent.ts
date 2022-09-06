import { Intent } from 'src/app/models/Intent';

export class RemoveAttractionIntent extends Intent {
  private id!: string;
  private name!: string;
  private address!: string;
  constructor(id: string, name: string, address: string) {
    super();
    this.id = id;
    this.address = address;
    this.name = name;
  }
  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getAddress() {
    return this.address;
  }
}
