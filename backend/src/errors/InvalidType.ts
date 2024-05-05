export class InvalidType extends Error {
  errorCode: number;
  constructor(type: string, errorCode?: number) {
    super();
    this.message = `Invalid: ${type}.`;
    this.errorCode = errorCode || 400;
    this.name = "InvalidType";
  }
}
