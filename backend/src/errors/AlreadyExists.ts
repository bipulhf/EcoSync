export class AlreadyExists extends Error {
  errorCode: number;
  constructor(type: string) {
    super();
    this.message = `${type} already exists.`;
    this.errorCode = 409;
    this.name = "AlreadyExists";
  }
}
