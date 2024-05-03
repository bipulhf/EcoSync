export class InvalidCredentials extends Error {
  errorCode: number;
  constructor() {
    super();
    this.message = `Invalid credentials.`;
    this.errorCode = 401;
    this.name = "InvalidCredentials";
  }
}
