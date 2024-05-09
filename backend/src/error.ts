import { InvalidAccess } from "./errors/InvalidAccess";
import { InvalidType } from "./errors/InvalidType";
import { InvalidCredentials } from "./errors/InvalideCredentials";
import { ResourceNotFound } from "./errors/ResourceNotFound";

export default function getErrorType(error: any) {
  if (
    error instanceof InvalidAccess ||
    error instanceof ResourceNotFound ||
    error instanceof InvalidType ||
    error instanceof InvalidCredentials
  ) {
    return { message: error.message, errorCode: error.errorCode };
  } else if (error instanceof Error) {
    return { message: error.message, errorCode: 500 };
  } else {
    return { message: "Internal Server Error", errorCode: 500 };
  }
}
