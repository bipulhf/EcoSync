export class InvalidAccess extends Error {
  errorCode: number;
  constructor(message?: string) {
    super();
    this.message = message || `Forbidden.`;
    this.errorCode = 403;
    this.name = "InvalidAccess";
  }
}
