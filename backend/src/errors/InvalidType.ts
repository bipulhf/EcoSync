export class InvalidType extends Error {
  errorCode: number;
  constructor(type: string, errorCode: number) {
    super();
    this.message = `Invalid type ${type}.`;
    this.errorCode = errorCode;
    this.name = "InvalidType";
  }
}
