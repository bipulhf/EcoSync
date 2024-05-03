export class InvalidAccess extends Error {
  errorCode: number;
  constructor() {
    super();
    this.message = `Forbidden.`;
    this.errorCode = 403;
    this.name = "InvalidAccess";
  }
}
