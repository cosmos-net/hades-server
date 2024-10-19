export default class DomainException extends Error {
  constructor(public message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}
