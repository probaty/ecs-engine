export class Component {
  public id: string;
  constructor() {
    this.id = crypto.randomUUID();
  }
}

export type ComponentConstructor = new (...args: any[]) => Component;
