export class ResourceNotFound extends Error {
  errorCode: number;
  constructor(type: string, id: string | number) {
    super();
    if (typeof id === "number")
      this.message = `${type} with id ${id} not found`;
    else if (typeof id === "string")
      this.message = `${type} with ${id} not found`;
    this.errorCode = 404;
    this.name = "ResourceNotFound";
  }
}
